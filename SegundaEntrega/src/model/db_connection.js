const mongoose = require('mongoose');
const {Sequelize} = require('sequelize');

const mongoConnection = async () => {
    //const CS = '';
    try {
        await mongoose.connect(CS);
        console.log("Conexión a base de datos mongodb establecida");
    } catch (error) {
        console.log("Ocurrió un error al conectarse a la base de datos de mongodb", error);
    };
};



const mysqlConnection = async () => {
    const sequelize = new Sequelize('ecommerce', 'root', '', {
        host: 'localhost',
        dialect: 'mariadb',
        password: '',
        logging: false
    });

    try {
        await sequelize.authenticate();
        console.log("Conexión a base de datos mysql establecida");
    } catch (error) {
        console.log("Ocurrió un error al conectarse a la base de datos de mysql", error)
    }
}

module.exports = { mongoConnection, mysqlConnection };