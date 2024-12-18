const button = document.getElementById('kt_docs_toast_toggle_button');
const toastElement = document.getElementById('kt_docs_toast_toggle');

const toast = bootstrap.Toast.getOrCreateInstance(toastElement);

button.addEventListener('click', e => {
    e.preventDefault();
    toast.show();
});