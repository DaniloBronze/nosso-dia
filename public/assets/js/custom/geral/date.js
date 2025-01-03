const startDate = new Date("2020-12-26T00:00:00");
const updateCounter = () => {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30);
    const exactDays = remainingDays % 30;

    document.getElementById('time-together').innerHTML =
        `${years} anos, ${months} meses, ${exactDays} dias, ${hours % 24} horas, ${minutes % 60} minutos e ${seconds % 60} segundos`;
};

setInterval(updateCounter, 1000);