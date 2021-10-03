import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import AsistenciaModel from './AsistenciaModel';

export default class CursoAlumnoModel extends Model {}

CursoAlumnoModel.init({
    alumno_id: { type: Sequelize.INTEGER },
    curso_id: { type: Sequelize.INTEGER },
    fecha_desde: { type: Sequelize.DATE },
    fecha_hasta: { type: Sequelize.DATE },
}, { sequelize, modelName: 'cursos_alumnos', timestamps: true });

CursoAlumnoModel.hasMany(AsistenciaModel, {foreignKey: 'curso_alumno_id'});
AsistenciaModel.belongsTo(CursoAlumnoModel, {foreignKey: 'curso_alumno_id'});
