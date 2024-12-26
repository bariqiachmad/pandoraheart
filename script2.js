function appendToScreen(value) {
  document.getElementById('screen').value += value;
}

function clearScreen() {
  document.getElementById('screen').value = '';
}

function calculate() {
  const expression = document.getElementById('screen').value;
  try {
    const result = eval(expression);
    document.getElementById('screen').value = result;
  } catch (error) {
    document.getElementById('screen').value = 'Error';
  }
}


let balance = 0;

function addTransaction() {
  const description = document.getElementById('description').value;
  const amount = parseFloat(document.getElementById('amount').value);

  if (isNaN(amount) || description.trim() === '') {
    alert('Please enter valid description and amount.');
    return;
  }
  balance += amount;
  updateBalance(balance);

  const transactionList = document.getElementById('transactionList');
  const li = document.createElement('li');
  li.textContent = `${description}: $${amount.toFixed(2)}`;
  transactionList.appendChild(li);

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
}

function updateBalance(newBalance) {
  const balanceElement = document.getElementById('balance');
  balanceElement.textContent = `$${newBalance.toFixed(2)}`;
}

// Function to load transactions from localStorage
function loadTransactions() {
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  if (transactions) {
    transactions.forEach(transaction => {
      addTransactionToList(transaction.description, transaction.amount);
    });
  }
}

// Function to save transaction note and amount to localStorage
function saveTransactionNote() {
  const transactionNote = document.getElementById('transactionNote').value;
  localStorage.setItem('transactionNote', transactionNote);
}

// Function to add transaction and update note
function addTransactionAndNote() {
  const transactionList = document.getElementById('transactionList');
  const transactionItems = transactionList.getElementsByTagName('li');

  // Get existing transaction notes from textarea
  const transactionNote = document.getElementById('transactionNote');

  // Construct transaction note from existing transactions
  let existingTransactions = transactionNote.value.trim();
  
  // Add new transaction to existing transactions
  for (let i = 0; i < transactionItems.length; i++) {
    const transactionItem = transactionItems[i];
    existingTransactions += '\n' + transactionItem.textContent;
  }

  // Update transaction note
  transactionNote.value = existingTransactions.trim();

  // Save transaction note to localStorage
  saveTransactionNote();

  // Focus on transaction note textarea
  transactionNote.focus();
}

// Load transaction note when the page is loaded
window.addEventListener('load', function() {
  const transactionNote = localStorage.getItem('transactionNote');
  const transactionNoteField = document.getElementById('transactionNote');
  if (transactionNote) {
    transactionNoteField.value = transactionNote;
  } else {
    transactionNoteField.value = "Tabungan:";
  }
});

// Save transaction note when the Save button is clicked
document.getElementById('saveButton').addEventListener('click', saveTransactionNote);

// Add transaction and update note when the Add Transaction button is clicked
document.getElementById('addTransactionButton').addEventListener('click', addTransactionAndNote);
 
// Function to clear one line of transaction note
function clearTransactionNote() {
  const transactionNote = document.getElementById('transactionNote');
  const lines = transactionNote.value.split('\n');
  const lastLine = lines.pop(); // Hapus dan ambil baris terakhir
  const updatedNote = lines.join('\n');
  transactionNote.value = updatedNote; // Menggunakan 'value' bukan 'textContent'

  // Hapus data terakhir dari localStorage jika ada
  const transactions = JSON.parse(localStorage.getItem('transactions'));
  if (transactions && transactions.length > 0) {
    transactions.pop(); // Hapus transaksi terakhir
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }
}

