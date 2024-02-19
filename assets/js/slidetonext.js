// section or item scroll to next

const container = document.querySelector('.stages-details-cont');
const container2 = document.querySelector('.stages-details');
const sections = []
const sectionsDet = []
for (const key in document.querySelector('.stages').children) {
    if (Object.hasOwnProperty.call(document.querySelector('.stages').children, key)) {
        const element = document.querySelector('.stages').children[key];
        sections.push(element)
    }
}

for (const key in document.querySelector('.stages-details').children) {
    if (Object.hasOwnProperty.call(document.querySelector('.stages-details').children, key)) {
        const element = document.querySelector('.stages-details').children[key];
        sectionsDet.push(element)
    }
}



sections.forEach((section, index) => {
    section.addEventListener('click', ()=>{
        let locate = section.getAttribute('data-location')
        location.replace(`#${locate}`)
        for (const key in container2.children) {
            if (Object.hasOwnProperty.call(container2.children, key)) {
                const element = container2.children[key];
                element.style.display = "none"
            }
        }
        document.getElementById(`${locate}`).style.display = "block"
    })
})







