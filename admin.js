// switch theme
const getStyle = (element, style) => 
    window
    .getComputedStyle(element)
    .getPropertyValue(style)


const root = document.querySelector(':root');
const switcher = document.querySelector(".theme__switch");
const themeIcon = document.querySelector(".theme-icon");

const initialColors = {
    asfaltBg: getStyle(root, "--asfalt-bg"),
    shatteredBg: getStyle(root, "--shattered-bg"),
    colorBg: getStyle(root, "--color-bg"),
    colorLight: getStyle(root, "--color-light"),
    colorWhite: getStyle(root, "--color-white"),
    colorBlack: getStyle(root, "--color-black")
}

const darkMode = {
    asfaltBg: 'url("https://www.transparenttextures.com/patterns/asfalt-dark.png")',
    shatteredBg: 'url("https://www.transparenttextures.com/patterns/shattered-dark.png")',
    colorBg: "#212121",
    colorLight: "#313131",
    colorWhite: "#121212",
    colorBlack: "#FFF"
}

const transformKey = key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
        root.style.setProperty(transformKey(key), colors[key])
    )
}

const clearThemeIcon = () => {
    themeIcon.className = "";
    themeIcon.classList.add('uil', 'theme-icon');
}

let isDark = false;

window.onload = () => {
    if (localStorage.theme) {
        clearThemeIcon();
        themeIcon.classList.add(localStorage.icon);
        var theme = localStorage.theme
        switch (theme) {
            case 'dark':
                changeColors(darkMode);
                isDark = true;
                break;
            case 'initial':
                changeColors(initialColors);
                isDark = false;
                break;
            default:
                changeColors(initialColors);
                break;
        }
    }
}

const changeTheme = () => {
    isDark = !isDark;
    clearThemeIcon();
    if (isDark) {
        themeIcon.classList.add('uil-moon');
        changeColors(darkMode);
        localStorage.setItem('icon', 'uil-moon');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.add('uil-sun');
        changeColors(initialColors);
        localStorage.setItem('icon', 'uil-sun');
        localStorage.setItem('theme', 'initial');
    }
}

switcher.addEventListener('click', () => {
    changeTheme();
})