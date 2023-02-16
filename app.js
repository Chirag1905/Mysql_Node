const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Create Connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "CRUD"
});
app.use(bodyParser.json());
// Select Data 
app.get('/', (req, res) => {
    con.query("select * from USERS", (err, result) => {
        if (err) {
            console.warn("some error")
        }
        else {
            console.warn(result)
            res.send(result)
        }
    })
})
// Insert Data 
app.post('/', (req, res) => {
    const data = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        address: req.body.address
    }
    con.query("insert into USERS set ?", [data], (err, result) => {
        if (err) {
            console.log("some error")
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})
// Update Data 
app.put("/:id", (req, resp) => {
    const data = [req.body.name, req.body.email, req.body.address, req.params.id]
    con.query("UPDATE USERS SET name = ?, email = ?, address = ? WHERE ID = ?", data, (err, result) => {
        if (err) throw err;
        resp.send(result)
    })
})
// Delete Data 
app.delete('/:id', (req, res) => {
    con.query("delete from USERS where id = ?", [req.params.id], (err, result) => {
        if (err) {
            console.log("some error")
        }
        else {
            console.log(result)
            res.send(result)
        }
    })
})
// Search Data 
app.get('/:id', (req, res) => {
    con.query("select * from USERS where id =?", [req.params.id], (err, result) => {
        if (err) {
            console.warn("some error")
        }
        else {
            console.warn(result)
            res.send(result)
        }
    })
})
app.listen(4500, () => console.log("Server listening on port 4500"));