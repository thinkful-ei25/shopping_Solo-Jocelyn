'use strict';
/*eslint-env jquery*/

const STORE = {
  items: [{name:'Orange',checked:true},
    {name:'Apple', checked:false},
    {name:'Kiwi',checked:true}],
  hideCompleted: false,
  searchTerm: null,
  editText:null
};

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
    <span class="shopping-item js-shopping-item ${item.checked ? 
    'shopping-item__checked' : ''} ">${item.name}</span>
    <div class="shopping-item-controls">
      <button class="shopping-item-toggle js-item-toggle">
          <span class="button-label">check</span>
      </button>
      <button class="shopping-item-delete js-item-delete">
          <span class="button-label">delete</span>
      </button>
      <button class="shopping-item-edit js-item-edit">
          <span class="button-label">edit</span>
      </button>
    </div>
    </li>`;
}



function generateShoppingItemsString(shoppingList) {
  //this function creates a string form of shopping items to update html template
  const items = shoppingList.map((item,index) => generateItemElement(item,index));
  return items.join('');
}

function renderShoppingList() {
  // this function will be responsible for rendering the shopping list in
  // the DOM
  let filteredItems = Array.from(STORE.items); 
  if (STORE.hideCompleted) {
    filteredItems = filteredItems.filter(item => !item.checked);
  }

  const shoppingListItemString = generateShoppingItemsString(filteredItems);
  $('.js-shopping-list').html(shoppingListItemString);
  // eslint-disable-next-line no-console
  console.log('`renderShoppingList` ran');
}

function addItemToShoppingList(itemName) { 
  //this function will add user added items to STORE with default checked status of false 
  STORE.items.push({name : itemName, checked : false}); 
} 

function handleSearchItemSubmit(){
  $('#shoppingListFilter').click(function(event){
    const searchItem = $('#shoppingFilterEntry').val();
    // console.log(searchItem);
    STORE.searchTerm = searchItem;
    searchItemFilter(searchItem);
  });
}


function handleNewItemSubmit() {  
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(event){
    event.preventDefault(); 
    const newItemName = $('.js-shopping-list-entry').val(); 
    $('.js-shopping-list-entry').val(''); 
    addItemToShoppingList(newItemName);
    renderShoppingList();    
  }); 
  // eslint-disable-next-line no-console
  console.log('`handleNewItemSubmit` ran');
}


function searchItemFilter(search){
  let filteredItems = STORE.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase())); 
  console.log(filteredItems);
  if (STORE.searchTerm !== null) {
    let filteredItemsString = filteredItems.map((item,index) => generateItemElement(item,index));
    $('.js-shopping-list').html(filteredItemsString);
  } else {
    renderShoppingList();
  }
    
}

  
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked; 
}

function handleItemCheckClicked() {
  // this function will be responsible for when users click the "check" button on
  // a shopping list item.
  //eslint-disable-next-line no-console
  $('.js-shopping-list').on('click', '.js-item-toggle', function(event){
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
  //console.log('`handleItemCheckClicked` ran');
}

function handleHideCheckedItemList() {
  //this function will be responsible for when users hide checked items
  $('.js-check-hidden').on('click', function(event){
    STORE.hideCompleted = !STORE.hideCompleted; 
    renderShoppingList();
  });
}

// function handleEditName(){
//   $('.js-shopping-list').on('click', '.shopping-item-edit',function(event){
//     const editedListElement = $(event.currentTarget).closest('li');
//   });
// }




function renderDelete(item) {
  $(item).remove();
}

function deleteStoreItem(item){
  const index = getItemIndexFromElement(item);
  STORE.items.splice(index,1);
}
  
function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  // eslint-disable-next-line no-console
  $('.js-shopping-list').on('click', '.js-item-delete', function(event){
    const listElement = $(event.currentTarget).closest('li');
    renderDelete(listElement);
    deleteStoreItem(listElement);
  });
  // console.log('`handleDeleteItemClicked` ran');
}

//this function handles displaying search results when search button is clicked
  
// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleHideCheckedItemList();
  handleSearchItemSubmit();
  // handleEditName();
}

$(handleShoppingList);