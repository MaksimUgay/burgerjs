let menu = {
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: 'images/products/burger-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: 'images/products/burger-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    cheeseburger: {
        name: 'CheeseBurger',
        price: 29000,
        img: 'images/products/burger-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: 'images/products/burger-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount;
        }
    },
};

let burgerBtn = document.querySelectorAll('.wrapper__list-btn'),
    cartBtn = document.querySelector('.wrapper__navbar-btn'),
    cartCount = document.querySelector('.wrapper__navbar-count'),
    cartClose = document.querySelector('.wrapper__navbar-close'),
    cartBasket = document.querySelector('.wrapper__navbar-basket'),
    cartCheckList = document.querySelector('.wrapper__navbar-checklist'),
    cartTotalPrice = document.querySelector('.wrapper__navbar-totalprice');
    
burgerBtn.forEach((btn) => {
    btn.addEventListener('click', function () {
        addAmount(this); 
    });
});

function addAmount(btn) {
    // closest() - метод который позволяет подключаться к указанному ближайшему родителю
    let parent = btn.closest('.wrapper__list-card');
    let id = parent.getAttribute('id');
    menu[id].amount++;
    cart();
}

cartBtn.addEventListener('click', () => cartBasket.classList.add('active') );

cartClose.addEventListener('click', () =>  cartBasket.classList.remove('active') );

function cart() {
    let korzina = [];
    for (let key in menu) {
        let burger = menu[key];
        let productBurger = document.querySelector(`#${key}`);
        let amountBurger = productBurger.querySelector('.wrapper__list-count');
        if(burger.amount > 0) {
            korzina.push(burger);
            amountBurger.classList.add('active');
            amountBurger.innerHTML = burger.amount;
        } else {
            amountBurger.classList.remove('active');
            amountBurger.innerHTML = '';
        }
    }
    
    let allCount = totalBurgers();
    if(allCount > 0) {
        cartCount.classList.add('active');
        cartCount.innerHTML = allCount;
    } else {
        cartCount.classList.remove('active');
    }
    
    cartTotalPrice.innerHTML = totalBurgersPrice();
    
    cartCheckList.innerHTML = '';
    
    korzina.forEach((burger) => {
        cartCheckList.innerHTML += createBurger(burger);
    });
}

function totalBurgers() {
    let sum = 0;
    for(let key in menu) {
        sum += menu[key].amount;
    }
    
    return sum;
}

function totalBurgersPrice() {
    let sum = 0;
    for(let key in menu) {
        sum += menu[key].totalSum;
    }
    return sum + ' сум';
}

function createBurger({name,price,img,amount}) {
    
    return `<div class="burger__item" id="${name.toLowerCase()}-burger">
    <div class="burger__item-left">
        <img src="${img}" alt="">
        <div class="burger__item-left-info">
            <h2>${name}</h2>
            <p>${price}</p>
        </div>
    </div>
    <div class="burger__item-right">
        <button data-symbol="-" class="btn">-</button>
        <output class="burger__item-output">${amount}</output>
        <button data-symbol="+" class="btn">+</button>
    </div>
</div>`;
}

window.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn')) {
        let buttonSymbol = event.target.getAttribute('data-symbol');
        let parentBurger = event.target.closest('.burger__item');
        let id = parentBurger.getAttribute('id').split('-')[0];
        if (buttonSymbol == '+') {
            menu[id].amount++;
        } else if (buttonSymbol == '-') {
            menu[id].amount--;
        }
        cart();
    }
});

let titleCount = document.querySelector('.title');
let body = document.querySelector('body');
let nav = document.querySelector('.wrapper__nav');

function titleAdd() {
    titleCount.innerHTML++;
    let rek = setTimeout(() => titleAdd(),40);
    if(titleCount.innerHTML == 100) {
        clearTimeout(rek);
        titleCount.innerHTML = `${titleCount.innerHTML} lvl`;
        titleCount.style.color = '#529c7b';
        titleCount.style.fontSize = '100px';
        body.style.background = '#c0d3d6';
        nav.style.background = '#a7342e';
    } else if (titleCount.innerHTML < 100) {
        setColor(titleCount);
    }
}

let colors = ['red', 'green','blue','yellow','orange', 'black', 'gray'];

function randomColor() {
    let index = Math.floor(Math.random() * colors.length);
    return colors[index]; 
}

function setColor(el) {
    el.style.color = randomColor();
}

titleAdd();

console.log(titleCount.style);
