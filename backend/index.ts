import express from 'express';
import sessions from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import SequelizeStore from 'connect-session-sequelize';
import db from './src/database/Configuration.db';
import { PORT } from './src/config/Configuration.app';
import Authentication from './src/routes/Authentication';
import Users from './src/routes/Users';

dotenv.config();

const app = express(); 

const sessionStore = SequelizeStore(sessions.Store);

const store = new sessionStore({ 
    db: db,
});

//(async() => {
//   await db.sync();
//}) (); 

app.use(sessions( {
    secret: process.env.SESSION_SECRET || (() => { throw new Error('SESSION_SECRET is not defined'); })(),
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Authentication);
app.use(Users);

//store.sync();

app.listen(process.env.APP_PORT || PORT, () => {
    console.log(`Servidor ejecutándose en el puerto: ` + (process.env.APP_PORT || PORT));
});
