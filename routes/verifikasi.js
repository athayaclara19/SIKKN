
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  
  const submitButton = document.querySelector('.btn');
  submitButton.disabled = true;
  submitButton.textContent = 'Loading...';

  setTimeout(() => {
    window.location.href = '/verifikasi'; 

    submitButton.disabled = false;
    submitButton.textContent = 'DAFTAR';
  }, 1000); 
});

const resendButton = document.querySelector('.btn');
if (resendButton) {
  resendButton.addEventListener('click', () => {

    resendButton.textContent = 'Sending...'; 
    setTimeout(() => {
      resendButton.textContent = 'Kirim Ulang Email'; 
    }, 2000); 
  });
}