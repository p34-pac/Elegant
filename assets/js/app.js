document.addEventListener("DOMContentLoaded", () => {
  let cartItems = localStorage.getItem("Cart-Items");

  if (cartItems == null || cartItems == undefined || cartItems == "") {
    localStorage.setItem("Cart-Items", JSON.stringify([]));
    document.querySelector('.cart-items').innerHTML = ''


  } else {

    
    showCart(0)
  }
});

function showCart(pItem){
    if(pItem !== 0){
        let defPrice = pItem.price
        let repeat = []
        let sm = 0, bm = 0
        JSON.parse(localStorage.getItem('Cart-Items')).forEach(carm => {
            if(carm.name == pItem.name){
                repeat.push(carm)
                if(carm.id >= sm && bm == sm){
                    sm = carm.id
                    bm = 1
                }
                pItem.id = sm
                pItem.amount = repeat.length
                pItem.price = defPrice * pItem.amount
            }
        });
        let filtered = JSON.parse(localStorage.getItem('Cart-Items')).filter(item => item.name != pItem.name)
        console.log(sm)
        filtered.push(pItem)

        let sortedArray = filtered.sort((a, b) => {
            
            if(a.id < b.id){
                return -1
            }else if(a.id > b.id){
                return 1
            }

            return 0
        })

        
        localStorage.setItem('Cart-Items', JSON.stringify(sortedArray))

    }
    let da = JSON.parse(localStorage.getItem('Cart-Items'))
    document.querySelector('.cart-items').innerHTML = ''
    document.querySelectorAll('.cart').forEach(chi => {
        for (const key in chi.children) {
            if (Object.hasOwnProperty.call(chi.children, key)) {
                const chichi = chi.children[key];
                if(chichi.id == 'cart-item-count'){
                    if(da.length == null || da.length == undefined){
                        chichi.innerHTML = 0
                    }else{
                        chichi.innerHTML = da.length
                    }
                }
            }
        }
       
    })
    da.forEach(das => {
        document.querySelector('.cart-items').innerHTML += `
        <div class="cart-item">
    <div class="cart-item-image"><img src="./assets/images/greytraytable.png" alt="${das.name}"></div>
    <div class="cart-item-content">
        <b class="name">${das.name}</b>
        <b class="type">Color: ${das.selectedColor.name}</b>

        <div class="amount" data-change="trend" data-trend-name="${das.name}">
            <i class="minus" data-function="decrement">-</i>
            <b class="out out-Tray_Table" data-value-self="${das.amount}">${das.amount}</b>
            <i class="plus" data-function="increment" >+</i>
        </div>
    </div>
    <div class="cart-item-control-view">
        <b class="price">$${das.price}</b>
        <span class="clear-item" data-function="clear-frm-cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4419 5.44194C15.686 5.19786 15.686 4.80214 15.4419 4.55806C15.1979 4.31398 14.8021 4.31398 14.5581 4.55806L10 9.11612L5.44194 4.55806C5.19786 4.31398 4.80214 4.31398 4.55806 4.55806C4.31398 4.80214 4.31398 5.19786 4.55806 5.44194L9.11612 10L4.55806 14.5581C4.31398 14.8021 4.31398 15.1979 4.55806 15.4419C4.80214 15.686 5.19786 15.686 5.44194 15.4419L10 10.8839L14.5581 15.4419C14.8021 15.686 15.1979 15.686 15.4419 15.4419C15.686 15.1979 15.686 14.8021 15.4419 14.5581L10.8839 10L15.4419 5.44194Z" fill="#343839"/>
            </svg> 
        </span>
    </div>
</div>
        `
        document.querySelector('[data-cart-subtots="true"]').innerHTML =  `$${das.price - ((das.price* (-(10)/100)))}`
        document.querySelector('[data-cart-tots="true"]').innerHTML =  `$${das.price}`
        
    });
    
    
}

document.querySelector("[data-checkout='true']").addEventListener('click', (e)=>{
    if(confirm('do you want to proceed with checkout')){
        alert('products are on their way')
        localStorage.setItem("Cart-Items", JSON.stringify([]));
        showCart(0)
    }
})

