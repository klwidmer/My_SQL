var mysql = require("mysql");
var inquirer =require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    searchID(res)
  });
}


function searchID(inventory){
  inquirer.prompt([
      {
        name: "id",
        type: "input",
        message: "What is the ID of the item you're looking to purchase?"
      },
      {
        name: "products",
        type: "input",
        message: "How many units would you like to purchase?"
          
      },
 
    ])
  .then(function(answers){
    if(checkInventory(answers.id, inventory, answers.products)){
      updateProduct(answers.id, answers.products);
    }else{
      searchID();
    }
  }) 
}

function updateProduct(id, quantity){
  connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [quantity,id], function(err, res) {
  if (err) throw err;
  console.log(res);
  afterConnection()
})
};

function checkInventory(id, inventory, productQuantity){
  for (var i = 0; i < inventory.length; i++){

   if ( inventory[i].item_id === parseInt(id) ){
      console.log("purchase made")
      if(inventory[id].stock_quantity > productQuantity){
        return true;
      }else{
        // console.log("out of stock");
        // return false;
      }
    }

  }
  console.log("id doesnt exist");
  return false;
}

