# Bamazon

1. This application allows users to select products and updates the MySQL Database

ID SEARCH FUNCTION
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

INVENTORY UPDATE

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
