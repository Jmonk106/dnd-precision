document.addEventListener('DOMContentLoaded', () => {
    const pointer = document.getElementById('slider-pointer');
    const sweetSpot = document.getElementById('slider-sweet-spot');
    const resultMessage = document.getElementById('result-message');
    const toggleBtn = document.getElementById('toggle-settings-btn');
    const settingsBar = document.getElementById('settings-bar');
    const speedSlider = document.getElementById('speed-slider');
    const sweetSpotSlider = document.getElementById('sweet-spot-slider');
    const speedValueDisplay = document.getElementById('speed-value');
    const sweetSpotValueDisplay = document.getElementById('sweet-spot-value');
    const trackWidth = document.getElementById('slider-track').offsetWidth;

    let sweetSpotSize = 10; // Initial sweet spot size in percentage
    let speed = 2; // Initial speed
    let pointerPosition = 0;
    let direction = 1;
    let gameInterval;

    function initializeGame() {
        pointerPosition = 0;
        direction = 1;
        sweetSpot.style.width = `${sweetSpotSize}%`;
        
        // Randomize the sweet spot position
        const sweetSpotPosition = Math.random() * (100 - sweetSpotSize);
        sweetSpot.style.left = `${sweetSpotPosition}%`;

        resultMessage.textContent = '';
        pointer.style.left = '0px';

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
        initializeGame(); // Reset game with new speed
    });

    // Update sweet spot size from slider
    sweetSpotSlider.addEventListener('input', (event) => {
        sweetSpotSize = parseInt(event.target.value);
        sweetSpotValueDisplay.textContent = `${sweetSpotSize}%`;
        initializeGame(); // Reset game with new size
    });

    // Handle spacebar press for the QTE
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space') {
            const sweetSpotStart = sweetSpot.offsetLeft;
            const sweetSpotEnd = sweetSpot.offsetLeft + sweetSpot.offsetWidth;
            
            clearInterval(gameInterval);

            if (pointerPosition >= sweetSpotStart && pointerPosition <= sweetSpotEnd) {
                resultMessage.textContent = 'Success! The energy is harnessed!';
                resultMessage.style.color = '#238636';
            } else {
                resultMessage.textContent = 'Failure! The energy is unstable. You lose a level!';
                resultMessage.style.color = '#ff7b72';
            }
        }
    });

    // Initial game setup
    initializeGame();
});