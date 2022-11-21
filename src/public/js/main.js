// Changes navbar style on scroll
window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0)
})

// show/hide nav menu
const menu = document.querySelector(".nav__menu");
const openBtn = document.querySelector("#open-menu-btn");
const closeBtn = document.querySelector("#close-menu-btn");

window.addEventListener('resize', () => {
    if (window.innerWidth > 1060) {
        closeBtn.style.display = "none";
        openBtn.style.display = "none";
        menu.style.display = "flex";
    } 
    else {
        closeBtn.style.display = "none"
        openBtn.style.display = "inline-block";
        menu.style.display = "none";
    }
})

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


// show/hide secret cmd 
const cmd = document.querySelector(".secret__cmd");
const secretBtn = document.getElementById("secret");
const cmdText = document.getElementById("auto-type");
const devs = document.querySelector(".secret__devs");

var isCMDDisplayed = cmd.style.display == 'flex';
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
    if (isCMDDisplayed) {
        cmd.style.display = "none";
    } else {
        cmd.style.display = "flex";
        typewriter();
    }
    isCMDDisplayed = !isCMDDisplayed;
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

let sortDirection;
let sortName = false;
let sortRole = false;

async function teamTable(innerFun) {
    // team table
    let start = 1;
    let initalPageQnt = 3;

    let equipeDocente = await getTeams('Equipe Docente')

    let equipeEscolar = await getTeams('Equipe Escolar')

    let conselhoEscolar = await getTeams('Conselho Escolar')

    let tableData = equipeDocente

    let i = 0;

    function setTableData(data) {
        tableData = data;
        i = 0;
        sortName = false; 
        sortRole = false;
        start = 1;
        initalPageQnt = 3;
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
            dataHtml += `<tr><td>${person.employee_name}</td><td>${person.employee_role}</td></tr>`;

            if (i + 1 == tableData.length && tableData.length % dataPerPage != 0) {
                for (let j = 1; j < (Math.ceil(tableData.length/dataPerPage) * dataPerPage) - i; j++) {
                    dataHtml += `<tr><td><p class="hidden">Gustavo Vieira da Silva</p></td><td><p class="hidden">Faz Tudo</p></td></tr>`;
                }
            }
            if ((i + 1) % dataPerPage == 0) {
                break;
            }
        }

        // Draws pagination
        loadPagination(tablePages, dataPerPage, initalPageQnt, start)
        
        tableBody.innerHTML = dataHtml;
    }

    function loadPagination(tablePages, dataPerPage, displayPageQnt, startPG) {
        if (tableData.length > dataPerPage) {
            tablePages.style.display = "flex";
            tablePages.innerHTML = '';
            const pageQnt = Math.ceil(tableData.length / dataPerPage);
            
            if (pageQnt >= displayPageQnt) {
                tablePages.innerHTML += `<i class="uil uil-angle-double-left page-icon prevPages"></i>`
                for (startPG; startPG <= displayPageQnt; startPG++) {
                    tablePages.innerHTML += `<div class="page">${startPG}</div>`
                }
                tablePages.innerHTML += `<i class="uil uil-angle-double-right page-icon nextPages"></i>`

                const prevPages = document.querySelector('.prevPages');
                const nextPages = document.querySelector('.nextPages');
        
                prevPages.addEventListener('click', () => {
                    if (displayPageQnt > 3) {
                        startPG -= 3;
                        displayPageQnt = Math.ceil(displayPageQnt/3.0) * 3;
                        displayPageQnt -= 3;
                        start = displayPageQnt - 2;
                        loadPagination(tablePages, dataPerPage, displayPageQnt, start); 
                    }
                })
        
                nextPages.addEventListener('click', () => {
                    tablePages.innerHTML = '';
                    if (startPG > pageQnt) {
                        startPG = (Math.ceil(pageQnt/3.0) * 3) - 2;
                    } else if (startPG + displayPageQnt <= pageQnt || startPG + 3 == pageQnt) {
                        displayPageQnt += 3;
                    } else {
                        displayPageQnt = pageQnt
                    }
                    start = startPG;
                    loadPagination(tablePages, dataPerPage, displayPageQnt, start)
                })

            } else {
                for (let j = 1; j <= pageQnt; j++) {
                    tablePages.innerHTML += `<div class="page">${j}</div>`
                }
            }

            document.querySelectorAll('.page').forEach(page => {
                page.addEventListener('click', () => {
                    pageNumber = parseInt(page.innerHTML) - 1;
                    i = dataPerPage * pageNumber;
                    initalPageQnt = displayPageQnt;
                    loadTableData(tableData);
                })
                if ((parseInt(page.innerHTML) * dataPerPage - i) < dataPerPage && (parseInt(page.innerHTML) * dataPerPage - i) > 0) {
                    page.classList.add('active')
                }
            })
        }
    }

    function clearIcon() {
        const thIcons = document.querySelectorAll('.th-icon');
        thIcons.forEach(icon => {
            icon.className = "";
            icon.classList.add('uil', 'uil-angle-right', 'th-icon')
        });
    }

    function sortColumn(columnName) {
        // Icon change
        const columnI = document.getElementById(`i__${columnName}`);
        clearIcon();
    
        switch (columnName) {
            case "employee_name":
                sortName = !sortName;
                sortDirection = sortName;
                sortRole = false;
                break;
            case "employee_role":
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

    switch (innerFun) {
        case 'equipeDocente':
            setTableData(equipeDocente)
            break;
        case 'equipeEscolar':
            setTableData(equipeEscolar)
            break;
        case 'conselhoEscolar':
            setTableData(conselhoEscolar)
            break;
        case 'name':
            sortColumn('employee_name')
            break;
        case 'role':
            sortColumn('employee_role')
            break;
        default:
            break;
    }

}

async function getTeams(team) {
    let funcionarios
    await fetch(`/funcionarios/${team}`).then(async resp => funcionarios = await resp.json())
    return funcionarios
}



// Scroll to Map
function scrollMap() {
    const scrollMapBtn = document.querySelector('.scroll__map');
    const map = document.querySelector('.map');
    let mapBottom = map.getBoundingClientRect().bottom;
    let viewportHeight = window.innerHeight;
    scrollMapBtn.addEventListener('click', () => {
        document.body.scrollTop = mapBottom - viewportHeight;
        document.documentElement.scrollTop = mapBottom - viewportHeight;
    })

}

// Open/Close Modal 
async function coursesModal() {
    const modalBlur = document.querySelector('.modal__blur');
    const closeModal = document.querySelector('.modal__close')
    const modal = document.querySelector('.modalSwiper')
    const modalImg = modal.querySelector('img')
    const modalName = modal.querySelector('h1')
    const modalDesc = modal.querySelector('.modal__desc')
    const modalInfo = modal.querySelector('.modal__info')
    const coursesBttns = document.querySelectorAll('.course__btn');

    coursesBttns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const courseId = btn.getAttribute('data-course-id')
            let course
            await fetch(`/curso/${courseId}`).then(async resp => {
                course = await resp.json()
            })
            modalImg.src = `/uploads/courses/imgs/${course.course_img}`
            modalName.innerHTML = course.course_name
            modalDesc.innerHTML = course.course_desc
            modalInfo.innerHTML = `
                <span class="modal__duration"><i class="uil uil-clock"></i> ${course.course_workload}hrs</span>
                <span class="modal__vacancies"><i class="uil uil-users-alt"></i> ${course.course_vacancies}</span>
                <span class="modal__period"><i class="uil uil-calendar-alt"></i> ${course.course_shift}</span>
                <span class="modal__curriculum"><a href="/uploads/courses/curricula/${course.course_curriculum}"><i class="uil uil-diary"></i> Matriz Curricular</a></span>
                <span class="modal__coordinator"><i class="uil uil-user-square"></i> ${course.course_coordinator}</span>
                <span class="modal__coordinator--email"><i class="uil uil-envelope"></i> ${course.course_email}</span>
            `


            const courseType = btn.getAttribute('data-course-type');
            if(courseType == 'Parcial'){
                modal.classList.add('--parcial')
            } else {
                if (modal.classList.contains('--parcial')) {
                    modal.classList.remove('--parcial')
                }
            }
            modalBlur.style.display = 'block';
            modal.style.display = 'flex';
        })
    });

    closeModal.addEventListener('click', () => {
        modalBlur.style.display = 'none';
        modal.style.display = 'none';
    });

    modalBlur.addEventListener('click', () => {
        modalBlur.style.display = 'none';
        modal.style.display = 'none';
    });
}

