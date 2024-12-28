async function checkPassword(password) {
    try {
        const response = await fetch('https://nosso-dia-delta.vercel.app/api/verify-password.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Sucesso
        } else {
            const error = await response.json();
            console.error(error.error); // Erro
        }
    } catch (error) {
        console.error('Erro ao chamar a API:', error);
    }
}
