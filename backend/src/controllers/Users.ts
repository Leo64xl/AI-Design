import Users from '../database/models/User.model';
import { Request, Response } from 'express';
import argon2 from 'argon2';
import crypto from 'crypto';

export const getUsers = async (req: Request, res: Response) => {
    try { 
        const response = await Users.findAll({
            attributes: ['uuid', 'username', 'email', 'role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await Users.findOne({
            attributes: ['uuid', 'username', 'email', 'role'],
            where: { uuid: req.params.id }
        });
        if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const createUser = async (req: Request, res: Response) => {
    
    const { username, email, password, confPassword, role } = req.body;
   
    // Validacion de campos

    if(!username || !email || !password || !confPassword ) return res.status(400).json({ msg: "Todos los campos son obligatorios" });

    if(password === "" || password === null) return res.status(400).json({ msg: "La contraseña no puede estar vacía" });

    if(password.length < 8) return res.status(400).json({ msg: "La contraseña debe tener al menos 8 caracteres" });
    
    if(password !== confPassword) return res.status(400).json({ msg: "Las contraseñas no coinciden"});

    if(username.length < 3 || username.length > 100) return res.status(400).json({ msg: "El nombre de usuario debe tener entre 3 y 100 caracteres" });

    if(!/^[a-zA-Z0-9_]+$/.test(username)) return res.status(400).json({ msg: "El nombre de usuario solo puede contener letras, números y guiones bajos" });

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return res.status(400).json({ msg: "El correo electrónico no es válido" }); 
    
    if(!['user', 'admin', 'superadmin'].includes(role)) return res.status(400).json({ msg: "Ha ocurrido un Error'" });
  
    const hashedPassword = await argon2.hash(password);
    try {
        await Users.create({
            uuid: crypto.randomUUID(),
            username: username, 
            email: email,
            password: hashedPassword, 
            role: role || 'user' 
        });
        res.status(201).json({ msg: "Usuario creado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error al crear el usuario" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const user = await Users.findOne({
        where: { uuid: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    const { username, email, password, confPassword, role } = req.body;
    
    let hashedPassword;
   
    if (password) {
         if (password.length < 8) return res.status(400).json({ msg: "La contraseña debe tener al menos 8 caracteres" });
         if (password !== confPassword) return res.status(400).json({ msg: "Las contraseñas no coinciden" });
          hashedPassword = await argon2.hash(password);
    } else {
     hashedPassword = user.password;
    }
   
    if(username.length < 3 || username.length > 100) return res.status(400).json({ msg: "El nombre de usuario debe tener entre 3 y 100 caracteres" });

    if(!/^[a-zA-Z0-9_]+$/.test(username)) return res.status(400).json({ msg: "El nombre de usuario solo puede contener letras, números y guiones bajos" });

    if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return res.status(400).json({ msg: "El correo electrónico no es válido" }); 
    
    if(!['user', 'admin', 'superadmin'].includes(role)) return res.status(400).json({ msg: "Ha ocurrido un Error" });
    
    try {
        await Users.update({
            username: username,
            email: email,
            password: hashedPassword,
            role: role 
        }, {
            where: { uuid: user.uuid }
        });
        res.status(200).json({ msg: "Usuario actualizado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error al actualizar el usuario" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const user = await Users.findOne({
        where: { uuid: req.params.id }
    });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    try {
        await Users.destroy({
            where: { uuid: user.uuid }
        });
        res.status(200).json({ msg: "Usuario eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: "Error al eliminar el usuario" });
    }
};