/* grab needed npm pacakages */
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
    console.log(`Connected as ${connection.threadId}`);
    afterConnection();
});

//Show all items in the products Table
function afterConnection() {
    var query = connection.query("SELECT * FROM products", function(err,res) {
        if (err) throw err;
        // console.log(res);
        for (var i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " ||" + " Product Name: " + res[i].product_name + " ||" + " Price: $" + parseInt(res[i].price));
        }
        console.log(`Query that is run: ${query.sql}`);
        console.log("type of price is " + typeof(res[0].price));

    });

}

