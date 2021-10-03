import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';

export default class EvaluacionModel extends Model {}

EvaluacionModel.init({
    curso_alumno_id: { type: Sequelize.INTEGER },
    nota: { type: Sequelize.DECIMAL },
    folio: { type: Sequelize.STRING },
    hoja: { type: Sequelize.STRING },
    tipo_evaluacion: { type: Sequelize.ENUM, values: ['parcial', 'final'] },
    fecha_evaluacion: { type: Sequelize.DATE },
}, { sequelize, modelName: 'evaluaciones', timestamps: true });
