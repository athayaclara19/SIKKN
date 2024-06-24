
const suratPernyataanInput = document.getElementById('surat_pernyataan');
const suratBpjsInput = document.getElementById('surat_bpjs');

suratPernyataanInput.addEventListener('change', () => {
    const file = suratPernyataanInput.files[0];
    if (file) {
        console.log('File selected:', file.name);
    }
});

suratBpjsInput.addEventListener('change', () => {
    const file = suratBpjsInput.files[0];
    if (file) {
        console.log('File selected:', file.name);
    }
});

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
   
});