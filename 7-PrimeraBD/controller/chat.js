class Chat{

    constructor(){
        this.knexConf,
        this.table
    }
    saveChat(config, nameTable, obj){
        this.knexConf = config;
        this.table = nameTable;
        let knex = require('knex')(this.knexConf);
        let tableName = this.table;
        knex.schema.hasTable(this.table).then(function(exists,) {
            if (!exists) {
               knex.schema.createTable(tableName, table =>{
                    table.increments('id').primary()
                    table.string('email')
                    table.string('timestamp')
                    table.string('messanges')
                })
                .then(()=> console.log('Tabla creada.'))
                .catch(err=> {console.log(err); throw err})
                .finally(() =>{
                    knex.destroy();
                })

                knex(tableName).insert(obj)
                .then(()=> console.log('Conversación agregada'))
                .catch(err=> {console.log(err); throw err})
                .finally(() =>{
                    knex.destroy();
                })                
            }else{
                knex(tableName).insert(obj)
                .then(()=> console.log('Conversación agregada'))
                .catch(err=> {console.log(err); throw err})
                .finally(() =>{
                    knex.destroy();
                })
            }
          });

    }
}

const chat = new Chat();
module.exports = chat;