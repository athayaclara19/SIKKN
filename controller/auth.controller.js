const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const form = (req, res) => {
  const token = req.cookies.token;

  res.render("login", { title: "Express" });
};

const checklogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Menggunakan nama variabel lain untuk menyimpan hasil pencarian user
    const foundUser = await User.findOne({ where: { email } });

    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, foundUser.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Buat token JWT
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email, name: foundUser.name, nim: foundUser.nim,role: foundUser.role },
      process.env.JWT_SECRET_TOKEN,
      { expiresIn: 1800 }
    );

    // Set cookie dengan token
    res.cookie("token", token, { httpOnly: true });

    // Redirect ke halaman sesuai dengan peran pengguna
    if (foundUser.role === "mahasiswa") {
      return res.redirect("/home");
    } else if (foundUser.role === "admin") {
      return res.redirect("/admin/dashboard");
    }
    console.log(foundUser.role)
    // Jika tidak ada peran yang cocok, berikan respons standar
    res.status(200).send({ auth: true, token: token });

  } catch (err) {
    console.error("Error during login: ", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

function logout(req, res) {
  res.clearCookie("token");
  res.redirect("/login");
 
}

const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Password saat ini dan password baru harus diisi' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.redirect('/ubah-pw?error=Pengguna%20tidak%20ditemukan');
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.redirect('/ubah-pw?error=Password%20saat%20ini%20salah');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedNewPassword });
    
    res.redirect('/login?message=Password%20successfully%20changed');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};

module.exports = {
  form,
  checklogin,
  logout,
  changePassword
};
