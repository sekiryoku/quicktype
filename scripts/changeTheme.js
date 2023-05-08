const fonts = ['IBM Plex Mono', 'Source Code Pro', 'Roboto Mono', 'Courier Prime'];
let currentFontIndex = fonts.indexOf(localStorage.getItem('selectedFont'));

const colors = ['#0A0A0A',  '#121212', '#263238', '#352E2E'];
let currentColorIndex = colors.indexOf(localStorage.getItem('selectedColor'));
const newKeyboards = document.querySelectorAll('.keyboard');

function changeThemeAndFont() {
    currentFontIndex = (currentFontIndex + 1) % fonts.length;
    document.body.style.fontFamily = fonts[currentFontIndex];
    localStorage.setItem('selectedFont', fonts[currentFontIndex]);

    currentColorIndex = (currentColorIndex + 1) % colors.length;
    const color = colors[currentColorIndex];
    document.body.style.backgroundColor = color;
    document.documentElement.style.backgroundColor = color;
    document.querySelector('textarea').style.backgroundColor = color;
    newKeyboards.forEach(keyboard => {
        keyboard.style.backgroundColor = color;
    });
    localStorage.setItem('selectedColor', color);
}

const changeThemeAndFontButton = document.getElementById('themeChangeBtn');
changeThemeAndFontButton.addEventListener('click', changeThemeAndFont);
    if (currentFontIndex !== -1) {
        const font = fonts[currentFontIndex];
        document.body.style.fontFamily = font;
    }

    if (currentColorIndex !== -1) {
        const color = colors[currentColorIndex];
        document.body.style.backgroundColor = color;
        document.documentElement.style.backgroundColor = color;
        document.querySelector('textarea').style.backgroundColor = color;
        newKeyboards.forEach(keyboard => {
            keyboard.style.backgroundColor = color;
    });
}  