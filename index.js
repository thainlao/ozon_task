const valueInput = document.getElementById('valueInput');
const progressBar = document.getElementById('progressBar');
const animateSwitch = document.getElementById('animateSwitch');
const hideSwitch = document.getElementById('hideSwitch');

// Обработчик для изменения значения input + проверка на ввод
valueInput.addEventListener('input', () => {
    let value = Math.min(Math.max(parseInt(valueInput.value), 0), 100);

    if (isNaN(value) || value < 0) {
        value = 0;
    } else if (value > 100) {
        value = 100;
    }

    valueInput.value = value;
    progressBar.style.setProperty('--p', `${value}%`); 
});

// Анимация
animateSwitch.addEventListener('change', () => {
    if (animateSwitch.checked) {
        startAnimation();
    } else {
        stopAnimation();
    }
});

// Скрытие прогресс бара
hideSwitch.addEventListener('change', () => {
    const bar = document.getElementById('progressBar');
    bar.style.display = hideSwitch.checked ? 'none' : 'block';
});

let animationInterval;

function startAnimation() {
    animationInterval = setInterval(() => {
        const currentValue = parseInt(valueInput.value);
        if (currentValue < 100) {
            valueInput.value = currentValue + 1;
            valueInput.dispatchEvent(new Event('input'));
        }
    }, 200); // Увеличиваем значение каждые 200 мс
}

function stopAnimation() {
    clearInterval(animationInterval);
}

/* Создал Api для управления состоянием */
const ProgressBarAPI = {
    setValue(value) {
        value = Math.min(Math.max(parseInt(value), 0), 100);
        valueInput.value = value;
        progressBar.style.setProperty('--p', `${value}%`);
    },

    toggleAnimation(shouldAnimate) {
        if (shouldAnimate) {
            startAnimation();
        } else {
            stopAnimation();
        }
    },

    toggleVisibility(shouldHide) {
        progressBar.style.display = shouldHide ? 'none' : 'block';
    },

    getValue() {
        return parseInt(valueInput.value);
    },

    isVisible() {
        return progressBar.style.display !== 'none';
    },

    isAnimating() {
        return !!animationInterval;
    }
};