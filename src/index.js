const app = require('./app')
const { dbConnect } = require('./database')

app.listen(3000);

console.log('Server listen on port', 3000)