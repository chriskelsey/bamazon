//Required Packages
require('dotenv').config();
var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');

//Connect to the mysql db
var connection = mysql.createConnection({
	host:'localhost',
	port: 3306,
	user: 'root',
	password: process.env.MYSQL_ROOT_USER_PASSWORD,
	database: 'bamazon'
});

connection.connect(function(err) {
	if(err) throw err;
	displayProducts();
});

//Node Functions

function displayProducts() {
	//Build the table
	var table = new Table({
    	head: ['Item ID', 'Product Name', 'Price']
	});
	//Select items to push to the table
	var query = "SELECT item_id, product_name, price FROM products";
  	connection.query(query, function(err, res) {
	    for (var i = 0; i < res.length; i++) {
	      table.push([res[i].item_id, res[i].product_name, res[i].price]);
	    }
	    console.log(table.toString());
	    selectProducts();
	});
}

function selectProducts() {
	inquirer.prompt([
      {
        name: "item_id",
        type: "input",
        message: "First, Please Select an Item ID.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "stock_quantity",
        type: "input",
        message: "Now, please select the amount you'd like to purchase.",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      var query = "SELECT * FROM products WHERE ?";
      connection.query(query, { item_id: answer.item_id}, function(err, res){
      	if(res[0].stock_quantity < answer.stock_quantity){
      		console.log('We\'re Sorry, there\'s not enough items in stock for your purchase');
      	}else {
      		console.log('\n________________________________________________\n');
      		console.log('Thank you for your purchase.\nYour total is ' + (res[0].price * answer.stock_quantity).toFixed(2));
      		console.log('________________________________________________\n');
      		connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?",[res[0].stock_quantity - answer.stock_quantity,answer.item_id], function (err, res) {
                    if (err) throw err;
                });
      	}
      	continueShopping();
      });
    });
}

function continueShopping() {
	inquirer.prompt([
      	{
      		name: 'fin',
      		type: 'confirm',
      		message: 'Are you all done shopping?'
      	}
    ]).then(function(answer) {
      	if(answer.fin === false){
      		displayProducts();
      	} else{
      		console.log('Thanks for shopping with us!');
      		connection.end();
      	}
    });
}
