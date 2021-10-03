import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CursoAlumnoModel from './CursoAlumnoModel';

export default class CursoModel extends Model {}

CursoModel.init({
    docente_id: { type: Sequelize.INTEGER },
    carrera_materia_id: { type: Sequelize.INTEGER },
    fecha_desde: { type: Sequelize.DATE },
    fecha_hasta: { type: Sequelize.DATE },
    cupo_maximo: { type: Sequelize.INTEGER },
    cantidad_inscriptos: { type: Sequelize.INTEGER },
}, { sequelize, modelName: 'cursos', timestamps: true });

// CursoModel.hasMany(CursoAlumnoModel, {foreignKey: 'id'});
CursoAlumnoModel.belongsTo(CursoModel, {foreignKey: 'curso_id'});