function showWhetherCart(pItem) {
    
    let positioned = ''
    JSON.parse(localStorage.getItem("Cart-Items")).forEach(item => {

        if(pItem.name == item.name){
            pItem.inCart = true
            pItem.amount = item.amount
            
        }else if(pItem.name != item.name){
            if(pItem.inCart == null || pItem.inCart == undefined){
                pItem.inCart = false
            }

        }
        
        if(pItem.inCart){
            positioned =  `<div class="amount" data-change="trend" data-trend-name="${pItem.name}"><i class="minus" data-function="decrement">-</i><b class="out out-Tray_Table" data-value-self="${pItem.amount}">${pItem.amount}</b><i class="plus" data-function="increment" >+</i></div>`
        }else{
            positioned =  '<button data-AddCart="true">Add to cart</button>'
    
        }

    })
    
    
    return positioned
    
}
switch (document.URL.split("/")[3]) {
  case "":
    fetch(`${document.URL.split("/")[0]}//${document.URL.split("/")[2]}/assets/data/products.json`)
      .then((res) => res.json())
      .then((data) => {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const pItem = data[key];
            
            document.querySelector(".product-card-list").innerHTML += `
                    <div class="product-card" data-item="${pItem.name}">
                    <div class="card-elements">
                        <div class="badges">
                            ${pItem.isNew ? '<span class="timing">NEW</span>' : ''}
                            <span class="discount">${pItem.discountPercentage}</span>
                        </div>
                        <div class="wishList">
                            <span>
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.577 3.76422C10.2546 4.07365 9.74545 4.07365 9.42301 3.76422L8.84601 3.2105C8.17065 2.56239 7.25829 2.16667 6.25001 2.16667C4.17894 2.16667 2.50001 3.8456 2.50001 5.91667C2.50001 7.90219 3.57483 9.54171 5.12647 10.8888C6.67944 12.237 8.53618 13.1312 9.64555 13.5876C9.87751 13.683 10.1225 13.683 10.3545 13.5876C11.4638 13.1312 13.3206 12.237 14.8735 10.8888C16.4252 9.54171 17.5 7.90218 17.5 5.91667C17.5 3.8456 15.8211 2.16667 13.75 2.16667C12.7417 2.16667 11.8294 2.56239 11.154 3.2105L10.577 3.76422ZM10 2.00798C9.02676 1.074 7.70542 0.5 6.25001 0.5C3.25847 0.5 0.833344 2.92512 0.833344 5.91667C0.833344 11.2235 6.64196 14.1542 9.0115 15.1289C9.64965 15.3914 10.3504 15.3914 10.9885 15.1289C13.3581 14.1542 19.1667 11.2235 19.1667 5.91667C19.1667 2.92512 16.7416 0.5 13.75 0.5C12.2946 0.5 10.9733 1.074 10 2.00798Z" fill="#6C7275"/>
                                </svg>                                
                            </span>
                        </div>
                        <div class="img-bg-box">
                            <img src="./assets/images/cardimage.png" alt="default card image">
                        </div>
                        
                        <div class="showWhetherCart">
                            ${showWhetherCart(pItem)}
                        </div>
                        
                        
    
                    </div>
                    <div class="card-content">
                        <div class="rating">
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                        </div>
                        <h3 class="product-name">${pItem.name}</h3>
                        <span class="product-pricing">
                            <b class="pres-price">${pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))}</b>
                            <b class="prev-price">${pItem.prevPrice}</b>
                        </span>
                    </div>
                </div>
                    `;
                
            if(pItem.bestSelling){
                document.querySelector(".best-seller-cont").innerHTML += `
                    <div class="product-card" data-item="${pItem.name}">
                    <div class="card-elements">
                        <div class="badges">
                            ${pItem.isNew ? '<span class="timing">NEW</span>' : ''}
                            <span class="discount">${pItem.discountPercentage}</span>
                        </div>
                        <div class="wishList">
                            <span>
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.577 3.76422C10.2546 4.07365 9.74545 4.07365 9.42301 3.76422L8.84601 3.2105C8.17065 2.56239 7.25829 2.16667 6.25001 2.16667C4.17894 2.16667 2.50001 3.8456 2.50001 5.91667C2.50001 7.90219 3.57483 9.54171 5.12647 10.8888C6.67944 12.237 8.53618 13.1312 9.64555 13.5876C9.87751 13.683 10.1225 13.683 10.3545 13.5876C11.4638 13.1312 13.3206 12.237 14.8735 10.8888C16.4252 9.54171 17.5 7.90218 17.5 5.91667C17.5 3.8456 15.8211 2.16667 13.75 2.16667C12.7417 2.16667 11.8294 2.56239 11.154 3.2105L10.577 3.76422ZM10 2.00798C9.02676 1.074 7.70542 0.5 6.25001 0.5C3.25847 0.5 0.833344 2.92512 0.833344 5.91667C0.833344 11.2235 6.64196 14.1542 9.0115 15.1289C9.64965 15.3914 10.3504 15.3914 10.9885 15.1289C13.3581 14.1542 19.1667 11.2235 19.1667 5.91667C19.1667 2.92512 16.7416 0.5 13.75 0.5C12.2946 0.5 10.9733 1.074 10 2.00798Z" fill="#6C7275"/>
                                </svg>                                
                            </span>
                        </div>
                        <div class="img-bg-box">
                            <img src="./assets/images/cardimage.png" alt="default card image">
                        </div>
                        <div class="showWhetherCart">
                            ${showWhetherCart(pItem)}
                        </div>    
                    </div>
                    <div class="card-content">
                        <div class="rating">
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                        </div>
                        <h3 class="product-name">${pItem.name}</h3>
                        <span class="product-pricing">
                            <b class="pres-price">${pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))}</b>
                            <b class="prev-price">${pItem.prevPrice}</b>
                        </span>
                    </div>
                </div>
                    `;
            }
          }
        }
      });
    break;
  case "shop":
    console.log("shop");
    break;
  case "product":
    console.log("product");
    break;

  default:
    break;
}
switch (document.URL.split("/")[4]) {
  case "":
    console.log(`${document.URL.split("/")[0]}//${document.URL.split("/")[2]}/Elegant/assets/data/products.json`);
    fetch(`${document.URL.split("/")[0]}//${document.URL.split("/")[2]}/Elegant/assets/data/products.json`)
      .then((res) => res.json())
      .then((data) => {
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const pItem = data[key];
            
            document.querySelector(".product-card-list").innerHTML += `
                    <div class="product-card" data-item="${pItem.name}">
                    <div class="card-elements">
                        <div class="badges">
                            ${pItem.isNew ? '<span class="timing">NEW</span>' : ''}
                            <span class="discount">${pItem.discountPercentage}</span>
                        </div>
                        <div class="wishList">
                            <span>
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.577 3.76422C10.2546 4.07365 9.74545 4.07365 9.42301 3.76422L8.84601 3.2105C8.17065 2.56239 7.25829 2.16667 6.25001 2.16667C4.17894 2.16667 2.50001 3.8456 2.50001 5.91667C2.50001 7.90219 3.57483 9.54171 5.12647 10.8888C6.67944 12.237 8.53618 13.1312 9.64555 13.5876C9.87751 13.683 10.1225 13.683 10.3545 13.5876C11.4638 13.1312 13.3206 12.237 14.8735 10.8888C16.4252 9.54171 17.5 7.90218 17.5 5.91667C17.5 3.8456 15.8211 2.16667 13.75 2.16667C12.7417 2.16667 11.8294 2.56239 11.154 3.2105L10.577 3.76422ZM10 2.00798C9.02676 1.074 7.70542 0.5 6.25001 0.5C3.25847 0.5 0.833344 2.92512 0.833344 5.91667C0.833344 11.2235 6.64196 14.1542 9.0115 15.1289C9.64965 15.3914 10.3504 15.3914 10.9885 15.1289C13.3581 14.1542 19.1667 11.2235 19.1667 5.91667C19.1667 2.92512 16.7416 0.5 13.75 0.5C12.2946 0.5 10.9733 1.074 10 2.00798Z" fill="#6C7275"/>
                                </svg>                                
                            </span>
                        </div>
                        <div class="img-bg-box">
                            <img src="./assets/images/cardimage.png" alt="default card image">
                        </div>
                        
                        <div class="showWhetherCart">
                            ${showWhetherCart(pItem)}
                        </div>
                        
                        
    
                    </div>
                    <div class="card-content">
                        <div class="rating">
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                        </div>
                        <h3 class="product-name">${pItem.name}</h3>
                        <span class="product-pricing">
                            <b class="pres-price">${pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))}</b>
                            <b class="prev-price">${pItem.prevPrice}</b>
                        </span>
                    </div>
                </div>
                    `;
                
            if(pItem.bestSelling){
                document.querySelector(".best-seller-cont").innerHTML += `
                    <div class="product-card" data-item="${pItem.name}">
                    <div class="card-elements">
                        <div class="badges">
                            ${pItem.isNew ? '<span class="timing">NEW</span>' : ''}
                            <span class="discount">${pItem.discountPercentage}</span>
                        </div>
                        <div class="wishList">
                            <span>
                                <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.577 3.76422C10.2546 4.07365 9.74545 4.07365 9.42301 3.76422L8.84601 3.2105C8.17065 2.56239 7.25829 2.16667 6.25001 2.16667C4.17894 2.16667 2.50001 3.8456 2.50001 5.91667C2.50001 7.90219 3.57483 9.54171 5.12647 10.8888C6.67944 12.237 8.53618 13.1312 9.64555 13.5876C9.87751 13.683 10.1225 13.683 10.3545 13.5876C11.4638 13.1312 13.3206 12.237 14.8735 10.8888C16.4252 9.54171 17.5 7.90218 17.5 5.91667C17.5 3.8456 15.8211 2.16667 13.75 2.16667C12.7417 2.16667 11.8294 2.56239 11.154 3.2105L10.577 3.76422ZM10 2.00798C9.02676 1.074 7.70542 0.5 6.25001 0.5C3.25847 0.5 0.833344 2.92512 0.833344 5.91667C0.833344 11.2235 6.64196 14.1542 9.0115 15.1289C9.64965 15.3914 10.3504 15.3914 10.9885 15.1289C13.3581 14.1542 19.1667 11.2235 19.1667 5.91667C19.1667 2.92512 16.7416 0.5 13.75 0.5C12.2946 0.5 10.9733 1.074 10 2.00798Z" fill="#6C7275"/>
                                </svg>                                
                            </span>
                        </div>
                        <div class="img-bg-box">
                            <img src="./assets/images/cardimage.png" alt="default card image">
                        </div>
                        <div class="showWhetherCart">
                            ${showWhetherCart(pItem)}
                        </div>    
                    </div>
                    <div class="card-content">
                        <div class="rating">
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                            <span class="star">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.53834 1.10997C6.70914 0.699319 7.29086 0.699318 7.46166 1.10996L8.99874 4.80556C9.07075 4.97868 9.23355 5.09696 9.42045 5.11194L13.4102 5.4318C13.8535 5.46734 14.0332 6.02059 13.6955 6.30993L10.6557 8.91378C10.5133 9.03576 10.4512 9.22715 10.4947 9.40952L11.4234 13.3028C11.5265 13.7354 11.0559 14.0773 10.6764 13.8455L7.26063 11.7592C7.10062 11.6615 6.89938 11.6615 6.73937 11.7592L3.32363 13.8455C2.94408 14.0773 2.47345 13.7354 2.57665 13.3028L3.50534 9.40952C3.54884 9.22715 3.48665 9.03576 3.34426 8.91378L0.304527 6.30993C-0.0332418 6.02059 0.14652 5.46734 0.589847 5.4318L4.57955 5.11194C4.76645 5.09696 4.92925 4.97868 5.00126 4.80556L6.53834 1.10997Z" fill="#343839"/>
                                </svg>                                
                            </span>
                        </div>
                        <h3 class="product-name">${pItem.name}</h3>
                        <span class="product-pricing">
                            <b class="pres-price">${pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))}</b>
                            <b class="prev-price">${pItem.prevPrice}</b>
                        </span>
                    </div>
                </div>
                    `;
            }
          }
        }
      });
    break;
  case "shop":
    console.log("shop");
    break;
  case "product":
    console.log("product");
    break;

  default:
    break;
}


