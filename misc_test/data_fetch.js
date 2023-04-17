const oracledb = require('oracledb');
const express = require('express');
const app = express();
const ejs = require('ejs');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function run() {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: "manager",
      password: "1504",
      connectString: "Synapse"
    });

    const result = await connection.execute('SELECT * FROM form_data');
    const rows = result.rows;
    await connection.commit();

    app.get('/', function(req, res) {
      res.render('index', { rows: rows });
    });

    app.listen(3000, function() {
      console.log('Server is running on port 3005');
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('Connection closed.');
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
