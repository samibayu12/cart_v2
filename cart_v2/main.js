let carts = document.querySelectorAll('.add-cart');
// carts => will hold any item that has the class ".add-cart" in this case 4 items




// write a function to do the Request
function getRepos(){
    //Assign the Request object to variable
    var myRequest = new XMLHttpRequest();
    //XMLHttpRequest => is object that exchanges information with the Server in background

    //On Ready State Change => function called when ready state change
    myRequest.onreadystatechange = function() {
        /**
        * Ready Status => The Status Of The Request
        *[0] = Request Not Intialized
        *[1] = Server Connection Established
        *[2] = Request Recieved 
        *[3] = Processing Request
        *[4] = Request Finished and Response is Recieved
        * Status => Response Status Code
        * [200] => Ok
        **/

        //if Request is finished and Response is reaady and Status Code is 200(ok) Output the Response Text
        if (this.readystate ===4 && this.status ===200){
           // console.log(this.responseText); outputs the response text as text
           //console.lpg(JSON.parse(this.responseText)); //outputs the Response text as Javascript object 
            //console.log(myRequset); //outputs the request 

            //convert ResponseText to JS Object
            var myJsObject = JSON.parse(this.responseText);
            let products = [];

            for (var i = 0; i < myJsObject.length; i++){
                console.log(myJsObject[i]);
                products += myJsObject[i];
               // console.log(myText);
            }
            //document.getElementById("show").innerHTML = myText;
        }
    };
    /*
    //XMLHttpRequest.open(Method, URL, Async[true(async=>works in background) , false(sync=>it won't start other requst until this one is finished)], User, Password)
   * myRequest.open("GET","users.json",true);
   * myRequest.send();     //sends your Request to the Server
   */

    //Get Request 
    myRequest.open("GET","products.php",true);
    myRequest.send();     


       
 }

 window.onload = function() {
    getRepos();
  };
 



// const limit = {"limit":10};
// const dbParam = JSON.stringify(limit);
// xmlhttp = new XMLHttpRequest();
// xmlhttp.onload = function() {
//   document.getElementById("demo").innerHTML = this.responseText;
// }
// xmlhttp.open("GET","products.php");
// xmlhttp.send();


// let products = [
//     {
//         name : 'pill1',
//         tag : 'cough',
//         price: 3500,
//         inCart: 0,
//         imgs: 'pill1'
//     },
//     {
//         name : 'pill2',
//         tag : 'noise',
//         price: 3000,
//         inCart: 0,
//         imgs: 'pill2'
//     },
//     {
//         name : 'pill3',
//         tag : 'respiratory',
//         price: 2500,
//         inCart: 0,
//         imgs: 'pill2'
//     },
//     {
//         name : 'pharmacy1',
//         tag : 'disease',
//         price: 2000,
//         inCart: 0,
//         imgs: 'pharmacy1'

//     },
// ];


for (let i=0; i < carts.length; i++){
    //this will loop on each item and add  "addEventListener", if clicked 
    //it will trigger the cartNumbers() function
    //this function is passed with a products info
    //so may be the items must be brought from database and converted to json object
    // then pass it to this function
    //mae sure that the items in the show page to be in the same order
    //when bringing it from database and puttin it as json object
    carts[i].addEventListener('click', () =>{
        //console.log('added to cart');
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.cart span').textContent = productNumbers ;
    }
}


function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    //console.log(product);
    //console.log(productNumbers);
    //console.log(typeof productNumbers);

    productNumbers = parseInt(productNumbers);
    //console.log(typeof productNumbers);
    //localStorage.setItem('cartNumbers', 1);

    if (productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1 ;
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('.cart span').textContent = 1 ;
    }
    setItems(product);
}


function setItems(product){
   //console.log("Inside of SetItems function");
   // console.log("My product is", product);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

   if(cartItems != null){

       if(cartItems[product.tag] == undefined){
           cartItems = {
               ...cartItems,
               [product.tag]: product
           }
       }
       //console.log("My Carts  are " , cartItems[product.tag]);
       cartItems[product.tag].inCart += 1 ;
   }
   else{
        product.inCart = 1;
        cartItems = {
            [product.tag] : product
        }
   }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


function totalCost(product){
    //console.log("the product price is : " , product.price);
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cart cost is", cartCost);
    console.log(typeof cartCost);
    //by default any data brought from the localStorge is in form of string
   
    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}



function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems= JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);

    if(cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class= "product">
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src="./images/${item.imgs}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="caret-back-circle-outline"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="caret-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTittle"> Basket Total</h4>
                <h4 class="basketTotal">$${cartCost},00</h4>
            </div>
    `;

    }
}


onLoadCartNumbers();
displayCart();