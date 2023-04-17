const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');  //added new line 

// Create a new web server
const app = express();

// Parse JSON and URL-encoded query parameters
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());  //added new line

let loginState;


async function run() {
    let connection;

    // Connect to the Oracle database
    connection = await oracledb.getConnection({
        user: 'manager',
        password: '1504',
        connectString: 'Synapse'
    }, (err, connection) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Connected to Oracle Database');



        ////////////////////////////////////////////////////////////////////////////////////////
        // Create an endpoint to fetch form data
        app.get('/data', async (req, res) => {
            let connection;
            console.log("fetch_request");
            if (loginState) {
                try {
                    // Connect to the Oracle database
                    connection = await oracledb.getConnection({
                        user: 'manager',
                        password: '1504',
                        connectString: 'Synapse'
                    });

                    // console.log("hello");

                    // Fetch the form data from the database
                    const result = await connection.execute(
                        'SELECT name, email FROM form_data'
                    );

                    // Send the form data as a JSON response
                    res.json(result.rows);
                    console.log("fetch satisfied");
                } catch (err) {
                    console.error(err);
                    res.status(500).send('Internal server error');
                } finally {
                    if (connection) {
                        try {
                            await connection.close();
                        } catch (err) {
                            console.error(err);
                        }
                    }
                }
            } else{
                console.log("Fetch denied as admin not logged_in");
                res.setHeader('Content-Type', 'text/plain');
                res.json({ text: 'Admin not logged in' });
            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////////////  

        // Create a new endpoint to handle form submissions
        app.post('/submit', async (req, res) => {
            const name = req.body.name;
            const email = req.body.email;

            // Insert the form data into the table

            await connection.execute(
                'INSERT INTO form_data (name, email) VALUES (:name, :email)',
                [name, email],
                (err, result) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Internal server error');
                        return;
                    }

                    console.log(name);
                    console.log('Form data inserted into Oracle Database');
                    // console.log(connection.execute('select*from form_data'));
                    // Redirect the user to a confirmation page
                    // res.redirect('/confirmation.html');
                }
            );
            await connection.commit();
            res.redirect('http://127.0.0.1:3001/confirmation.html');
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Create a new endpoint to handle login
        app.post('/login', async (req, res) => {
            const authName = req.body.authName;
            const passkey = req.body.passkey;
            console.log("Admin login Requested");

            try {
                const login = await oracledb.getConnection({
                    user: authName,
                    password: passkey,
                    connectString: 'Synapse'
                });
                if(!login){
                    throw new err;
                }
                console.log("Admin logged in successfully");
                res.redirect('http://127.0.0.1:3001/admin.html');
                console.log('Connected to Oracle Database');
                loginState = true;
            } catch (err) {
                console.error(err);
                res.status(502).send('Bad Request, Incorrect Username or password');
            }
        });

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Start the web server
        app.listen(3000, () => {
            console.log('Server started at http://localhost:3000');
        });
    });

}

run();
