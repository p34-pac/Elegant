

// menuBtn.addEventListener('click', (e)=>{
//     let menu = menuBtn.getAttribute('data-toggle')
//     if(document.querySelector(`.${menu}`).classList.contains("closed")){
//         document.querySelector(`.${menu}`).classList.remove('closed')
//         document.body.style.overflow = "hidden"
//     }

// })



function close(closeBtn){
    let close = closeBtn.getAttribute('data-toggle')
    if(!document.querySelector(`.${close}`).classList.contains("closed")){
        console.log(document.querySelector(`.${close}`))
        document.querySelector(`.${close}`).classList.add('closed')
        document.body.style.overflow = "auto"
    }
}
function open(menuBtn){
    let menu = menuBtn.getAttribute('data-toggle')

    if(document.querySelector(`.${menu}`).classList.contains("closed")){
        document.querySelector(`.${menu}`).classList.remove('closed')
        document.body.style.overflow = "hidden"
    }
}

document.body.addEventListener('click', (e)=>{
    let target = null
    if(e.target.classList.contains("cover-rest")){
        target = e.target
        close(target)

    }
    if(e.target.classList.contains('close')){
        target = e.target
        close(target)

    }else if( e.target.parentElement.classList.contains('close')){
        target = e.target.parentElement
        close(target)
    }else if(e.target.classList.contains('open')){
        target = e.target
        open(target)
    }else if( e.target.parentElement.classList.contains('open')){
        target = e.target.parentElement
        open(target)
    }

})