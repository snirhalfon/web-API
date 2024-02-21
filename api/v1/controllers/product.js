//חיבור למודל של המוצרים
module.exports = {
  getAllProduct: (req, res) => {
    connection = global.db;
    connection.query(
      "SELECT * FROM t_prudects",
      function (error, results, fields) {
        if (error) return res.status(500).json({ error: error });
        else return res.status(200).json({ results: results });
      }
    );
  },
  getProductById: (req, res) => {
    let pid = req.params.id;
    connection = global.db;
    connection.query(
      "SELECT * FROM t_prudects where pid = ?",
      pid,
      function (error, results, fields) {
        if (error) return res.status(500).json(error);
        else return res.status(200).json(results);
      }
    );
  },
  addProduct: (req, res) => {
    let body = req.body;
    const conn = global.db;
    conn.query(
      "INSERT INTO t_prudects SET ?",
      body,
      function (error, results, fields) {
        if (error) return res.status(500).json(error);
        else return res.status(200).json(results);
      }
    );
  },
  updateProduct: (req, res) => {
    let pid = req.params.id;
    let body = req.body;
    const conn = global.db;
    conn.query(
      "UPDATE t_prudects SET ? WHERE pid = ?",
      [body, pid],
      function (error, results, fields) {
        if (error) return res.status(500).json(error);
        else return res.status(200).json(results);
      }
    );
  },
  deleteProduct: (req, res) => {
    let pid = req.params.id;
    connection = global.db;
    connection.query(
      "DELETE FROM t_prudects WHERE pid = ?",
      pid,
      function (error, results, fields) {
        if (error) return res.status(500).json(error);
        else return res.status(200).json(results);
      }
    );
  },
};
