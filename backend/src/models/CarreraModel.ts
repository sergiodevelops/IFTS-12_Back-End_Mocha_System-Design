import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import MateriaModel from './MateriaModel';
import CarreraMateriaModel from './CarreraMateriaModel';

export default class CarreraModel extends Model {}

CarreraModel.init({
    nombre: Sequelize.STRING(45),
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE
}, { sequelize, modelName: 'carreras', timestamps: true });

CarreraModel.hasMany(CarreraMateriaModel, {foreignKey: 'carrera_id'});
CarreraMateriaModel.belongsTo(CarreraModel, {foreignKey: 'carrera_id'});
