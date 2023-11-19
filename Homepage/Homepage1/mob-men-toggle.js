let menuBtn = document.querySelector('.mobile-menu-btn')

menuBtn.addEventListener('click', (e)=>{
    let menu = menuBtn.getAttribute('data-toggle')
    document.querySelector(`.${menu}`).classList.remove('closed')


})

let closeBtn = document.querySelector('.close-slide')

closeBtn.addEventListener('click', (e)=>{
    let menu = menuBtn.getAttribute('data-toggle')
    document.querySelector(`.${menu}`).classList.add('closed')
})
