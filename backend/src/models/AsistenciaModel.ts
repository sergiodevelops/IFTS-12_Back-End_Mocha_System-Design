import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class AsistenciaModel extends Model {}

AsistenciaModel.init({
    curso_alumno_id: { type: Sequelize.INTEGER },
    fecha_asistencia: { type: Sequelize.DATE },
    tipo_asistencia: { type: Sequelize.ENUM, values: ['presente', 'ausente'] },
}, { sequelize, modelName: 'asistencias', timestamps: true });
