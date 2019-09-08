/**
 * Programming assignment:  Bamazon
 * Developer:               Gail Deadwyler
 * Date Written:            9/7/19
 * Purpose:                 Bamazon is a command line node app that creates an Amazon-like storefront that takes in orders from customers 
 *                          and depletes stock from the store's inventory 
 *                          
 */

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
connection.connect(function (err) {
    if (err) throw err;    
    showProducts();    
});


function showProducts(someArg) {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " ||" + " Product Name: " + res[i].product_name + " ||" + " Price: $" + parseInt(res[i].price));
        }
        start();
    });
}

/* Ask user what they want to do - Purchase or Exit the app */
function start() {    
    inquirer
        .prompt(
            {
                name: "BuyorExit",
                type: "list",
                message: "Would you like to purchase or EXIT",
                choices: ["Purchase", "EXIT"]
            }
        )
        .then(function (answer) {
            if (answer.BuyorExit === "Purchase") {
                buySomething();
            }
            else {
                connection.end();
            }
        });
} /*end of function*/


/* Updates the products table if there is sufficient stock and displays total price */
/* Otherwise, display out of stock */
function buySomething() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "productID",
                    type: "input",
                    message: "Enter Product ID: "
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units do you want to purchase? "
                }
            ])
            .then(function (answer) {

                var productChoice;

                for (var i = 0; i < res.length; i++) {
                    if (parseInt(res[i].item_id) === parseInt(answer.productID)) {
                        /* if there is a match on the item_id's, store the result from the db to look at later */
                        productChoice = res[i];
                    }
                }

                /* check stock levels in db */
                if (parseInt(productChoice.stock_quantity) >= parseInt(answer.units)) {

                    var stockUpdate = productChoice.stock_quantity - answer.units;

                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: stockUpdate

                            },
                            {
                                item_id: productChoice.item_id

                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Stock Updated");
                            start();
                        }
                    ); /* end Update SQL */

                    var customerPrice = parseInt(productChoice.price) * parseInt(answer.units);
                    console.log(`You ordered ${answer.units} units of ${productChoice.product_name} and your total cost for these items is $${customerPrice}`);
                } /* end if statement */

                else {
                    console.log("Out of Stock");                    
                    start();
                }
            }); /* end promise */

    }); /* end SELECT SQL */
} /* end of function */