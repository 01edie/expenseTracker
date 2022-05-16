'use strict';

// Elements
const currentBalance = document.getElementById('current-balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
// const addTransactionButton = document.getElementById('submit-btn');
const list = document.getElementById('history-list');
const form = document.querySelector('form');
const transactionInput = document.getElementById('transaction');
const amountInput = document.getElementById('amount');


// functions
const showCloseButton = (e) =>{
  if(e.target.firstElementChild){
    e.target.firstElementChild.style.visibility='visible';
  }
}
const hideCloseButton = (e) =>{
  e.target.firstElementChild.style.visibility='hidden';
}

// const transactionsArray = [
//   {id:1, transaction: 'books', amount:-100},
//   {id:2, transaction: 'salary', amount:5000},
//   {id:3, transaction: 'coffee', amount:-20}
// ]
// checking previous data
const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction to DOM list
const addTransactionDom = (transaction) => {
  //get sign
  const sign = transaction.amount>0 ? '+' : '-';
  const item =document.createElement('li');
  item.setAttribute('onmouseover','showCloseButton(event)');
  item.setAttribute('onmouseleave','hideCloseButton(event)')
  // add class name based on sign
  item.classList.add(transaction.amount>0?'plus':'minus');
  item.classList.add('history-list-item')
  item.innerHTML = `<button class="close-item" onclick="removeTransaction(${transaction.id})">X</button>
  <span class="val-1">${transaction.transaction}</span>
  <span class="val-2">${sign}${Math.abs(transaction.amount)}</span>`
  list.appendChild(item);
}

//init
function init(){
  list.innerHTML = '';
  transactions.forEach((item)=>{
    addTransactionDom(item);
  });
  updatedValues();
}
// Update the original values
const updatedValues = ()=>{
  const amounts = transactions.map((item)=>{
    return item.amount;
  })
  const plusTransaction = amounts.filter((item)=>item>0);
  console.log(plusTransaction);
  const minusTransaction = amounts.filter((item)=>item<0);

  const incomeValue = plusTransaction.reduce((acc,amount)=>acc + amount,0);
  const expenseValue = minusTransaction.reduce((acc,amount)=>acc + amount,0);

  income.innerHTML = '+' + incomeValue;
  expense.innerHTML = expenseValue;
  currentBalance.innerHTML= incomeValue + expenseValue;
}

// remove transaction 
const removeTransaction = function(id){
  transactions = transactions.filter((transaction) => transaction.id !== id);
  updateLocalStorage();
  init()
}

function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}
form.addEventListener('submit',(e)=>{
  e.preventDefault();
  if(transactionInput.value.trim() === '' || amountInput.value.trim() === ''){
    alert('please add transaction details!');
    
  }

  const transactionDetails = {
    id: Math.floor(Math.random()*10000),
    transaction: transactionInput.value,
    amount: Number(amountInput.value)
  }
  transactions.push(transactionDetails);
  addTransactionDom(transactionDetails);
  updateLocalStorage();
  updatedValues();
  transactionInput.value = '';
  amountInput.value = '';
})

// starting initial values
init();
