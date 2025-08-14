document.addEventListener('DOMContentLoaded', () => {
    const pointer = document.getElementById('slider-pointer');
    const sweetSpot = document.getElementById('slider-sweet-spot');
    const resultMessage = document.getElementById('result-message');
    const toggleBtn = document.getElementById('toggle-settings-btn');
    const restartBtn = document.getElementById('restart-btn');
    const settingsBar = document.getElementById('settings-bar');
    const speedSlider = document.getElementById('speed-slider');
    const sweetSpotSlider = document.getElementById('sweet-spot-slider');
    const sweetSpotLocationSlider = document.getElementById('sweet-spot-location-slider');
    const speedValueDisplay = document.getElementById('speed-value');
    const sweetSpotValueDisplay = document.getElementById('sweet-spot-value');
    const sweetSpotLocationValueDisplay = document.getElementById('sweet-spot-location-value');
    const trackWidth = document.getElementById('slider-track').offsetWidth;

    let sweetSpotSize = 10;
    let sweetSpotLocation = 45;
    let speed = 2;
    let pointerPosition = 0;
    let direction = 1;
    let gameInterval;
    let isGameOver = false;

    function initializeGame() {
        isGameOver = false;
        pointerPosition = 0;
        direction = 1;

        sweetSpot.style.width = `${sweetSpotSize}%`;
        sweetSpot.style.left = `${sweetSpotLocation}%`;

        resultMessage.textContent = '';
        pointer.style.left = '0px';
        restartBtn.classList.add('hidden');

        clearInterval(gameInterval);
        gameInterval = setInterval(movePointer, 10);
    }

    function movePointer() {
        const sweetSpotStart = sweetSpot.offsetLeft;
        const sweetSpotEnd = sweetSpot.offsetLeft + sweetSpot.offsetWidth;
        
        pointerPosition += direction * speed;
        if (pointerPosition >= trackWidth - pointer.offsetWidth || pointerPosition <= 0) {
            direction *= -1;
        }
        pointer.style.left = `${pointerPosition}px`;
    }

    // Toggle settings bar visibility
    toggleBtn.addEventListener('click', () => {
        settingsBar.classList.toggle('hidden');
    });

    // Update speed from slider
    speedSlider.addEventListener('input', (event) => {
        speed = parseInt(event.target.value);
        speedValueDisplay.textContent = speed;
        if (!isGameOver) {
            initializeGame();
        }
    });

    // Update sweet spot size from slider
    sweetSpotSlider.addEventListener('input', (event) => {
        sweetSpotSize = parseInt(event.target.value);
        sweetSpotValueDisplay.textContent = `${sweetSpotSize}%`;
        
        // Adjust max value of sweet spot location to prevent overflow
        sweetSpotLocationSlider.max = 100 - sweetSpotSize;
        if (sweetSpotLocation > 100 - sweetSpotSize) {
            sweetSpotLocation = 100 - sweetSpotSize;
            sweetSpotLocationSlider.value = sweetSpotLocation;
            sweetSpotLocationValueDisplay.textContent = `${sweetSpotLocation}%`;
        }

        if (!isGameOver) {
            initializeGame();
        }
    });

    // Update sweet spot location from slider
    sweetSpotLocationSlider.addEventListener('input', (event) => {
        sweetSpotLocation = parseInt(event.target.value);
        sweetSpotLocationValueDisplay.textContent = `${sweetSpotLocation}%`;
        if (!isGameOver) {
            initializeGame();
        }
    });

    // Handle spacebar press for the QTE
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && !isGameOver) {
            isGameOver = true;
            const sweetSpotStart = sweetSpot.offsetLeft;
            const sweetSpotEnd = sweetSpot.offsetLeft + sweetSpot.offsetWidth;
            
            clearInterval(gameInterval);
            restartBtn.classList.remove('hidden');

            if (pointerPosition >= sweetSpotStart && pointerPosition <= sweetSpotEnd) {
                resultMessage.textContent = 'Success! The energy is harnessed!';
                resultMessage.style.color = '#238636';
            } else {
                resultMessage.textContent = 'Failure! The energy is unstable. You lose a level!';
                resultMessage.style.color = '#ff7b72';
            }
        }
    });

    // Handle restart button click
    restartBtn.addEventListener('click', () => {
        initializeGame();
    });

    // Initial game setup
    initializeGame();
});
