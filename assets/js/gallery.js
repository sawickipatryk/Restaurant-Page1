const carousel = document.querySelector('.carousel')
const arrowBtns = document.querySelectorAll('.carousel__arrow')
const firstCardWidth = carousel.querySelector('.card').offsetWidth
const carouselChildren = [...carousel.children]

let isDragging = false
let startX = 0
let startScrollLeft = 0

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)

carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
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

carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mousedown', startDrag)
document.addEventListener('mouseup', stopDrag)
carousel.addEventListener('scroll', infiniteScroll)