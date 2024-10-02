import express from "express";
import cors from 'cors';
import DB from "./crowdfunding_db.js";
const app = express();
// Enable Cross-Origin Resource Sharing (CORS) for the application
app.use(cors())

// Test endpoint to check if the server is running
app.get('/test', function (req, res) {
    // Send a 200 OK response with 'test' message
    res.status(200).send('test')
})

// Endpoint to get categories from the database
app.get("/categories", async (req, res) => {
    try {
        // Execute a SQL query to select all records from the CATEGORY table
        const [rows] = await DB.query("SELECT * FROM CATEGORY");
        // Send the retrieved rows as the response with a 200 status
        res.status(200).send(rows);
    } catch (err) {
        // Send a 500 Internal Server Error if an error occurs
        res.status(500);
    }
});


// Endpoint to get the list of fundraising projects
app.get("/fundraisers", async (req, res) => {
    try {
        // Execute a SQL query to select all records from the FUNDRAISER table
        const [rows] = await DB.query('SELECT * FROM FUNDRAISER');
        // Send the retrieved rows as the response with a 200 status
        res.status(200).send(rows)
    } catch (err) {
        // Send a 500 Internal Server Error if an error occurs
        res.status(500);
    }
});

// Endpoint to query a fundraiser by its ID
app.get("/fundraiser/:id", async (req, res) => {
    // Retrieve the fundraiser ID from the request parameters
    const fundraiserId = req.params.id;
    try {
        // Execute a SQL query to select the fundraiser with the specified ID
        const [rows] = await DB.query(`SELECT * FROM FUNDRAISER WHERE FUNDRAISER_ID = ${fundraiserId}`);
        // Send the first row of the result as the response with a 200 status
        res.status(200).send(rows[0]);
    } catch (err) {
        // Send a 500 Internal Server Error and the error message if an error occurs
        res.status(500).send({ error: err.message });
    }
});

// Endpoint to search fundraisers based on query parameters
app.get("/search", async (req, res) => {
    // Destructure query parameters from the request
    const { organizer, city, category } = req.query;

    let query = "";// Initialize the query string
    let params = []// Array to hold individual conditions
    // Check if the organizer query parameter is provided and add to params
    if (organizer) {
        params.push(`ORGANIZER = '${organizer}'`)
    }
    // Check if the city query parameter is provided and add to params
    if (city) {
        params.push(`CITY = '${city}'`)
    }
    // Check if the category query parameter is provided and add to params
    if (category) {
        params.push(`CATEGORY_ID = '${category}'`)
    }
    // Construct the WHERE clause of the SQL query
    for (const key in params) {
        if (key != 0) {
            // If it's not the first parameter, prepend with AND
            query += `AND ${params[key]} `
        } else {
            // If it's the first parameter, prepend with WHERE
            query += `WHERE ${params[key]} `
        }
    }
    try {
        // Execute the constructed SQL query to search for fundraisers
        const [rows] = await DB.query(`SELECT * FROM FUNDRAISER ${query}`);
        // Send the retrieved rows as the response with a 200 status
        res.status(200).send(rows);
    } catch (err) {
        // Send a 500 Internal Server Error and the error message if an error occurs
        res.status(500).send({ error: err.message });
    }
});

// Start the server on port 3000 and log the URL to the console
app.listen(3000, () => {
    console.log(`http://localhost:3000/`);
});
