const navBar = document.querySelector('.nav__links')
const toggle = document.querySelector('.toggle__menu')

toggle.addEventListener('click', () => {

    if (!navBar.classList.contains('active')) {
        navBar.classList.add('active')
        return
    }
    navBar.classList.remove('active')
})

const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.arrow')
const firstCardWith = carousel.querySelector('.card').offsetWidth

let isDragging = false
let startX = 0
let startScrollLeft = 0

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWith : firstCardWith
    })
})

const startDrag = (e) => {
    isDragging = true
    carousel.classList.add('dragging')
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
}
const dragging = (e) => {
    if (!isDragging) return
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}
const stopDrag = () => {
    isDragging = false
    carousel.classList.remove('dragging')

}

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mousedown', startDrag)
document.addEventListener('mouseup', stopDrag)