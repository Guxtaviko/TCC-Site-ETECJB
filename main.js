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
        setTimeout(typewriter, speed);
    } else {
        devs.style.display = "flex";
    }
}

secretBtn.addEventListener('click', () => {
    if (cmd.style.display == "none") {
        cmd.style.display = "flex";
        typewriter();
    } else {
        cmd.style.display = "none";
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

// team table
let sortDirection;
let sortName = false;
let sortRole = false;

let equipeDocente = [
    { name: "Gustavo Vieira da Silva", role: "Faz Tudo" },
    { name: "Lucas EEE", role: "Sexologo" },
    { name: "Barry B. Benson", role: "Abelhas??" },
    { name: "Zeca Dinamarca", role: "Apicultor" },
    { name: "Jorge", role: "Faz Tudo" },
    { name: "Hiago", role: "Faz Tudo" },
    { name: "Bruno", role: "Maconha" },
    { name: "Gustavo Pereira Artes", role: "Ark Survival Evolved" },
    { name: "Gustavo", role: "Faz Tudo" },
    { name: "Corazon", role: "Marinha" },
    { name: "Matheus Pinto", role: "Ferreiro" },
    { name: "Gustavo Oliveira", role: "Faz Tudo" },
    { name: "Zeca Dinamarca", role: "Apicultor" },
    { name: "Jorge", role: "Faz Tudo" },
    { name: "Hiago", role: "Faz Tudo" },
    { name: "Bruno", role: "Maconha" },
    { name: "Franciscada", role: "Rosh Duplo" },
    { name: "Carioquinha", role: "Feijão" },
    { name: "Bruno Chedar", role: "Goleiro" },
    { name: "Somalia", role: "Sequestrador" },
    { name: "Saraiva", role: "Mongo" },
    { name: "Luka Modric", role: "DO GALO" },
    { name: "Alberto", role: "Zelador" }
]

let equipeEscolar = [
    { name: "Gustavo Vieira da Silva", role: "Faz Tudo" },
    { name: "Equipe Escolar", role: "Sei lá" },
    { name: "Funciona ", role: "hihi" },
    { name: "Lucas EEE", role: "Sexologo" },
    { name: "Barry B. Benson", role: "Abelhas??" },
    { name: "Zeca Dinamarca", role: "Apicultor" },
    { name: "Jorge", role: "Faz Tudo" },
    { name: "Hiago", role: "Faz Tudo" },
    { name: "Bruno", role: "Maconha" },
    { name: "Franciscada", role: "Rosh Duplo" },
    { name: "Carioquinha", role: "Feijão" },
    { name: "Bruno Chedar", role: "Goleiro" },
    { name: "Somalia", role: "Sequestrador" },
    { name: "Saraiva", role: "Mongo" },
    { name: "Luka Modric", role: "DO GALO" },
    { name: "Alberto", role: "Zelador" }
]

let conselhoEscolar = [
    { name: "Francisco Oliveira Rocha Silva", role: "Monstro" },
    { name: "Conselho Escolar", role: "Sei lá" },
    { name: "Funciona ", role: "hihi" },
    { name: "Lucas EEE", role: "Sexologo" },
    { name: "Barry B. Benson", role: "Abelhas??" },
    { name: "Zeca Dinamarca", role: "Apicultor" },
    { name: "Jorge", role: "Faz Tudo" },
    { name: "Hiago", role: "Faz Tudo" },
    { name: "Bruno", role: "Maconha" },
    { name: "Franciscada", role: "Rosh Duplo" },
    { name: "Carioquinha", role: "Feijão" },
    { name: "Bruno Chedar", role: "Goleiro" },
    { name: "Somalia", role: "Sequestrador" },
    { name: "Saraiva", role: "Mongo" },
    { name: "Luka Modric", role: "DO GALO" },
    { name: "Easter Egg kkkkkkkkkk", role: "Zelador" }
]

let tableData = equipeDocente

let i = 0;

window.onload = () => {
    loadTableData(tableData)
}

function setTableData(data) {
    tableData = data;
    i = 0;
    sortName = false 
    sortRole = false;
    clearIcon();
    setCurrentTeam(data);
    loadTableData(tableData);
} 

function setCurrentTeam(team) {
    const teams = document.querySelectorAll('.team');
    const current = document.querySelector(".--current");
    current.classList.remove('--current');
    switch (team) {
        case equipeDocente:
            teams[0].classList.add('--current')
            break;
        case equipeEscolar:
            teams[1].classList.add('--current')
            break;
        case conselhoEscolar:
            teams[2].classList.add('--current')
            break;
    }
}

function loadTableData(tableData) {
    const tableBody = document.getElementById('tableData');
    const tablePages = document.getElementById('tablePages');
    const dataPerPage = 10;
    let dataHtml = '';

    for (i; i < tableData.length; i++) {
        var person = tableData[i];
        dataHtml += `<tr><td>${person.name}</td><td>${person.role}</td></tr>`;
        if ((i + 1) % dataPerPage == 0) {
            break;
        }
    }

    // Draws pagination
    if (tableData.length > dataPerPage) {
        tablePages.style.display = "flex";
        tablePages.innerHTML = '';
        const pageQnt = Math.ceil(tableData.length / dataPerPage);
        for (let j = 1; j <= pageQnt; j++) {
            tablePages.innerHTML += `<div class="page">${j}</div>`
        }

        document.querySelectorAll('.page').forEach(page => {
            page.addEventListener('click', () => {
                pageNumber = parseInt(page.innerHTML) - 1;
                i = dataPerPage * pageNumber;
                loadTableData(tableData);
            })
            if ((parseInt(page.innerHTML) * dataPerPage - i) < dataPerPage && (parseInt(page.innerHTML) * dataPerPage - i) > 0) {
                page.classList.add('active')
            }
        })
    }

    tableBody.innerHTML = dataHtml;
}

function sortColumn(columnName) {
    // Icon change
    const columnI = document.getElementById(`i__${columnName}`);
    clearIcon();

    switch (columnName) {
        case "name":
            sortName = !sortName;
            sortDirection = sortName;
            sortRole = false;
            break;
        case "role":
            sortRole = !sortRole;
            sortDirection = sortRole;
            sortName = false;
            break;
    }

    if (sortDirection) {
        tableData = tableData.sort(function (a, b) { return a[columnName] > b[columnName] ? 1 : -1; });
        columnI.className = "";
        columnI.classList.add('uil', 'uil-angle-down', 'th-icon');
    } else {
        tableData = tableData.reverse();
        columnI.className = "";
        columnI.classList.add('uil', 'uil-angle-up', 'th-icon');
    }
    i = 0;

    loadTableData(tableData)

}

function clearIcon() {
    const thIcons = document.querySelectorAll('.th-icon');
    thIcons.forEach(icon => {
        icon.className = "";
        icon.classList.add('uil', 'uil-angle-right', 'th-icon')
    });
}


