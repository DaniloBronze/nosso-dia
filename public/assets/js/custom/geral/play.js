const musicList = [
    "assets/media/All.mp4",
    "assets/media/Crazy.mp4",
    "assets/media/Die.mp4",
    "assets/media/until-i-found-you.mp4",
    "assets/media/Foreigner.mp3",
    "assets/media/baker-street.mp3",
    "assets/media/Heaven.mp3",
];

const audioPlayer = document.getElementById("audioPlayer");
const canvas = document.getElementById("batidas_canvas");
const ctx = canvas.getContext("2d");
let currentTrackIndex = 0;
let audioContext;
let analyser;
let source;

function playMusic(index) {
    currentTrackIndex = index;
    audioPlayer.src = musicList[currentTrackIndex];
    audioPlayer.play()
        .then(() => {})
        .catch(err => {
            console.error("Erro ao tentar reproduzir a música:", err);
        });
}

function setupVisualizer() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (source) {
        source.disconnect();
    }

    source = audioContext.createMediaElementSource(audioPlayer);
    analyser = audioContext.createAnalyser();

    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function updateVisualizer() {
        analyser.getByteFrequencyData(dataArray);

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

        const red = Math.min(255, Math.max(50, average * 2));
        const green = Math.min(255, Math.max(30, average * 1.5));
        const blue = Math.min(255, Math.max(100, average));

        document.body.style.background = `radial-gradient(circle, rgba(${red},${green},${blue},1) 0%, rgba(9,10,16,1) 70%)`;

        // Limpar o canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const heartSize = average / 1.2;  // O tamanho do coração depende da intensidade do áudio

        // Ajustar a cor do coração
        const heartColor = `rgb(${Math.min(255, average * 2)}, ${Math.min(255, average * 1.5)}, ${255 - average})`;

        // Desenhar o coração pulsante
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + heartSize / 4);

        ctx.bezierCurveTo(centerX - heartSize / 2, centerY - heartSize / 2, centerX - heartSize, centerY + heartSize / 2, centerX, centerY + heartSize);

        ctx.bezierCurveTo(centerX + heartSize, centerY + heartSize / 2, centerX + heartSize / 2, centerY - heartSize / 2, centerX, centerY + heartSize / 4);

        ctx.closePath();
        ctx.fillStyle = heartColor;
        ctx.fill();

        requestAnimationFrame(updateVisualizer);
    }

    updateVisualizer();
}


audioPlayer.addEventListener("play", () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (!source) {
        source = audioContext.createMediaElementSource(audioPlayer);
        analyser = audioContext.createAnalyser();

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        function updateVisualizer() {
            analyser.getByteFrequencyData(dataArray);

            const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
            const red = Math.min(255, Math.max(50, average * 2));
            const green = Math.min(255, Math.max(30, average * 1.5));
            const blue = Math.min(255, Math.max(100, average));

            document.body.style.background = `radial-gradient(circle, rgba(${red},${green},${blue},1) 0%, rgba(9,10,16,1) 70%)`;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const centerX = canvas.width / 1.8;
            const centerY = canvas.height / 4;
            const heartSize = average / 0.9;  // O tamanho do coração depende da intensidade do áudio

            const heartColor = `rgb(${Math.min(255, average * 2)}, ${Math.min(255, average * 1.5)}, ${255 - average})`;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY + heartSize / 4);

            ctx.bezierCurveTo(centerX - heartSize / 2, centerY - heartSize / 2, centerX - heartSize, centerY + heartSize / 2, centerX, centerY + heartSize);

            ctx.bezierCurveTo(centerX + heartSize, centerY + heartSize / 2, centerX + heartSize / 2, centerY - heartSize / 2, centerX, centerY + heartSize / 4);

            ctx.closePath();
            ctx.fillStyle = heartColor;
            ctx.fill();

            requestAnimationFrame(updateVisualizer);
        }

        updateVisualizer();
    }
});

audioPlayer.addEventListener("ended", () => {
    currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
    playMusic(currentTrackIndex);
});

playMusic(0);