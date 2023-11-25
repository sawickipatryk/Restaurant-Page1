const navBar = document.querySelector('.nav__links')
const toggle = document.querySelector('.toggle__menu')

toggle.addEventListener('click', () => {

    if (!navBar.classList.contains('active')) {
        navBar.classList.add('active')
        return
    }
    navBar.classList.remove('active')
})
