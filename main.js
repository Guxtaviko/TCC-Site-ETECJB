// Changes navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0)
})

// show/hide nav menu
const menu = document.querySelector(".nav__menu");
const openBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

openBtn.addEventListener('click', () => {
    menu.style.display = "flex";
    closeBtn.style.display = "inline-block";
    openBtn.style.display = "none";
})

closeBtn.addEventListener('click', () => {
    menu.style.display = "none";
    closeBtn.style.display = "none";
    openBtn.style.display = "inline-block";
})

// show/hide secret cmd 
const cmd = document.querySelector(".secret__cmd");
const secretBtn = document.getElementById("secret");
const cmdText = document.getElementById("auto-type");
const devs = document.querySelector(".secret__devs")

var messageArray = [`C:\\Users\\3DS\\2022> <span class="cmd__cd">cd Desenvolvedores</span> \nC:\\Users\\3DS\\2022\\Desenvolvedores>`];
var textPosition = 0;
var speed = 80;

function typewriter() {
    cmdText.innerHTML = messageArray[0].substring(0, textPosition) + `<span class="blinker">_</span>`;

    if (textPosition++ != messageArray[0].length) {
        setTimeout(typewriter, speed)
    } else {
        devs.style.display = "flex"
    }
}

secretBtn.addEventListener('click', () => {
    if (cmd.style.display == "none") {
        cmd.style.display = "flex";
        typewriter();
    } else {
        cmd.style.display = "none"
    }
})

// reveal history on scroll
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 150;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
