// Cache elements using selectElementById and querySelector
const fruitList = document.getElementById('fruit-list');
const fruitForm = document.getElementById('fruit-form');
const fruitSelect = document.querySelector('#fruit-select');
const formMessage = document.querySelector('#form-message');

// Initial list of fruits
const initialFruits = ['Apple', 'Banana', 'Orange', 'Mango'];

// Function to create a fruit item element
function createFruitItem(fruitName) {
    const listItem = document.createElement('li');
    listItem.textContent = fruitName;
    listItem.classList.add('fruit-item');
    return listItem;
}

// Function to populate the fruit list and dropdown
function populateFruits() {
    initialFruits.forEach(fruit => {
        // Populate list
        const fruitItem = createFruitItem(fruit);
        fruitList.appendChild(fruitItem);

        // Populate dropdown
        const option = document.createElement('option');
        option.value = fruit;
        option.textContent = fruit;
        fruitSelect.appendChild(option);
    });
}

// Check if fruit is available in the initial list
function isFruitAvailable(fruitName) {
    return initialFruits.includes(fruitName);
}

// Event listener for form submission
fruitForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedFruit = fruitSelect.value.trim();
    
    if (selectedFruit === '') {
        showMessage('Please select a fruit.', 'error');
        return;
    }

    if (isFruitAvailable(selectedFruit)) {
        showMessage(`${selectedFruit} is available!`, 'success');
    } else {
        showMessage(`${selectedFruit} is not available.`, 'error');
    }
});

// Show message function
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = type;
    formMessage.classList.remove('hidden');
}

// Initialize the fruit list and dropdown on page load
document.addEventListener('DOMContentLoaded', () => {
    populateFruits();
});
