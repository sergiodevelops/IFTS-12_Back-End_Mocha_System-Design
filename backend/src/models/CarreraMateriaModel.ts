import sequelize from '../configuration'; 
import Sequelize, { Model } from 'sequelize';
import CursoModel from './CursoModel';
import CorrelativaModel from './CorrelativaModel';

export default class CarreraMateriaModel extends Model {}

CarreraMateriaModel.init({
    carrera_id: { type: Sequelize.INTEGER },
    materia_id: { type: Sequelize.INTEGER },
    estado: Sequelize.ENUM('activo', 'baja'),
    fecha_estado: Sequelize.DATE,
    duracion: Sequelize.ENUM('cuatrimestral', 'anual')
}, { sequelize, modelName: 'carreras_materias', timestamps: true });

CarreraMateriaModel.hasMany(CursoModel, {foreignKey: 'carrera_materia_id'});
CursoModel.belongsTo(CarreraMateriaModel, {foreignKey: 'carrera_materia_id'});

CarreraMateriaModel.belongsToMany(CarreraMateriaModel, { as: 'children', through: 'correlativas', foreignKey: 'correlativa_id' });
CarreraMateriaModel.belongsToMany(CarreraMateriaModel, { as: 'correlativas_carreras_materias', through: 'correlativas', foreignKey: 'carrera_materia_id' });
