const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/list', (req, res) => {
    res.send([{
        id: 1,
        value: 'One'
    }, {
        id: 2,
        value: 'Two'
    }, {
        id: 3,
        value: 'Three'
    }])
})

app.get('/object', (req, res) => {
    res.send({
        id: 1,
        value: 'Value',
        somethingElse: 'Something else'
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})