import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import MateriaModel from './MateriaModel';

export default class TurnoModel extends Model {}

TurnoModel.init({
    nombre: Sequelize.STRING(45),
}, { sequelize, modelName: 'turnos', timestamps: false });

TurnoModel.belongsToMany(MateriaModel, { through: 'materias_turnos', foreignKey: 'turno_id' });
MateriaModel.belongsToMany(TurnoModel, { through: 'materias_turnos', foreignKey: 'materia_id' });
