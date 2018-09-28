'use strict';
//console.log('heyyy');
const STORE = [
  {name:'Orange',checkValue:true},
  {name:'Apple', checkValue:false},
  {name:'Kiwi',checkValue:true}
];

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
        <span class="shopping-item js-shopping-item ${item.checked ? 
    'shopping-item__checked' : ''}">${item.name}</span>
        <div class="shopping-item-controls"> 
        <button class="shopping-item-toggle js-item-toggle"> 
        <span class="button-label">check</span> </button> 
        <button class="shopping-item-delete js-item-delete"> 
        <span class="button-label">delete</span> </button>
        </div> </li>`;
}

function generateShoppingItemsString(shoppingList) {
//   //return `
//     <li>apples</li>
//     <li>oranges</li>
//     <li>milk</li>
//     <li>bread</li>`;
  const items = shoppingList.map((item,index) => generateItemElement(item,index));
  return items.join('');
}

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  const shoppingListItemString = generateShoppingItemsString(STORE);
  $('.js-shopping-list').html(shoppingListItemString);

  console.log('`renderShoppingList` ran');
}
  
  
function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  console.log('`handleNewItemSubmit` ran');
}
  
  
function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  console.log('`handleItemCheckClicked` ran');
}
  
  
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  console.log('`handleDeleteItemClicked` ran');
}
  
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);