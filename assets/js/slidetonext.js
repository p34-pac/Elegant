// section or item scroll to next

const container = document.querySelector('.stages-details-cont');
const container2 = document.querySelector('[data-sections]');
const sections = []
const sectionsDet = []

document.querySelectorAll('[data-section-control]').forEach(i => {
    for (const key in i.children) {
        if (Object.hasOwnProperty.call(document.querySelector('[data-section-control]').children, key)) {
            const element = i.children[key];
            sections.push(element)
        }
    }
});

for (const key in document.querySelector('[data-sections]').children) {
    if (Object.hasOwnProperty.call(document.querySelector('[data-sections]').children, key)) {
        const element = document.querySelector('[data-sections]').children[key];
        sectionsDet.push(element)
    }
}



sections.forEach((section, index) => {
    section.addEventListener('click', ()=>{
        let locate = section.getAttribute('data-location')
        if(locate){
            location.replace(`#${locate}`)
            for (const key in container2.children) {
                if (Object.hasOwnProperty.call(container2.children, key)) {
                    const element = container2.children[key];
                    element.style.display = "none"
                }
            }
            try {
                document.getElementById(`${locate}`).style.display = "block"
            } catch (error) {
                
            }
        }

    })
})

document.addEventListener('DOMContentLoaded', ()=>{
    let url = location.href
    let splitDiff = url.split("#")
    let loc = splitDiff[splitDiff.length - 1]
    for (const key in container2.children) {
        if (Object.hasOwnProperty.call(container2.children, key)) {
            const element = container2.children[key];
            element.style.display = "none"
        }
    }

    let getLoc = splitDiff[0].split("/")
    
    getLoc.forEach(i => {
        switch (i.toLowerCase()) {
            case "cart":
                if(splitDiff.length <= 1){
                    document.getElementById(`shopping-cart`).style.display = "block"
                }else if(splitDiff.length > 1){
                    document.getElementById(`${loc}`).style.display = "block"
                }
                break;
            case "account":
                if(splitDiff.length <= 1){
                    document.getElementById(`account-details`).style.display = "block"
                }else if(splitDiff.length > 1){
                    document.getElementById(`${loc}`).style.display = "block"
                }
                break;
            default:
                break;
        }
    });


    sections.forEach((section, index) => {
        if(section.hasAttribute("data-location") && section.getAttribute("data-location") == loc){
            section.setAttribute("data-self-select", "true")
        }
    })
    

})



try {
    document.getElementById("country-search").addEventListener("input", (e)=>{
        let value = e.target.value
        let dropList = e.target.parentElement.parentElement
        let found = true
        let fnds = []
        for (const key in dropList.children) {
            if (Object.hasOwnProperty.call(dropList.children, key)) {
                const element = dropList.children[key];
    
                if(element.nodeName.toLowerCase() == "ul".toLowerCase()){
                    for (const key in element.children) {
                        if (Object.hasOwnProperty.call(element.children, key)) {
                            const elementals = element.children[key];
                            if(elementals.hasAttribute("data-value")){
                                let val = elementals.getAttribute("data-value")
                                if(val.includes(value)){
                                    fnds.push(elementals)
                                    elementals.style.display = "block"
                                }else{
                                    elementals.style.display = "none"
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    
        if(fnds.length < 1){
            found = false
        }else if(fnds.length > 1){
            found = true
    
        }
        if(!found){
            for (const key in dropList.children) {
                if (Object.hasOwnProperty.call(dropList.children, key)) {
                    const element = dropList.children[key];
                    for (const key in element.children) {
                        if (Object.hasOwnProperty.call(element.children, key)) {
                            const elemento = element.children[key];
                            if(elemento.classList.contains("not-found")){
                                elemento.innerHTML = `
                                <i class="ICN-cancel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="0 0 512 512">
    
                                    <g data-name="Layer 2" id="Layer_2">
    
                                        <g data-name="E410, Error, Media, media player, multimedia" id="E410_Error_Media_media_player_multimedia">
    
                                            <circle class="cls-1" cx="256" cy="256" r="246"/>
    
                                            <line class="cls-1" x1="371.47" x2="140.53" y1="140.53" y2="371.47"/>
    
                                            <line class="cls-1" x1="371.47" x2="140.53" y1="371.47" y2="140.53"/>
    
                                        </g>
    
                                    </g>
    
                                </svg>
                            </i>
                            <b>could not find '${value}'</b>
                                `
                                elemento.style.display = 'flex'
    
                            }
                        }
                    }
                }
            }
        }else if(found){
            for (const key in dropList.children) {
                if (Object.hasOwnProperty.call(dropList.children, key)) {
                    const element = dropList.children[key];
                    for (const key in element.children) {
                        if (Object.hasOwnProperty.call(element.children, key)) {
                            const elemento = element.children[key];
                            if(elemento.classList.contains("not-found")){
                                elemento.innerHTML = ``
                                elemento.style.display = 'none !important'
                            }
                        }
                    }
                }
            }
        }
    })
} catch (error) {
    
}



