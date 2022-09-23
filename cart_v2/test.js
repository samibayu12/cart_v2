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
        if (this.readystate === 4 && this.status ===200){
           // console.log(this.responseText); outputs the response text as text
           //console.lpg(JSON.parse(this.responseText)); //outputs the Response text as Javascript object 
            //console.log(myRequset); //outputs the request 

            //convert ResponseText to JS Object
            var myJsObject = JSON.parse(this.responseText);
            let products = "";

            for (var i = 0; i < myJsObject.length; i++){
                products += myJsObject[i];
                console.log(myJsObject[i].Name);

               // console.log(myText);
               document.getElementById("show").innerHTML = products[i];
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
    myRequest.open("GET","products.php",false);
    myRequest.send();     


       
 }
 window.onload = function() {
    getRepos();
  }

