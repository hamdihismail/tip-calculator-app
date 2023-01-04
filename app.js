import FormValidator from "./JS/formValidator.js";

const customBtn = document.querySelector('.percent-btn-custom');
const resetBtn = document.querySelector('.reset-btn');
const overlay = document.querySelector('.custom-input');
const tip = [...document.querySelectorAll('.percent-btn')];
const bill = document.querySelector('.bill-price');
const numPeople = document.querySelector('.num-people');
const tipPerPerson = document.querySelector('.display-tip-amount');
const totalPerPerson = document.querySelector('.display-total-amount');


// // Reset Button
resetBtn.addEventListener('click', function (){
    localStorage.removeItem(tip);
    bill.value = 0;
    numPeople.value = 0;
    tipPerPerson.textContent = 0;
    totalPerPerson.textContent = 0;
    overlay.style.display = 'none';
    customBtn.style.display = 'block';

})

// Custom tip overlay
customBtn.addEventListener('mouseup', function (){
    localStorage.removeItem(tip)
    customBtn.style.display = 'none';
    overlay.style.display = 'block';
    console.log('click');
    overlay.addEventListener('input', function (){
        let value = overlay.value / 100
        value += 1
        localStorage.setItem(tip,value)
        calculate()
        // console.log(value);
    })
})

// Select tip %
tip.forEach(function (e) {
    e.addEventListener('click',function (e) {
        let amount = parseInt(e.target.dataset.id)/100;
        amount += 1
        localStorage.setItem(tip,amount.toString()) 
        calculate()
        console.log('click');
    })
})

// Calculate Total Per Person
function calcTotal (bill,tip,people){
    let total = Math.round(((bill * tip) * 100) / people) / 100;
        total = total.toFixed(2);
        console.log(`bill: ${bill}`,`people: ${people}`);
    return totalPerPerson.textContent = `$${total}`
}

// Calculate Total Tip Per Person
function calcTip (bill,tip,people) {
    let tipTotal = Math.round(((bill * (tip-1)) * 100) / people) / 100 ;
        tipTotal = tipTotal.toFixed(2)
        // console.log(typeof tip);
    return tipPerPerson.textContent = `$${tipTotal}`;
}


// Calculate function
function calculate () {
    if(bill.value > 0 & numPeople.value > 0 & localStorage.getItem(tip)){
        calcTotal(bill.value,localStorage.getItem(tip),numPeople.value);
        calcTip(bill.value,localStorage.getItem(tip),numPeople.value);
    }else if(!bill.value || bill.value === '0' || !numPeople.value || numPeople.value === '0'){
        console.log('please fill');
        checkBill()
        checkPeople()
        return
    }
}

// custom form validation bill
const fv = new FormValidator('.form-bill');

function checkBill (){

    fv.register('.bill-price', function (value, inputField){
        if (value <= 0 || value.length === 0){
            return {
                pass: false,
                error: 'Please enter bill amount.'
            };
        }
        return {
            pass: true
        };
    });
}
checkBill()
// custom form validation people
const pfv = new FormValidator('.form-people');

function checkPeople () {
    pfv.register('.num-people', function (value, inputField){
    if (value <= 0 || value.length === 0){
        return {
            pass: false,
            error: 'Please enter number of people.'
        };
    }
    return {
        pass: true
    };
});
}
checkPeople()


window.fv = fv;
window.pfv = pfv;