

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
    let tempEle = ''
    let child = ''
    if(e.target.hasAttribute('data-toggle')){
        tempEle = e.target
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-toggle'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    }else if(e.target.parentElement.hasAttribute('data-toggle')){
        tempEle = e.target.parentElement
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-toggle'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    }else if(e.target.parentElement.parentElement.hasAttribute('data-toggle')){
        tempEle = e.target.parentElement.parentElement
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-toggle'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    }

    if(e.target.hasAttribute('data-value')){
        tempEle = e.target
        for (const key in tempEle.parentElement.children) {
            if (Object.hasOwnProperty.call(tempEle.parentElement.children, key)) {
                const theLiz = tempEle.parentElement.children[key];
                if(theLiz.hasAttribute("aria-selected")){
                    theLiz.removeAttribute("aria-selected")
                }
            }
        }

        tempEle.setAttribute("aria-selected", "true")

        let valueHolder = findChild(e.target.parentElement.parentElement.parentElement.children, 'text')
        
        valueHolder.innerText = ''
        let spl = tempEle.getAttribute('data-value').split('-').forEach(str => {
            valueHolder.innerText += " " + str
        });

    }

})

function findChild(fromObject, childClass) {
    for (const key in fromObject) {
        if (Object.hasOwnProperty.call(fromObject, key)) {
            const child = fromObject[key];

            if (child.classList.contains(childClass)) {
                return child;
            } else {
                // Add a return statement for the recursive call
                const foundChild = findChild(child.children, childClass);
                if (foundChild) {
                    return foundChild;
                }
            }
              
        }
    }
    
}

