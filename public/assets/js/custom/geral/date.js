const startDate = new Date("2020-12-26T00:00:00");
const updateCounter = () => {
    const now = new Date();
    const diff = now - startDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);
    const months = Math.floor((days % 365) / 30);

    document.getElementById('time-together').innerHTML =
        `${years} anos, ${months} meses, ${days % 30} dias, ${hours % 24} horas, ${minutes % 60} minutos e ${seconds % 60} segundos`;

    document.getElementById('time-together-year').innerHTML = `${years} anos`;
};

setInterval(updateCounter, 1000);