const navBar = document.querySelector('.nav__links')
const toggle = document.querySelector('.toggle__menu')

toggle.addEventListener('click', () => {

    if (!navBar.classList.contains('active')) {
        navBar.classList.add('active')
        return
    }
    navBar.classList.remove('active')
})

const carousel = document.querySelector('.slider__carousel')
const arrowBtns = document.querySelectorAll('.slider__arrow')
const firstCardWidth = carousel.querySelector('.carousel__card').offsetWidth
const carouselChildrens = [...carousel.children]

let isDraging = false
let startX = 0
let startScrollLeft = 0

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})
carouselChildrens.slice(0, -cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth

    })
})

const startDrag = (e) => {
    isDraging = true
    carousel.classList.add('dragging')
    startX = e.pageX
    startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
    if (!isDraging) return
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
}
const stopDrag = (e) => {
    isDraging = false
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

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mousedown', startDrag)
document.addEventListener('mouseup', stopDrag)
carousel.addEventListener('scroll', infiniteScroll)