document.body.addEventListener('click', (e=>{
    if(e.target.getAttribute('data-AddCart')){
        if(e.target.parentElement.parentElement.hasAttribute('data-item')){
            let name = e.target.parentElement.parentElement.getAttribute('data-item')
           addToCart(name)
        }else if(e.target.parentElement.parentElement.parentElement.hasAttribute('data-item')){
            let name = e.target.parentElement.parentElement.parentElement.getAttribute('data-item')
            addToCart(name)

        }
    }
    // check for increase in cart
    let funcEle = ''
    let tempEle = ''
    if (e.target.hasAttribute('data-change')) {
        tempEle = e.target
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            let funcEleFunc = funcEle.getAttribute('data-function')
            if (funcEleFunc == 'increment') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                increaseCartAmount(parentItemName)               
            }else if (funcEleFunc == 'decrement') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                decreaseCartAmount(parentItemName)               
            }
        }
    } else if (e.target.parentElement.hasAttribute('data-change')) {
        tempEle = e.target.parentElement
        
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            let funcEleFunc = funcEle.getAttribute('data-function')
            
            if (funcEleFunc == 'increment') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                increaseCartAmount(parentItemName)               
            }else if (funcEleFunc == 'decrement') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                decreaseCartAmount(parentItemName)               
            }
        }


    } else if (e.target.parentElement.parentElement.hasAttribute('data-change')) {
        tempEle = e.target.parentElement.parentElement
        if (e.target.hasAttribute('data-function')) {
            funcEle = e.target
            let funcEleFunc = funcEle.getAttribute('data-function')
            if (funcEleFunc == 'increment') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                increaseCartAmount(parentItemName)               
            }else if (funcEleFunc == 'decrement') {
                let parentItemName = tempEle.getAttribute('data-trend-name')
                decreaseCartAmount(parentItemName)               
            }

        }


    }

}))

