// Elements
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');

// Buttons
const checkAllButton = document.querySelector('#checkAll');
const clearListButton = document.querySelector('#clearAll');
const clearCheckedButton = document.querySelector('#clearChecked');

// Helper Variables
let items = JSON.parse(localStorage.getItem('items')) || [];

// Helper Functions
const addItem = (e) => {
    e.preventDefault();
    const text = (e.target.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    }

    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    e.target.reset();
}

const populateList = (plates = [], platesList) => {
    platesList.innerHTML = plates.map((plate, index) => {
        return `
            <li>
                <input type="checkbox" data-index=${index} id="item${index}" ${plate.done ? 'checked' : ''} />
                <label for="item${index}">${plate.text}</label>
                <button class="button remove" id="${index}" onclick="deleteItem()">Delete</button>
            </li>
        `;
    }).join('');
};

const checkItem = (e) => {
    if(!e.target.matches('input')) return;
    const element = e.target;
    const index = element.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

const checkAll = () => {
    const items = JSON.parse(localStorage.getItem('items'));
    items.forEach(item => {
        item.done = true;
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

const clearChecked = () => {
    const items = JSON.parse(localStorage.getItem('items'));
    items.forEach(item => {
        item.done = false;
    });
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

const clearList = () => {
    localStorage.clear();
    populateList([], itemsList);
    window.location.reload();
}

const deleteItem = (e) => {
    const newItems = items.filter(item => item !== items[event.target.id]);
    items = [...newItems];
    localStorage.setItem('items', JSON.stringify(newItems));
    populateList(newItems, itemsList);  
}

// Event Listeners
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', checkItem);
checkAllButton.addEventListener('click', checkAll);
clearListButton.addEventListener('click', clearList);
clearCheckedButton.addEventListener('click', clearChecked);

// Setup Function
populateList(items, itemsList);
