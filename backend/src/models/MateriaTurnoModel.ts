import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class MateriaTurnoModel extends Model {}

MateriaTurnoModel.init({
    turno_id: { type: Sequelize.INTEGER },
    materia_id: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'materias_turnos', timestamps: true });

MateriaTurnoModel.removeAttribute('id');
