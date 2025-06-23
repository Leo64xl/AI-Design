import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../Configuration.db';

export interface UserAttributes {
  uuid: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public uuid!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

User.init(
  {

    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,   
      validate: {
        notEmpty: true,
        len: [3, 100],
        is: /^[a-zA-Z0-9_]+$/i,
      },
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['user', 'admin', 'superadmin']],
      },
    },
  },
  
  {
    sequelize: db,
    tableName: 'users',
    timestamps: true,
    freezeTableName: true,
  }
);

export default User;