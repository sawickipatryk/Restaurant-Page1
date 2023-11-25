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
const carouselChildrens = [...carousel.children]

let isDragging = false
let startX = 0
let startScrollLeft = 0


let cardPerView = Math.round(carousel.offsetWidth / firstCardWith)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

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
const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {

        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove('no-transition')

    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add('no-transition')
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove('no-transition')
    }
}

carousel.addEventListener('mousedown', startDrag)
carousel.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', stopDrag)
carousel.addEventListener('scroll', infiniteScroll)