const directorMenu = document.querySelector('.director__menu')
var isDirectorDisplayed = directorMenu.style.display == 'block'

function openDirector() {
    if (isDirectorDisplayed) {
        directorMenu.style.display = 'none';
    } else {
        directorMenu.style.display = 'block';
    }
    isDirectorDisplayed = !isDirectorDisplayed
}

document.addEventListener('click', (e) => {
    if(isDirectorDisplayed && !e.target.closest(".director__menu")){
        directorMenu.style.display = 'none';
        isDirectorDisplayed = false;
    }

    if(isCMDDisplayed && !e.target.closest(".secret__cmd") && !e.target.closest("#secret")){
        cmd.style.display = 'none';
        isCMDDisplayed = false;
    }
})

// Open/Close Faq 
function aboutFAQ() {
    document.querySelectorAll('.faq').forEach(faq => {
        faq.addEventListener('click', () => {
            faqAnswer = faq.querySelector('.faq__answer');
            faqIcon = faq.querySelector('.faq__icon')
            if (faqAnswer.style.display == 'block') {
                faqAnswer.style.display = 'none'
                faqIcon.classList.add("uil-angle-right")
                faqIcon.classList.remove("uil-angle-down")
            } else {
                faqAnswer.style.display = 'block'
                faqIcon.classList.remove("uil-angle-right")
                faqIcon.classList.add("uil-angle-down")
            }
        })
    });
}

function librarySwiper() {
    const librarySwiper = document.querySelector(".librarySwiper")
    document.querySelectorAll(".library__btn").forEach(btn => {
        btn.addEventListener('click', () => {
            librarySwiper.style.display = "block"
        })
    });
    librarySwiper.addEventListener('click', (e) => {
        if (e.target.classList.contains('swiper-slide-active')) {
            librarySwiper.style.display = "none"
        }
    })
}

function loginForm() {
    const inputs = document.querySelectorAll(".login__input")
    inputs.forEach(input => {
        const inputContainer = input.parentElement;
        input.addEventListener('focusin', () => {
            inputContainer.classList.add('activeInput')
        })
        input.addEventListener('focusout', () => {
            if (input.value == '') {
                inputContainer.classList.remove('activeInput')
            }
        })
    })

    const showPassBtn = document.querySelector(".show-password")
    const passwordInput = document.getElementsByName('password')[0]
    showPassBtn.addEventListener('click', () => {
        if (passwordInput.type === 'password') {
            showPassBtn.classList.remove('uil-eye')
            showPassBtn.classList.add('uil-eye-slash')
            passwordInput.type = 'text';
        } else {
            showPassBtn.classList.remove('uil-eye-slash')
            showPassBtn.classList.add('uil-eye')
            passwordInput.type = 'password';
        }
    })
}
