const app = (function () {
    const navBar = document.querySelector('.nav__links')
    const toggle = document.querySelector('.toggle__menu')

    toggle.addEventListener('click', () => {

        if (!navBar.classList.contains('active')) {
            navBar.classList.add('active')
            return
        }
        navBar.classList.remove('active')
    })

    const btns = document.querySelectorAll('.menu__btn-drink')
    const items = document.querySelectorAll('.menu__pizza-container')
    const itemsContainer = document.querySelector('.menu__container')


    btns.forEach(btn => {

        btn.addEventListener('click', (e) => {

            btns.forEach(btn => btn.classList.remove('active'))

            btn.classList.add('active')

            const id = e.target.dataset.options.toLowerCase()
            let choices = [...items]
            if (id === 'all') {
                itemsContainer.innerHTML = ''
                choices.forEach(choice => itemsContainer.appendChild(choice))
            } else {
                let choices = [...items];
                itemsContainer.innerHTML = ''
                choices = choices.filter(choice => choice.getAttribute('data-options').toLowerCase().includes(id))
                itemsContainer.innerHTML = ''
                choices.forEach(choice => itemsContainer.appendChild(choice))
            }

        })
    })
})()

