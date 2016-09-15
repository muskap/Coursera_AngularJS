// //start your new code
// //iife definition
// (function (){
//   'use strict'//give error against wrong declarations which may causse problem with angular framework...
//
//   //test for the list matches check
//   var str="beef, sushi, chicken, ice-cream.";
//   var pattern=/,/g;//pattern definition for searching commas(,) and looking for all of them
//   console.log(str.match(pattern).length);
//
// })();

//iife definition
(function (){
  'use strict'

  //angular module definition
  var app=angular.module('list',[]);

  //controller definition
  app.controller('listController',listController);

  //handler function for the controller
  listController.$inject=['$scope'];
  function listController ($scope){
    //define some variables in the scope service..
    $scope.listItems="";
    $scope.result="Please Enter the Items!";
    $scope.status="info";

    //event handling function...need to expose it as it is accessed by the view
    $scope.checkItems= function (){

      //time to check the list of items...
      var listItems= $scope.listItems; console.log(listItems);
      //now with the pattern defined..time to check number of occurances of the pattern in the input string
      //the number of itme sin the lits will be 1 greater than it
      var num=getNumber(listItems);
      // console.log(num);

      //after finding the number of items time to check wether numbers are too many and set result accordingly..
      checkNumber(num);
    };

    //creating a reset function to reset the state when necessary
    $scope.reset= function (){
      //clear the input list
      $scope.listItems="";
      //status to inf0
      $scope.status="info";
      //scope result to ask for input
      $scope.result="Please Enter the Items!";
    };

    var checkNumber= function(itemNumber){
      //our aim is to check wether the number of items is greater or less than three...and display a comment accordingly
      if(itemNumber==0){
        $scope.status="warning";
        $scope.result="Please Enter the Items!";
      }
      else if(itemNumber<=3){
        //nice...number of items are less than 3..go ahead and set the message to success
        $scope.status="success";
        // $scope.result="Number of Items are looking Good!";
        $scope.result="Enjoy!";
      }
      else {
        //huston we have a problem...too many items..
        $scope.status="danger";
        $scope.result="Too many Items!";
      }
    };

  }


  function getNumber(itemList){
    //firstly we look fot he number of commas in the input
    var pattern=/,/g;
    var num=0;
    //firstly trimming the input string to remove unnecessary spaces
    itemList=itemList.trim();
    //checking for occurance of a empty item position...(like: ,  ,)
    var emptyItemPatt=/,(\s*),/g;
    itemList=itemList.replace(emptyItemPatt,",");
    console.log("trimmed list: "+itemList);

    //check for empty input
    if(!itemList){
      //wolla..list is empty...do nothing
    }
    else {
      //list is not empty...match the pattern and find the number of commas
      var n=itemList.match(pattern);
      //now two possibilities...no commas meaning length is null and there are commas so list is not empty
      if(!n){
        //list contains no commas so theres only one item in it
        num=1;
      }
      else {
        //tere are more than one items..
        num=n.length+1;
      }
    }
    console.log(num);
    return num;
  }

})();
