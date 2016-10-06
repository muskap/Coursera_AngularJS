

//iife definition
(function (){
  //the code for the application
  'use strict';
  //defining the application
  angular.module('shoppingListApp',[])
  .controller('shoppingListInputController', shoppingListInputController)
  .controller('shoppingToBuyController', shoppingToBuyController)
  .controller('shoppingBoughtController', shoppingBoughtController)
  .service('shoppinglistService',shoppinglistService);

  //defining the input controller handler function
  shoppingListInputController.$inject=['shoppinglistService'];
  function shoppingListInputController(shoppinglistService){
    var listInput= this;

    //definition of to be exposed variables
    listInput.itemName="";
    listInput.itemQuantity="";
    console.log(listInput);//display the objest just for checking purposes

    //exposing a event handler function to add items to the to be bought list
    listInput.addItem= function(){
      //call the addding to list function in the service we will create...
      console.log("calling the listAdderService to add items");
      //call the service to add item to toBuyItems
      shoppinglistService.addItem(listInput.itemName, listInput.itemQuantity);
      console.log("added item to to buy items");
    };
  }

  //defining the controller for handling the list for the items to be bought
  shoppingToBuyController.$inject=['shoppinglistService'];
  function shoppingToBuyController(shoppinglistService){
    //firstly take the refernce of the 'this' for controller as syntax object
    var toBuyList= this;

    //defining the variables to be exposed
    toBuyList.toBuyItems=shoppinglistService.getToBuyItems();
    console.log(toBuyList.toBuyItems);

    //function to buy exposed
    toBuyList.buyItem= function(toBuyItemsindex){
      //triggered when the buy button on any list item in the to buy list is clicked
      //call the service to execute the buyItem function
      shoppinglistService.buyItem(toBuyItemsindex);
      //show the updated to buy list
      console.log(toBuyList.toBuyItems);
    };

    toBuyList.removeItem= function(toRemoveItemsIndex){
      shoppinglistService.removeItem(toRemoveItemsIndex, 0);
    };
  }

  //defining the controller for handling the list for items that are bought
  shoppingBoughtController.$inject=['shoppinglistService'];
  function shoppingBoughtController(shoppinglistService){
    //firstly taking the reference of the this object
    var boughtList= this;

    //defining the variables to be exposed
    boughtList.boughtItems=shoppinglistService.getBoughtItems();
    console.log(boughtList.boughtItems);

    //unbuy items functions exposed to view through the bought list object
    boughtList.unBuyItem= function(toUnBuyItemsIndex){
      //call unbuy item in list service
      shoppinglistService.unBuyItem(toUnBuyItemsIndex);
      //show updated boughtItems
      console.log(boughtList.boughtItems);
    };

    boughtList.removeItem= function(toRemoveItemsIndex){
      shoppinglistService.removeItem(toRemoveItemsIndex, 1);
    };
  }

  function shoppinglistService(){
    //special service for sharing data between the input, to buy and the bought controllers
    var shoppinglistService= this; //taking reference of the this object

    //it maintains an array of objects for the to buy list and the bought list
    var toBuyItems=[];
    var boughtItems=[];

    //exposing the functions of te service through its object
    shoppinglistService.addItem= function (itemName, itemQuantity){
      //do something
      if((itemName)&&(itemQuantity)){
        //firstly create an object out of the item name and item quantity provided
        var item={
          name: itemName,
          quantity: itemQuantity
        };
        //add it to the items list
        toBuyItems.push(item);
        //display new array
        console.log(toBuyItems);
      }
    };

    shoppinglistService.buyItem= function (toBuyItemsindex){
      //plan is to get the item index of the item that if bought from the to buy list and then
      //to remove it from the list while adding it to the bought list

      //get the item from to buy list
      var item= toBuyItems[toBuyItemsindex];
      console.log(item);

      //add this item to the bought items
      boughtItems.push(item);
      //show updated bought items
      console.log(boughtItems);

      //remove it from the to buy items
      toBuyItems.splice(toBuyItemsindex, 1);
    };

    shoppinglistService.unBuyItem= function(toUnBuyItemsIndex){
      //get the item from bought items
      var item= boughtItems[toUnBuyItemsIndex];
      console.log(item);

      //add this item to the to buy items
      toBuyItems.push(item);
      //show updated to buy items
      console.log(toBuyItems);

      //remove it from the bought items
      boughtItems.splice(toUnBuyItemsIndex, 1);
    };

    shoppinglistService.removeItem= function(toRemoveItemsIndex, listNo){
      // fistly need to know which list to remove from...thats why there is the list no argument
      //0= to buy list....1= bought list
      if(listNo===0){
        //remove from toBuyItems
        toBuyItems.splice(toRemoveItemsIndex, 1);
      }
      else if (listNo===1) {
        //remove from bought items
        boughtItems.splice(toRemoveItemsIndex, 1)
      }
    };

    //exposing functions to return items list to the
    shoppinglistService.getToBuyItems= function(){
      return toBuyItems;
    };
    shoppinglistService.getBoughtItems= function(){
      return boughtItems;
    };
  }

})();
