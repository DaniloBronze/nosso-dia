async function checkPassword() {
    const password = document.getElementById('password-input').value;

    // Enviando a senha para o backend com URL absoluta
    const response = await fetch('https://nosso-dia-danilobronze-danilobronzes-projects.vercel.app/api/verify-password.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });

    const result = await response.json();
    if (result.success) {
        // Exibindo a mensagem retornada
        document.getElementById('password-section').style.display = 'none';
        document.getElementById('message-section').style.display = 'block';
        document.getElementById('message-content').textContent = result.message;
    } else {
        // Exibindo erro
        document.getElementById('password-error').textContent = result.error;
        document.getElementById('password-error').style.display = 'block';
    }
}