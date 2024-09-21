https://thainlao.github.io/ozon_task/

---

# Тестовое задание

---

Реализовал в соответствии с тз на 
JS, CSS, HTML.

---

Реализовал api для управления состоянием 

```
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
```

---

Реализовал три состояния

Normal - когда input управляется от ручного ввода Value,
Animated - добавил что каждые 200 мс увеличивается Value на + 1
Hidden - когда блок скрывается со страницы.

```
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
    }, 200); // каждые 200 мс +1
}

function stopAnimation() {
    clearInterval(animationInterval);
}
```

---

Также добавил обработчик на input где можно ввести только цифры и значение (value) не может быть > 100 и < 0.

```
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
```

---

Долго думал над реализацией того, как заполняется дуга
и нашел реализацию на [stackoverflow](https://stackoverflow.com/questions/13059190/html5-css3-circle-with-partial-border)
можно было так делать или нет не сказано, поэтому оставляю это на ваш суд

```
.bar {
    border: solid 10px #005cff;
    height: 80px;
    width: 80px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    transition: all 0.2s ease-in;
    background-color: white;
    --mask: 
      linear-gradient(#005cff, #005cff) padding-box, 
      conic-gradient(#005cff var(--p, 60%), transparent 0%) border-box;
    -webkit-mask: var(--mask);
        mask: var(--mask)
}
```

устанавливая параметр "value" - var(--p, 60%) - где value (%) то так и заполняется дуга.
а маска работает так, что conic-gradient(#005cff var(--p, 60%), transparent 0%) border-box — это конический градиент, который создаёт круговую прогресс-анимацию. Значение var(--p, 60%) указывает на угол, до которого будет закрашен круг.

---

Также реализовал адативную верстку. 
