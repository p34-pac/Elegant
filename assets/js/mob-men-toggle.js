// menuBtn.addEventListener('click', (e)=>{
//     let menu = menuBtn.getAttribute('data-toggle')
//     if(document.querySelector(`.${menu}`).classList.contains("closed")){
//         document.querySelector(`.${menu}`).classList.remove('closed')
//         document.body.style.overflow = "hidden"
//     }

// })



function close(closeBtn) {
    let close = closeBtn.getAttribute('data-toggle')
    if (!document.querySelector(`.${close}`).classList.contains("closed")) {
        document.querySelector(`.${close}`).classList.add('closed')
        document.body.style.overflow = "auto"
    }
}

function open(menuBtn) {
    let menu = menuBtn.getAttribute('data-toggle')
    if (document.querySelector(`.${menu}`).classList.contains("closed")) {
        document.querySelector(`.${menu}`).classList.remove('closed')
        document.body.style.overflow = "hidden"
    }
}

document.body.addEventListener('click', (e) => {
    let target = null
    if (e.target.classList.contains("cover-rest")) {
        target = e.target
        close(target)

    }
    if (e.target.classList.contains('close')) {
        target = e.target
        close(target)

    } else if (e.target.parentElement.classList.contains('close')) {
        target = e.target.parentElement
        close(target)
    } else if (e.target.classList.contains('open')) {
        target = e.target
        open(target)
    } else if (e.target.parentElement.classList.contains('open')) {
        target = e.target.parentElement
        open(target)
    }
    let tempEle = ''
    let funcEle = ''
    let child = ''
    let prev = ''

    // drop menu
    if (e.target.hasAttribute('data-dropMenu')) {
        tempEle = e.target
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-dropMenu'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    } else if (e.target.parentElement.hasAttribute('data-dropMenu')) {
        tempEle = e.target.parentElement
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-dropMenu'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    } else if (e.target.parentElement.parentElement.hasAttribute('data-dropMenu')) {
        tempEle = e.target.parentElement.parentElement
        child = findChild(tempEle.parentElement.children, tempEle.getAttribute('data-dropMenu'))

        tempEle.parentElement.classList.toggle('dropped')
        child.classList.toggle('closed')
    }

    // change value +/-

    if (e.target.hasAttribute('data-value')) {
        tempEle = e.target
        for (const key in tempEle.parentElement.children) {
            if (Object.hasOwnProperty.call(tempEle.parentElement.children, key)) {
                const theLiz = tempEle.parentElement.children[key];
                if (theLiz.hasAttribute("aria-selected")) {
                    theLiz.removeAttribute("aria-selected")
                }
            }
        }

        tempEle.setAttribute("aria-selected", "true")
        // console.log(tempEle.parentElement.parentElement.parentElement.classList.toggle('dropped'))
        prev = findChild(tempEle.parentElement.parentElement.parentElement.children, 'dropList')
        prev.classList.add('closed')
        let valueHolder = findChild(e.target.parentElement.parentElement.parentElement.children, 'text')

        valueHolder.innerText = ''
        let spl = tempEle.getAttribute('data-value').split('-').forEach(str => {
            valueHolder.innerText += " " + str
        });

    }

    if (e.target.hasAttribute("class") && e.target.classList.contains('selectSelf')) {
        tempEle = e.target

        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")

        }
    } else if (e.target.parentElement.hasAttribute("class") && e.target.parentElement.classList.contains('selectSelf')) {
        tempEle = e.target.parentElement


        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")
        }

    } else if (e.target.parentElement.parentElement.hasAttribute("class") && e.target.parentElement.parentElement.classList.contains('selectSelf')) {
        tempEle = e.target.parentElement.parentElement


        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")
        }
    }

    // selectself for static
    if (e.target.hasAttribute("class") && e.target.classList.contains('selectSelfStatic')) {
        tempEle = e.target

        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
            tempEle.setAttribute('data-self-select', "true")

        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")

        }
    } else if (e.target.parentElement.hasAttribute("class") && e.target.parentElement.classList.contains('selectSelfStatic')) {
        tempEle = e.target.parentElement


        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
            tempEle.setAttribute('data-self-select', "true")

        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")
        }

    } else if (e.target.parentElement.parentElement.hasAttribute("class") && e.target.parentElement.parentElement.classList.contains('selectSelfStatic')) {
        tempEle = e.target.parentElement.parentElement


        if (tempEle.hasAttribute('data-self-select')) {
            tempEle.removeAttribute('data-self-select')
            tempEle.setAttribute('data-self-select', "true")

        } else {
            removeAttributeFromChildren(tempEle.parentElement.children, 'data-self-select')
            tempEle.setAttribute('data-self-select', "true")
        }
    }

    // get items with data-change as an attribute, parent's or grand's
    if (e.target.hasAttribute('data-change')) {
        tempEle = e.target
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            findChange(tempEle, funcEle)
        }
    } else if (e.target.parentElement.hasAttribute('data-change')) {
        tempEle = e.target.parentElement
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            findChange(tempEle, funcEle)
        }


    } else if (e.target.parentElement.parentElement.hasAttribute('data-change')) {
        tempEle = e.target.parentElement.parentElement
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            findChange(tempEle, funcEle)
        }


    }


})

function findChange(changefor, subFCN) {
    switch (changefor.getAttribute('data-change')) {
        case 'trend':
            var output = findChild(changefor.children, 'out')
            if (subFCN.getAttribute('data-function') == 'increment') {
                output.setAttribute('data-value-self', Number(output.getAttribute('data-value-self')) + Number(1))
                output.innerText = output.getAttribute('data-value-self')
            } else if (subFCN.getAttribute('data-function') == 'decrement') {
                if (output.getAttribute('data-value-self') == 0) {
                    output.setAttribute('data-value-self', 0)
                } else {
                    output.setAttribute('data-value-self', Number(output.getAttribute('data-value-self')) - Number(1))

                }
                output.innerText = output.getAttribute('data-value-self')
            }
            break
        default:
            console.log(0);
            break
    }
}

function removeAttributeFromChildren(objLst, attrName) {
    for (const key in objLst) {
        if (Object.hasOwnProperty.call(objLst, key)) {
            const children = objLst[key];
            if (children.hasAttribute(attrName)) {
                children.removeAttribute(attrName)
            }
        }
    }
}

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