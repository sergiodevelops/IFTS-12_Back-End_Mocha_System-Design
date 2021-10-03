import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CarreraMateriaModel from './CarreraMateriaModel';

export default class MateriaModel extends Model {}

MateriaModel.init({
    nombre: Sequelize.STRING(45),
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE
}, { sequelize, modelName: 'materias', timestamps: true });

MateriaModel.hasMany(CarreraMateriaModel, {foreignKey: 'materia_id'});
CarreraMateriaModel.belongsTo(MateriaModel, {foreignKey: 'materia_id'});
