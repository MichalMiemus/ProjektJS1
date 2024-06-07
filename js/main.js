const incomes = [];
const expenses = [];
let currentIncomeIndex = -1;
let currentExpenseIndex = -1;

document
  .getElementById("incomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addIncome();
  });

document
  .getElementById("expenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    addExpense();
  });

document
  .getElementById("editIncomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    saveIncomeChanges();
  });

document
  .getElementById("editExpenseForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    saveExpenseChanges();
  });

document.querySelectorAll(".close").forEach(function (element) {
  element.addEventListener("click", function () {
    closeModal(element.getAttribute("data-modal-id"));
  });
});

function addIncome() {
  const incomeNameInput = document.getElementById("incomeNameInput");
  const incomeInput = document.getElementById("incomeInput");
  const name = incomeNameInput.value.trim();
  const amount = parseFloat(incomeInput.value);
  const incomeError = document.getElementById("incomeError");

  if (
    !name ||
    isNaN(amount) ||
    amount <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(amount)
  ) {
    incomeError.textContent =
      "Proszę podać poprawną nazwę i kwotę przychodu (dodatnia liczba, maksymalnie 2 miejsca po przecinku).";
    return;
  }

  incomeError.textContent = "";
  incomes.push({ name, amount });
  updateUI();
  incomeNameInput.value = "";
  incomeInput.value = "";
}

function addExpense() {
  const expenseNameInput = document.getElementById("expenseNameInput");
  const expenseInput = document.getElementById("expenseInput");
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseInput.value);
  const expenseError = document.getElementById("expenseError");

  if (
    !name ||
    isNaN(amount) ||
    amount <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(amount)
  ) {
    expenseError.textContent =
      "Proszę podać poprawną nazwę i kwotę wydatku (dodatnia liczba, maksymalnie 2 miejsca po przecinku).";
    return;
  }

  expenseError.textContent = "";
  expenses.push({ name, amount });
  updateUI();
  expenseNameInput.value = "";
  expenseInput.value = "";
}

function updateUI() {
  const incomeList = document.getElementById("incomeList");
  const expenseList = document.getElementById("expenseList");
  incomeList.innerHTML = "";
  expenseList.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  incomes.forEach((income, index) => {
    totalIncome += income.amount;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${income.name}</td>
            <td>${income.amount.toFixed(2)}</td>
            <td class="vert-aligned">
                <button class="btn btn-sm btn-info edit-income" data-index="${index}">Edytuj</button>
                <button class="btn btn-sm btn-danger delete-income" data-index="${index}">Usuń</button>
            </td>
        `;
    incomeList.appendChild(row);
  });

  expenses.forEach((expense, index) => {
    totalExpense += expense.amount;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${expense.name}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td class="vert-aligned">
                <button class="btn btn-sm btn-info edit-expense" data-index="${index}">Edytuj</button>
                <button class="btn btn-sm btn-danger delete-expense" data-index="${index}">Usuń</button>
            </td>
        `;
    expenseList.appendChild(row);
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

  document.querySelectorAll(".edit-income").forEach(function (button) {
    button.addEventListener("click", function () {
      editIncome(button.getAttribute("data-index"));
    });
  });

  document.querySelectorAll(".delete-income").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteIncome(button.getAttribute("data-index"));
    });
  });

  document.querySelectorAll(".edit-expense").forEach(function (button) {
    button.addEventListener("click", function () {
      editExpense(button.getAttribute("data-index"));
    });
  });

  document.querySelectorAll(".delete-expense").forEach(function (button) {
    button.addEventListener("click", function () {
      deleteExpense(button.getAttribute("data-index"));
    });
  });
}

function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function editIncome(index) {
  currentIncomeIndex = index;
  const income = incomes[index];
  document.getElementById("editIncomeName").value = income.name;
  document.getElementById("editIncomeAmount").value = income.amount;
  document.getElementById("editIncomeError").textContent = "";
  openModal("editIncomeModal");
}

function saveIncomeChanges() {
  const newName = document.getElementById("editIncomeName").value.trim();
  const newAmount = parseFloat(
    document.getElementById("editIncomeAmount").value
  );
  const editIncomeError = document.getElementById("editIncomeError");

  if (
    !newName ||
    isNaN(newAmount) ||
    newAmount <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(newAmount)
  ) {
    editIncomeError.textContent =
      "Proszę podać poprawną nazwę i kwotę przychodu (dodatnia liczba, maksymalnie 2 miejsca po przecinku).";
    return;
  }

  incomes[currentIncomeIndex].name = newName;
  incomes[currentIncomeIndex].amount = newAmount;
  updateUI();
  closeModal("editIncomeModal");
}

function editExpense(index) {
  currentExpenseIndex = index;
  const expense = expenses[index];
  document.getElementById("editExpenseName").value = expense.name;
  document.getElementById("editExpenseAmount").value = expense.amount;
  document.getElementById("editExpenseError").textContent = "";
  openModal("editExpenseModal");
}

function saveExpenseChanges() {
  const newName = document.getElementById("editExpenseName").value.trim();
  const newAmount = parseFloat(
    document.getElementById("editExpenseAmount").value
  );
  const editExpenseError = document.getElementById("editExpenseError");

  if (
    !newName ||
    isNaN(newAmount) ||
    newAmount <= 0 ||
    !/^\d+(\.\d{1,2})?$/.test(newAmount)
  ) {
    editExpenseError.textContent =
      "Proszę podać poprawną nazwę i kwotę wydatku (dodatnia liczba, maksymalnie 2 miejsca po przecinku).";
    return;
  }

  expenses[currentExpenseIndex].name = newName;
  expenses[currentExpenseIndex].amount = newAmount;
  updateUI();
  closeModal("editExpenseModal");
}

function deleteIncome(index) {
  incomes.splice(index, 1);
  updateUI();
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateUI();
}
