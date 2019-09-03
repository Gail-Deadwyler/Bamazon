/* grab needed npm packages */
var mysql = require("mysql");
var inquirer = require("inquirer");

/* Create Connection information for the SQL database */
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "dracomalfoy",
    database: "bamazon_db"
});

/* Connect to bamazon_db */
connection.connect(function(err) {
    if (err) throw err;
    //console.log(`Connected as ${connection.threadId}`);
    showProducts();
    //buySomething();
});

//Show all items in the products Table
function showProducts() {
    var query = connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " ||" + " Product Name: " + res[i].product_name + " ||" + " Price: $" + parseInt(res[i].price));
        }
        //console.log(`Query that is run: ${query.sql}`);
        //console.log("type of price is " + typeof(res[0].price));
        start();
    });

}

//Ask user what they want to do
function start() {
    //console.log("Enter your selection");
    inquirer
        .prompt(
            {
                name: "BuyorExit",
                type: "list",
                message: "Would you like to purchase or EXIT",
                choices: ["Purchase", "EXIT"]
            }            
        )
        .then(function(answer) {
            if(answer.BuyorExit === "Purchase") {
                buySomething();
            }
            else {
                connection.end();
            }
        });
} //end of function


// //{
//     name: "units",
//     type: "input",
//     message: "How many units do you want to purchase: "
// },
// {
//     name: "exit",
//     type: "input",
//     message: "Exit application "
// }      


    // .prompt({
    //     name: "action",
    //     type: "list",
    //     message: "Please select an option below:",
    //     choices: [
    //         "ID of Product",
    //         "How many units",
    //         "Exit"
    //     ]
    // })
    // .then(function(user) {
    //     switch(user.action) {
    //         case "ID of Product"
    //     }

    // });





