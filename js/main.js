let incomes = [];
let expenses = [];

function addIncome() {
  const incomeNameInput = document.getElementById("incomeNameInput");
  const incomeInput = document.getElementById("incomeInput");
  const name = incomeNameInput.value.trim();
  const amount = parseFloat(incomeInput.value);
  if (!isNaN(amount) && name) {
    incomes.push({ name, amount });
    updateUI();
    incomeNameInput.value = "";
    incomeInput.value = "";
  }
}

function addExpense() {
  const expenseNameInput = document.getElementById("expenseNameInput");
  const expenseInput = document.getElementById("expenseInput");
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseInput.value);
  if (!isNaN(amount) && name) {
    expenses.push({ name, amount });
    updateUI();
    expenseNameInput.value = "";
    expenseInput.value = "";
  }
}

function updateUI() {
  const incomeList = document.getElementById("incomeList");
  incomeList.innerHTML = "";
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  incomes.forEach((income, index) => {
    totalIncome += income.amount;
    const row = incomeList.insertRow();
    row.innerHTML = `
                    <td><input type="text" value="${income.name}" class="form-control" onchange="editIncomeName(${index}, this.value)"></td>
                    <td><input type="number" value="${income.amount}" class="form-control" onchange="editIncomeAmount(${index}, this.value)"></td>
                    <td class="vert-aligned">
                        <button onclick="deleteIncome(${index})" class="btn btn-sm btn-danger">Usuń</button>
                    </td>
                `;
  });

  expenses.forEach((expense, index) => {
    totalExpense += expense.amount;
    const row = expenseList.insertRow();
    row.innerHTML = `
                    <td><input type="text" value="${expense.name}" class="form-control" onchange="editExpenseName(${index}, this.value)"></td>
                    <td><input type="number" value="${expense.amount}" class="form-control" onchange="editExpenseAmount(${index}, this.value)"></td>
                    <td class="vert-aligned">
                        <button onclick="deleteExpense(${index})" class="btn btn-sm btn-danger">Usuń</button>
                    </td>
                `;
  });

  document.getElementById("totalIncome").textContent = totalIncome.toFixed(2);
  document.getElementById("totalExpense").textContent = totalExpense.toFixed(2);

  const balance = document.getElementById("balance");
  const totalBalance = totalIncome - totalExpense;
  if (totalBalance > 0) {
    balance.textContent = `Możesz jeszcze wydać ${totalBalance.toFixed(
      2
    )} złotych`;
    balance.classList.remove("text-danger");
    balance.classList.add("text-success");
  } else if (totalBalance === 0) {
    balance.textContent = `Bilans wynosi zero`;
    balance.classList.remove("text-danger", "text-success");
  } else {
    balance.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      totalBalance
    ).toFixed(2)} złotych`;
    balance.classList.remove("text-success");
    balance.classList.add("text-danger");
  }
}

function editIncomeName(index, newName) {
  incomes[index].name = newName.trim();
  updateUI();
}

function editIncomeAmount(index, newAmount) {
  incomes[index].amount = parseFloat(newAmount);
  updateUI();
}

function editExpenseName(index, newName) {
  expenses[index].name = newName.trim();
  updateUI();
}

function editExpenseAmount(index, newAmount) {
  expenses[index].amount = parseFloat(newAmount);
  updateUI();
}

function deleteIncome(index) {
  incomes.splice(index, 1);
  updateUI();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}
