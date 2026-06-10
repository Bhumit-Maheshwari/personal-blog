const mysql =
require('mysql2/promise')

const pool =
mysql.createPool({

  host: 'localhost',

  user: 'root',

  password: 'Bhumit!@#123',

  database:
    'personalblog_analytics'

})

module.exports = pool