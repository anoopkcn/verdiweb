const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')


const app = express()
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/', (request, response) => {
    response.json({ message: "Welcome to AiiDA Verdi webview" })
})

app.get('/dbnodes', db.dbnodes)
app.get('/dbnodes/:id', db.dbnode)
app.get('/dblog/:id', db.dblog)
app.get('/dblink/:id', db.dblink)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`)
})
