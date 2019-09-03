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
    connection.query("SELECT * FROM products", function(err,res) {
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

function buySomething() {
    connection.query("SELECT * FROM products", function(err, res) {
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
    .then(function(answer) {
        
        var productChoice;

        for (var i = 0; i < res.length; i++) {
            if( parseInt(res[i].item_id) === parseInt(answer.productID)  ) {
             // if there is a match on the item_id's, store the result from the db here to look at later
                productChoice = res[i];                    
            }
        }

        //check stock levels in db
        if (parseInt(productChoice.stock_quantity) > parseInt(answer.units)) {

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
                function(error) {
                    if (error) throw err;
                    console.log("Stock Updated");
                    start();
                  }
            ); //end Update SQL 
        } //end if statement
                
        else {
            console.log("Out of Stock");
            //connection.end();
            start();
        }
    }); //end promise

});//end SELECT SQL
} //end of function

//&& (parseInt(res[i].stock_quantity) > 0)