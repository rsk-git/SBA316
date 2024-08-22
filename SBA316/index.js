// Cache at least one element using selectElementById
const fruitList = document.getElementById('fruit-list');
const fruitSelect = document.querySelector('#fruit-select');
const addFruitForm = document.getElementById('add-fruit-form');
const checkFruitForm = document.getElementById('check-fruit-form');
const formMessage = document.querySelector('#form-message');
const addFruitMessage = document.querySelector('#add-fruit-message');
const resetButton = document.querySelector('#check-fruit-form button[type="reset"]');

// List of fruits
const initialFruits = ['Apple', 'Banana', 'Orange', 'Mango'];

// User-added fruits
let userAddedFruits = [];

// create a fruit item function
function createFruitItem(fruitName) {
    const listItem = document.createElement('li');
    listItem.textContent = fruitName;
    listItem.classList.add('fruit-item');
    return listItem;
}

// Populate fruit list
function populateFruitList() {
    fruitList.innerHTML = '';
    initialFruits.forEach(fruit => {
        const fruitItem = createFruitItem(fruit);
        fruitList.appendChild(fruitItem);
    });
}

// Populate dropdown
function populateDropDown() {
    fruitSelect.innerHTML = '';

    // Add blank option at start
    const blankOption = document.createElement('option');
    blankOption.value = '';
    blankOption.textContent = 'Select a fruit';
    fruitSelect.appendChild(blankOption);

    initialFruits.concat(userAddedFruits).forEach(fruit => {
        const option = document.createElement('option');
        option.value = fruit;
        option.textContent = fruit;
        fruitSelect.appendChild(option);
    });
    console.log('Population of dropdown options:', fruitSelect.innerHTML);
}

// Check if fruit is available
function isFruitAvailable(fruitName) {
    return initialFruits.includes(fruitName) || userAddedFruits.includes(fruitName);
}

// Event listener for checking fruit availability
checkFruitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selectedFruit = fruitSelect.value.trim();
    if (selectedFruit === '') {
        showMessage('Select a fruit.', 'error');
        return;
    }
    if (isFruitAvailable(selectedFruit)) {
        showMessage(`${selectedFruit} is available`, 'success');
    } else {
        showMessage(`${selectedFruit} is not available.`, 'error');
    }
});

// Event listener for adding new fruit
addFruitForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newFruit = document.getElementById('new-fruit').value.trim();
    if (newFruit === '') {
        showAddFruitMessage('Enter the fruit name.', 'error');
        return;
    }
    if (isFruitAvailable(newFruit)) {
        showAddFruitMessage(`${newFruit} is already in the list or previously added.`, 'error');
    } else {
        userAddedFruits.push(newFruit);
        populateDropDown(); // update dropdown without adding to available list
        showAddFruitMessage(`${newFruit} is added for future availability.`, 'success');
    }
    // Reset
    addFruitForm.reset();
});

// Reset button 
resetButton.addEventListener('click', () => {
    fruitSelect.selectedIndex = 0;  // Select blank option
    formMessage.textContent = '';
    formMessage.className = 'hidden';
});

// Show messages for checking available fruits
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    formMessage.classList.remove('hidden');
}

// Show messages for adding new fruit
function showAddFruitMessage(message, type) {
    addFruitMessage.textContent = message;
    addFruitMessage.className = type;
    addFruitMessage.classList.remove('hidden');
}

// Initialize the dropdown and fruit list
document.addEventListener('DOMContentLoaded', () => {
    populateFruitList();
    populateDropDown();
});
