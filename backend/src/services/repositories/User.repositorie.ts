import User from "../../database/models/User.model"; 

//Consulta de prueba para users

export async function getAllUsers() {
    try {
        const users = await User.findAll({
            attributes: ['uuid', 'username', 'email', 'role']
        });
        return users;
    } catch (error) {
        throw new Error("Error al obtener los usuarios");
    }
};