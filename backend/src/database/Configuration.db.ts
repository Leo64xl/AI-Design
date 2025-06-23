import { Sequelize } from "sequelize";
import { 
    DB_NAME, 
    DB_USER, 
    DB_PASSWORD, 
    DB_HOST, 
    DB_PORT 
} from "../config/Configuration.app";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql',
    logging: false // Desactiva las vistas de las consultas SQL en la consola 
});

db.authenticate()
    .then(() => {
        console.log(`Base de datos: ${DB_NAME} conectada.`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

export default db;
