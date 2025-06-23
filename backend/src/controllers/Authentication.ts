import Users from '../database/models/User.model'
import { Request, Response } from 'express';
import argon2 from 'argon2';

export const Login = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email
            } 
        });
        if(!user) return res.status(404).json({msg: "Las credenciales son incorrectas"});
        const match = await argon2.verify(user.password, req.body.password);
        if(!match) return res.status(404).json({msg: "Ha ocurrido un error al iniciar sesión"});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const username = user.username;
        const email = user.email;
        const role = user.role;        
        res.status(200).json({ uuid, username, email, role });
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const Logout = async (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: "Error al cerrar sesión" });
        }
        res.status(200).json({ msg: "Sesión cerrada correctamente" });
    });
};

export const Me = async (req: Request, res: Response) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: "No estás autenticado" });
    }
    
    const user = await Users.findOne({
        attributes: ['uuid', 'username', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) {
        return res.status(404).json({ msg: "Usuario no encontrado" });
    }
};