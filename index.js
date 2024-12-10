//Load shopping list from localStorage if available (Persistence)
let shoppingList = JSON.parse(localStorage.getItem('shoppingList')) || [];

//Get references to HTML elements
const inputField = document.getElementById('item-input');
const addButton = document.getElementById('add-btn');
const clearButton = document.getElementById('clear-btn');
const listContainer = document.getElementById('shopping-list');

//Function to render the shopping list
function renderList() {
    listContainer.innerHTML = ''; //Clear the list container

    shoppingList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.text;
        listItem.classList.toggle('purchased', item.purchased);

        //Add Mark Purchased Button
        const markPurchasedButton = document.createElement('button');
        markPurchasedButton.textContent = item.purchased ? 'Unmark' : 'Mark Purchased';
        markPurchasedButton.classList.add('mark-purchased-btn');
        markPurchasedButton.addEventListener('click', (event) => {
            event.stopPropagation();
            markAsPurchased(index);
        });
        
        //Add Edit Button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-btn');
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            editItem(index);
        });

        //Append the buttons to the list item
        listItem.appendChild(editButton);
        listItem.appendChild(markPurchasedButton);

        //Append the list item to the list container
        listContainer.appendChild(listItem);
    });

    //Save the list to localStorage
    localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
}

//Function to add a new item
function addItem() {
    const itemText = inputField.value.trim();
    
    if (itemText) {
        shoppingList.push({ text: itemText, purchased: false });
        inputField.value = '';  // Clear the input field after adding the item
        renderList();  // Re-render the list
    }
}

// Function to mark an item as purchased
function markAsPurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();  // Re-render the list
}

// Function to edit an existing item
function editItem(index) {
    const newText = prompt('Edit item:', shoppingList[index].text);
    if (newText) {
        shoppingList[index].text = newText;
        renderList();  // Re-render the list
    }
}

// Function to clear the list
function clearList() {
    shoppingList = [];
    renderList();  // Re-render the empty list
}

// Attach event listeners
addButton.addEventListener('click', addItem);
clearButton.addEventListener('click', clearList);

// Allows pressing Enter to add item (Fun bonus)
inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addItem();
    }
});

// Initial render of the shopping list
renderList();