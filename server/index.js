const express = require('express')
const cors = require('cors')
const app = express()

app.set('secret', 'i2u34y12oi3u4y8')

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/', express.static(__dirname + '/web'))
app.use('/admin', express.static(__dirname + '/admin'))

require('./plugins/db')(app)
require('./routes/admin/index.js')(app)
require('./routes/web/index.js')(app)

app.listen(3000, async (req, res) => {
  console.log('http://localhost:3000')
})
