document.getElementById('next').addEventListener('click', showNext)
document.getElementById('prev').addEventListener('click', showPrev)
let contentBox = document.querySelector('.contentBox');
let pres;
let time = 0;
showPres(0)

function remPres(){
    for (const key in document.querySelector('.itemLoc').children) {
        if (Object.hasOwnProperty.call(document.querySelector('.itemLoc').children, key)) {
            const it = document.querySelector('.itemLoc').children[key];
                it.classList.remove('present')
        }
    } 
}

function addPres(itemid){
    for (const key in document.querySelector('.itemLoc').children) {
        if (Object.hasOwnProperty.call(document.querySelector('.itemLoc').children, key)) {
            const it = document.querySelector('.itemLoc').children[key];
            if(it.getAttribute('itemref') == itemid){
                it.classList.toggle('present')
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', async ()=>{
    remPres()
    await fetch('./assets/data/db.json')
    .then(data =>  data.json())
    .then(items => {
        {
            items.forEach(item => {
                document.querySelector('.itemLoc').innerHTML += `<span itemref=${item.id}></span>`
                if(item.id == contentBox.getAttribute('itemid')){
                    addPres(item.id)
                    for (const key in contentBox.children) {
                        if (Object.hasOwnProperty.call(contentBox.children, key)) {
                            const child = contentBox.children[key];
                            addPres(item.id)
                            if(child.nodeName == 'IMG'){
                                child.src = `${item.src}`
                            }
                            
                        }
                    }
                    
                }
            })
        }
    })
    .catch(err => console.log(err))

    document.querySelector('.itemLoc').addEventListener('click', (e)=>{
        let id = e.target.getAttribute('itemref')
        showPres(id)
    })
})

async function getPres(id){
    let next;
    await fetch('./assets/data/db.json')
    .then(data =>  data.json())
    .then(items => {
        {
            next = items[id];
    }
    })
    .catch(err => console.log(err))

    return next
}

// function remimg(contentBox, item){
//     for (const key in contentBox.children) {
//         if (Object.hasOwnProperty.call(contentBox.children, key)) {
//             const child = contentBox.children[key];
//             addPres(item.id)
//             if(child.nodeName == 'IMG' && child.classList.contains('imgPrev')){
//                 // child.src = `${item.src}`
//                 child.remove()
//             }
            
//         }
//     }
// }
function addimg(contentBox, item, classname){
    for (const key in contentBox.children) {
        if (Object.hasOwnProperty.call(contentBox.children, key)) {
            const child = contentBox.children[key];
            if(child.classList.contains('content')){
                child.className = 'content imgPrev'
            }
            
        }
    }
    addPres(item.id)
    contentBox.innerHTML += `
    <div class="content ${classname}" itemid="${item.id}">
                <div class="imgBox" >
                    <img src="${item.src}" alt="">
                </div>
                <div class="description">
                    <span>${item.desc}</span>
                </div>
                
            </div>
    `
    
   
    
}

async function showPres(id){
    time = 0
    remPres()
    let presItem = getPres(id)
    let item;
    await presItem.then(itemObj => {
        {
            item = itemObj
        }
    })

    if(contentBox.getAttribute('itemid') <= item.id){
        contentBox.removeAttribute('itemid')
    contentBox.setAttribute('itemid',`${item.id}`)
    addimg(contentBox, item, 'imgPres')
    setTimeout(() => {
        for (const key in contentBox.children) {
    if (Object.hasOwnProperty.call(contentBox.children, key)) {
        const child = contentBox.children[key];
        if(child.classList.contains == 'content' && child.classList.contains('imgPrev')){
            child.remove()
        }
        
    }
}
}, 2000);
    }else if(contentBox.getAttribute('itemid') >= item.id){
        contentBox.removeAttribute('itemid')
        contentBox.setAttribute('itemid',`${item.id}`)
        addimg(contentBox, item, 'showPrev')
        setTimeout(() => {
            for (const key in contentBox.children) {
                if (Object.hasOwnProperty.call(contentBox.children, key)) {
                    const child = contentBox.children[key];
                    if(child.classList.contains == 'content' && child.classList.contains('imgPrev')){
                        child.remove()
                    }
                    
                }
            }
    }, 2000);
    }    
}


async function getNext(){
    
    let id = Number(contentBox.getAttribute('itemid'));
    let next;
    await fetch('./assets/data/db.json')
    .then(data =>  data.json())
    .then(items => {
        {
            items.forEach(item => {
                if(item.id == (id) && id < items.length - 1){
                    next = items[id + 1];
                }else if(id >= items.length - 1){
                    next = items[id - (items.length -1)];
                }
            
        });
    }
    })
    .catch(err => console.log(err))

    return next
}

async function showNext(){
    time = 0;
    remPres()
    let nextItem = getNext()
    let item;
    await nextItem.then(itemObj => {
        {
            item = itemObj
        }
    })


    contentBox.removeAttribute('itemid')
    contentBox.setAttribute('itemid',`${item.id}`)

    addimg(contentBox, item, 'imgPres')
    setTimeout(() => {
            for (const key in contentBox.children) {
        if (Object.hasOwnProperty.call(contentBox.children, key)) {
            const child = contentBox.children[key];
            if(child.classList.contains('imgPrev')){
                child.remove()
            }
            
        }
    }
    }, 2000);
    
}

async function getPrev(){
    let id = Number(contentBox.getAttribute('itemid'));
    let prev;
    await fetch('./assets/data/db.json')
    .then(data =>  data.json())
    .then(items => {
        {
            items.forEach(item => {
                if(item.id == (id) && id > 0){
                    prev = items[id - 1];
                }else if(id == 0){
                    prev = items[id + (items.length -1)];
                }
            
        });
    }
    })
    .catch(err => console.log(err))

    return prev
}
async function showPrev(){
    time = 0;
    remPres()
    let nextItem = getPrev()
    let item;
    await nextItem.then(itemObj => {
        {
            item = itemObj
        }
    })
    contentBox.removeAttribute('itemid')
    contentBox.setAttribute('itemid',`${item.id}`)

   
    addimg(contentBox, item, 'showPrev')
    setTimeout(() => {
            for (const key in contentBox.children) {
        if (Object.hasOwnProperty.call(contentBox.children, key)) {
            const child = contentBox.children[key];
            if(child.nodeName == 'IMG' && child.classList.contains('imgPrev')){
                child.remove()
            }
            
        }
    }
    }, 2000); 
}
setInterval(() => {
    if(time <= 4){
        time++
    }else{
        time = 0
    }
}, 1000);

setInterval(() => {
    if(time == 5){
        showNext()
    }
}, 1000);






