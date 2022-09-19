import ProductsMemoryDao from './productos/productosDaoMem.js';
import CartsMemoryDao from './carritos/carritosDaoMem.js';     
import ChatsMemoryDao from './chat/chatsDaoMem.js';         

import ProductsFileDao from './productos/productosDaoArchivo.js'; 
import CartsFileDao from './carritos/carritosDaoArchivo.js';      

// MARIADB Y SQLITE3
import { knexMariaDB } from '../Config/mariaDB.js';
import { knexSQLite } from '../Config/mySqlite3.js';
import ClientDB from '../clientDB.js';
import { createTableChat } from '../createTableChat.js';
import { createTableProducts } from '../createTableProducts.js';

//MONGODB 
import ProductsMongoDBDao from './productos/productosDaoMongoDb.js'; 
import CartsMongoDBDao from './carritos/carritosDaoMongoDb.js';      
import ChatsMongoDBDao from './chat/chatsDaoMongoDb.js';             
import { connectMongo } from '../DB/mongoDB/mongoDb.js';

//FIREBASE 
import ProductsFirebaseDao from './productos/productosDaoFirebase.js'; 
import CartsFirebaseDao from './carritos/carritosDaoFirebase.js';      
import ChatsFirebaseDao from './chat/chatsDaoFirebase.js';            
import { config } from '../Config/config.js';
import ChatsFileDao from './chat/chatsDaoArchivo.js';

let products;
let carts;
let chat;

switch (config.useDB) {
    case 'mongodb':
        connectMongo();
        products = new ProductsMongoDBDao();  
        carts = new CartsMongoDBDao();        
        chat = new ChatsMongoDBDao();         
        break;
    case 'firebase':
        products = new ProductsFirebaseDao(); 
        carts = new CartsFirebaseDao();       
        chat = new ChatsFirebaseDao();        
        break;
    case 'memory':
        products = new ProductsMemoryDao(); 
        carts = new CartsMemoryDao();        
        chat = new ChatsMemoryDao();        
        break;
    case 'mariadb':
        createTableProducts(knexMariaDB);
        createTableChat(knexMariaDB);
        products = new ClientDB(knexMariaDB, "productos");  
        chat = new ClientDB(knexMariaDB, "mensajes");       
        break;
    case 'sqlite3':
        createTableProducts(knexSQLite);
        createTableChat(knexSQLite);
        products = new ClientDB(knexSQLite, "productos");     
        chat = new ClientDB(knexSQLite, "mensajes");        
        break;
    default:
        products = new ProductsFileDao();  
        carts = new CartsFileDao();        
        chat = new ChatsFileDao();         
        break;
}

export { products, carts, chat };
