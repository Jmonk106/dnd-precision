document.addEventListener('DOMContentLoaded', () => {
    const pointer = document.getElementById('slider-pointer');
    const sweetSpot = document.getElementById('slider-sweet-spot');
    const resultMessage = document.getElementById('result-message');
    const toggleBtn = document.getElementById('toggle-settings-btn');
    const startBtn = document.getElementById('start-btn');
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
    let isGameRunning = false;

    function initializeUI() {
        // Set initial sweet spot size and center it
        sweetSpot.style.width = `${sweetSpotSize}%`;
        const sweetSpotCenter = (100 - sweetSpotSize) / 2;
        sweetSpot.style.left = `${sweetSpotCenter}%`;

        // Reset pointer and messages
        pointer.style.left = '0px';
        resultMessage.textContent = '';

        // Show/hide buttons
        startBtn.classList.remove('hidden');
        restartBtn.classList.add('hidden');
    }

    function startGame() {
        isGameRunning = true;
        pointerPosition = 0;
        direction = 1;
        startBtn.classList.add('hidden');

        clearInterval(gameInterval);
        gameInterval = setInterval(movePointer, 10);
    }
    
    function startCountdown() {
        let count = 3;
        resultMessage.textContent = `Starting in ${count}...`;
        startBtn.classList.add('hidden');
        
        const countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                resultMessage.textContent = `Starting in ${count}...`;
            } else {
                clearInterval(countdownInterval);
                startGame();
            }
        }, 1000);
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

    // Update speed from slider (handling decimal values)
    speedSlider.addEventListener('input', (event) => {
        speed = parseFloat(event.target.value);
        speedValueDisplay.textContent = speed;
    });

    // Update sweet spot size from slider (and recenter)
    sweetSpotSlider.addEventListener('input', (event) => {
        sweetSpotSize = parseFloat(event.target.value);
        sweetSpotValueDisplay.textContent = `${sweetSpotSize}%`;
        const sweetSpotCenter = (100 - sweetSpotSize) / 2;
        sweetSpot.style.left = `${sweetSpotCenter}%`;
    });

    // Handle spacebar press for the QTE
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Space' && isGameRunning) {
            isGameRunning = false;
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

    // Handle start button click
    startBtn.addEventListener('click', () => {
        startCountdown();
    });

    // Handle restart button click
    restartBtn.addEventListener('click', () => {
        initializeUI();
    });

    // Initial UI setup on page load
    initializeUI();
});