function increaseCartAmount(parentItemName) {
    let cartItems = JSON.parse(localStorage.getItem("Cart-Items"))

    cartItems.forEach(cartItem => {

        if(cartItem.name == parentItemName){
            cartItem.amount += 1
        }
    });

    localStorage.setItem('Cart-Items', JSON.stringify(cartItems))

}
function decreaseCartAmount(parentItemName) {
    let cartItems = JSON.parse(localStorage.getItem("Cart-Items"))


    cartItems.forEach(cartItem => {

        if(cartItem.name == parentItemName){
            cartItem.amount -= 1
        }
    });
    localStorage.setItem('Cart-Items', JSON.stringify(cartItems))

}

function addToCart(name){
    if(document.URL.split("/")[3] != 'Elegant'){
        fetch(`${document.URL.split("/")[0]}//${document.URL.split("/")[2]}/assets/data/products.json`)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const pItem = data[key];
                        if(pItem.name == name){
                            let da = JSON.parse(localStorage.getItem('Cart-Items'))
                            pItem.price = pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))
                            pItem.amount = 1
                            pItem.id = da.length
                            da.push(pItem)
                            localStorage.setItem('Cart-Items', JSON.stringify(da))
                            showCart(pItem)
                            
                        }
                    }
                }
            })
    }else{
        fetch(`${document.URL.split("/")[0]}//${document.URL.split("/")[2]}/Elegant/assets/data/products.json`)
            .then((res) => res.json())
            .then((data) => {
                for (const key in data) {
                    if (Object.hasOwnProperty.call(data, key)) {
                        const pItem = data[key];
                        if(pItem.name == name){
                            let da = JSON.parse(localStorage.getItem('Cart-Items'))
                            pItem.price = pItem.prevPrice - ((pItem.prevPrice* (-(pItem.discountPercentage)/100)))
                            pItem.amount = 1
                            pItem.id = da.length
                            da.push(pItem)
                            localStorage.setItem('Cart-Items', JSON.stringify(da))
                            showCart(pItem)
                            
                        }
                    }
                }
            })
    }
}