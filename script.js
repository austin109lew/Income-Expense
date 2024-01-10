let totalIncome = 0;
let totalExpense = 0;
let transactions = [];

function toggleFields(type) {
    const incomeFields = document.getElementById('incomeFields');
    const expenseFields = document.getElementById('expenseFields');

    if (type === 'income') {
        incomeFields.style.display = 'block';
        expenseFields.style.display = 'none';
    } else {
        incomeFields.style.display = 'none';
        expenseFields.style.display = 'block';
    }
}

function addTransaction(type) {
    const amountInput = (type === 'income') ? document.getElementById('incomeInput') : document.getElementById('expenseInput');
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount)) {
        let message = '';

        if (type === 'income') {
            totalIncome += amount;
            message = 'Great job! You earned some money.';
        } else {
            totalExpense += amount;
            message = 'Fucking Imbecile';
            // Add explosion effects here if desired
        }

        transactions.push({ type, amount, date: new Date().toLocaleString() });
        updateSummary();
        saveToLocalStorage();

        // Show a dramatic message
        alert(message);

        // Reset input field after adding transaction
        amountInput.value = '';

        // Retract the dropdown
        resetTransactionButtons();
    } else {
        alert('Please enter a valid amount.');
    }
}

function handleEnter(event, type) {
    if (event.key === 'Enter') {
        addTransaction(type);
    }
}

function resetTransactionButtons() {
    const transactionButtons = document.getElementById('transactionButtons');
    const incomeFields = document.getElementById('incomeFields');
    const expenseFields = document.getElementById('expenseFields');

    // Reset the buttons
    transactionButtons.innerHTML = '<button onclick="toggleFields(\'income\')">Add Income</button>' +
                                   '<button onclick="toggleFields(\'expense\')">Add Expense</button>';

    // Hide the income and expense fields
    incomeFields.style.display = 'none';
    expenseFields.style.display = 'none';
}

function updateSummary() {
    document.getElementById('totalIncome').textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById('totalExpense').textContent = `$${totalExpense.toFixed(2)}`;
    const balance = totalIncome - totalExpense;
    document.getElementById('balance').textContent = `$${balance.toFixed(2)}`;
}

function saveToLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Load data from local storage on page load
window.onload = function () {
    transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }
    });
    updateSummary();
};