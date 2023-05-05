const keyboards = document.querySelectorAll('.keyboard');
keyboards.forEach((keyboard) => {
    const keys = keyboard.querySelectorAll('.key');

    // Обработчик события нажатия клавиши
    document.addEventListener('keydown', (event) => {
        // Получаем символ нажатой клавиши
        let keyPressed = event.key.toUpperCase();
        // Находим соответствующую клавишу на клавиатуре
        let keyElement = Array.from(keys).find((key) => {
            return key.textContent.toUpperCase() === keyPressed;
        });
        
        // Для клавиши Backspace меняем символ на "DEL"
        if (keyPressed === 'BACKSPACE') {
            keyPressed = 'DEL';
            keyElement = keyboard.querySelector('.backspace');
        }
        
        // Для клавиши Space меняем символ на "SPACE"
        if (keyPressed === ' ') {
            keyPressed = 'SPACE';
            keyElement = keyboard.querySelector('.space');
        }
        
        // Если клавиша найдена, меняем ее цвет
        if (keyElement) {
            keyElement.classList.add('pressed');
        }
    });

    // Обработчик события отпускания клавиши
    document.addEventListener('keyup', (event) => {
        // Получаем символ отпущенной клавиши
        let keyReleased = event.key.toUpperCase();
        // Находим соответствующую клавишу на клавиатуре
        let keyElement = Array.from(keys).find((key) => {
        return key.textContent.toUpperCase() === keyReleased;
        });

        // Для клавиши Backspace меняем символ на "DEL"
        if (keyReleased === 'BACKSPACE') {
        keyReleased = 'DEL';
        keyElement = keyboard.querySelector('.backspace');
        }

        // Для клавиши Space меняем символ на "SPACE"
        if (keyReleased === ' ') {
        keyReleased = 'SPACE';
        keyElement = keyboard.querySelector('.space');
        }

        // Если клавиша найдена, убираем ее цвет
        if (keyElement) {
        keyElement.classList.remove('pressed');
        }
    });
});