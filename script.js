let budgetAmt = document.getElementById('budget-amount');
const setBgtBtn = document.getElementById('budget-button');
const bgtAmtContainer = document.getElementById('amount');
const bgtErr = document.getElementById('budget-error');
const expName = document.getElementById('expense-name');
let expenseAmt = document.getElementById('expense-amount');
const setExpBtn = document.getElementById('expense-button');
const expAmtContainer = document.getElementById('expense-value');
const expList = document.getElementById('list');
const balAmtContainer = document.getElementById('balance-amount');
const expErr = document.getElementById('expense-error');
let bgtVal = 0;
let expVal = 0;

const updateBal = function (bgt, exp) {
  balAmtContainer.innerHTML = bgt - exp;
};

// Add Budget
setBgtBtn.addEventListener('click', function () {
  bgtVal = budgetAmt.value;
  if (!bgtVal === Number || bgtVal === '' || bgtVal < 0) {
    bgtErr.classList.remove('hide');
  } else {
    bgtErr.classList.add('hide');
    bgtAmtContainer.innerHTML = bgtVal;
    updateBal(bgtVal, expAmtContainer.innerHTML);
    budgetAmt.value = '';
  }
});

// Add Expense
setExpBtn.addEventListener('click', function () {
  expVal = expenseAmt.value;

  if (expName.value === '' || expVal === '') {
    expErr.classList.remove('hide');
  } else {
    expErr.classList.add('hide');
    expAmtContainer.innerHTML =
      Number(expAmtContainer.innerHTML) + Number(expVal);
    updateBal(+bgtAmtContainer.innerHTML, +expAmtContainer.innerHTML);

    // Expense List
    const html = `
    <div class="sublist-content flex-space">
      <p class="product">${expName.value}</p>
      <p class="amount">${expVal}</p>
      <button 
        <i class ="fa-solid fa-pen-to-square edit"
        style="font-size: 1.2em"
        </i> 
      </button>
      <button
        <i class="fa-solid fa-trash-can delete"
        style="font-size: 1.2em"
        </i>
      </button>
    </div>
    `;
    document.getElementById('list').innerHTML += html;

    expName.value = '';
    expenseAmt.value = '';

    const all = document.querySelectorAll('.sublist-content');
    all.forEach(item => {
      const editNdelete = function () {
        balAmtContainer.innerHTML =
          +balAmtContainer.innerHTML + +listExp.innerHTML;
        expAmtContainer.innerHTML =
          +expAmtContainer.innerHTML - +listExp.innerHTML;
      };
      let listName = item.querySelector('.product');
      let listExp = item.querySelector('.amount');
      delBtn = item.querySelector('.delete');
      delBtn.addEventListener('click', function () {
        this.parentNode.remove();
        editNdelete();
      });
      editBtn = item.querySelector('.edit');
      editBtn.addEventListener('click', function () {
        expName.value = listName.innerHTML;
        expenseAmt.value = listExp.innerHTML;
        this.parentNode.remove();
        editNdelete();
      });
    });
  }
});
