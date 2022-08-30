const confSQLite =  {
    client: 'better-sqlite3',
    connection:{
        filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    }

const confMysql = {
    client: 'mysql',
    connection:{
        host: '127.0.0.1',
        user:'root',
        password:'',
        database:'ecommerceProd'
    }
}

module.exports = {
    confSQLite,
    confMysql
}