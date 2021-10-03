import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class UsuarioModel extends Model {}

UsuarioModel.init({
    username: Sequelize.STRING(100),
    password: Sequelize.STRING(255),
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE
}, { sequelize, modelName: 'usuarios', timestamps: true });
