document.addEventListener('DOMContentLoaded', () => {
    const pointer = document.getElementById('slider-pointer');
    const sweetSpot = document.getElementById('slider-sweet-spot');
    const resultMessage = document.getElementById('result-message');
    const toggleBtn = document.getElementById('toggle-settings-btn');
    const restartBtn = document.getElementById('restart-btn');
    const settingsBar = document.getElementById('settings-bar');
    const speedSlider = document.getElementById('speed-slider');
    const sweetSpotSlider = document.getElementById('sweet-spot-slider');
    const speedValueDisplay = document.getElementById('speed-value');
    const sweetSpotValueDisplay = document.getElementById('sweet-spot-value');
    const trackWidth = document.getElementById('slider-track').offsetWidth;

    let sweetSpotSize = 10;
    let speed = 2;
    let pointerPosition = 0;
    let direction = 1;
    let gameInterval;
    let isGameOver = false;

    function initializeGame() {
        isGameOver = false;
        pointerPosition = 0;
        direction = 1;
        
        // Update sweet spot size from the slider
        sweetSpot.style.width = `${sweetSpotSize}%`;
        
        // Randomize the sweet spot position
        const sweetSpotLocation = Math.random() * (100 - sweetSpotSize);
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
