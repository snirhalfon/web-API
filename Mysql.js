var mysql = require("mysql"); //קריאה לספרייה
var connection = mysql.createConnection({
  //חיבור לדאטה בייס
  host: "localhost",
  user: "root",
  password: "HALFONsnir5515",
  database: "ecommerce",
});

function createProduct(productData, callback) {
  connection.connect();
  connection.query(
    "INSERT INTO t_prudects SET ?",
    productData,
    function (error, results, fields) {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    }
  );
}

function getAllProducts(callback) {
  connection.connect();
  connection.query(
    "SELECT * FROM t_prudects",
    function (error, results, fields) {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    }
  );
}

function updateProduct(productId, updatedData, callback) {
  connection.connect();
  connection.query(
    "UPDATE t_products SET ? WHERE pid = ?",
    [updatedData, productId],
    function (error, results, fields) {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    }
  );
}

function deleteProduct(productId, callback) {
  connection.connect();
  connection.query(
    "DELETE FROM t_products WHERE pid = ?",
    productId,
    function (error, results, fields) {
      if (error) {
        return callback(error);
      }
      callback(null, results);
    }
  );
}
const errorCB = (error, results) => {
  if (error) throw error;
  console.log(results);
};
const newProduct = {
  pid: null,
  pname: "age",
  price: 50,
  picname: "age.jpg",
  pdes: null,
};

createProduct(newProduct, errorCB);
