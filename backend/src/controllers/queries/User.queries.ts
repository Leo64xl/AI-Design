import  { getAllUsers } from '../../services/repositories/User.repositorie';
import { Request, Response } from 'express';

export const getAllUsersController = async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: "Error interno del servidor" });
  }
};