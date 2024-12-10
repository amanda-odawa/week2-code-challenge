// Get references to HTML elements
const inputField = document.getElementById("item-input");
const addButton = document.getElementById("add-btn");
const clearButton = document.getElementById("clear-btn");
const listContainer = document.getElementById("shopping-list");

// Shopping list array 
let shoppingList = [];

// Render the shopping list
function renderList() {
    listContainer.innerHTML = ""; // Clear the list

    shoppingList.forEach((item, index) => {
        // Create a list item
        const listItem = document.createElement("li");

        // Create text span
        const textSpan = document.createElement("span");
        textSpan.textContent = item.text;

        // Add purchased class if needed
        if (item.purchased) {
            listItem.classList.add("purchased");
        }

        // Edit Button
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-btn");
        editButton.addEventListener("click", () => editItem(index, textSpan));

        // Mark Purchased Button
        const purchasedButton = document.createElement("button");
        purchasedButton.textContent = item.purchased ? "Unmark" : "Mark Purchased";
        purchasedButton.classList.add("mark-purchased-btn");
        purchasedButton.addEventListener("click", () => togglePurchased(index));

        // Append elements to the list item
        listItem.appendChild(textSpan);
        listItem.appendChild(editButton);
        listItem.appendChild(purchasedButton);

        // Add to the list container
        listContainer.appendChild(listItem);
    });
}

// Add a new item
function addItem(event) {
    event.preventDefault(); // Prevent default form submission (if any)
    const itemText = inputField.value.trim();
    if (!itemText) {
        alert("Please enter an item!");
        return;
    }
    shoppingList.push({ text: itemText, purchased: false });
    inputField.value = ""; // Clear input field
    renderList();
}

// Toggle purchased status
function togglePurchased(index) {
    shoppingList[index].purchased = !shoppingList[index].purchased;
    renderList();
}

// Edit an item
function editItem(index, textSpan) {
    const currentText = shoppingList[index].text;
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;

    // Replace text span with input field
    textSpan.replaceWith(editInput);

    // Add save functionality
    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.classList.add("edit-btn");
    saveButton.addEventListener("click", () => {
        const newText = editInput.value.trim();
        shoppingList[index].text = newText || currentText; // Keep old text if empty
        renderList();
    });

    // Replace Edit button with Save button
    const listItem = editInput.parentElement;
    const editButton = listItem.querySelector(".edit-btn");
    editButton.replaceWith(saveButton);
}

// Clear the list
function clearList() {
    shoppingList = [];
    renderList();
}

// Attach event listeners
addButton.addEventListener("click", addItem);
clearButton.addEventListener("click", clearList);
inputField.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addItem(event);
});

// Initial render
renderList();
