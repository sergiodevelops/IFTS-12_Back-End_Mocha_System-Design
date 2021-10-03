import express from 'express';
import sequelize from '../configuration';
import { QueryTypes } from 'sequelize';
import { successResponse, errorResponse } from '../valueObject/response';
import CursoAlumnoModel from '../models/CursoAlumnoModel';
import BaseController from './BaseController';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import CarreraModel from '../models/CarreraModel';
import MateriaModel from '../models/MateriaModel';
import CursoModel from '../models/CursoModel';
import AlumnoModel from '../models/AlumnoModel';
import DocenteModel from '../models/DocenteModel';

export default class CursoAlumnoController extends BaseController {
    constructor() {
        super(CursoAlumnoModel);
    }

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();

        const curso: any = await CursoModel.findByPk(object.curso_id);
        const checkCorrelativasCursadasAprobadas = await CursoAlumnoController.checkCorrelativasByCursoAlumno(object.carrera_materia_id, object.alumno_id);
        console.log(checkCorrelativasCursadasAprobadas);

        const exist = await CursoAlumnoModel.findAll({where: {
            alumno_id: object.alumno_id,
            curso_id: object.curso_id,
            fecha_hasta: null
        }});

        if (exist.length > 0) res.status(400).send(errorResponse(400, Error("Curso alumno existente")));
        else if (curso.cupo_maximo == curso.cantidad_inscriptos) res.status(400).send(errorResponse(400, Error("El curso llegó al límite de inscriptos")));
        else if (!checkCorrelativasCursadasAprobadas) res.status(400).send(errorResponse(400, Error("Correlativas pendientes")));
        else {
            CursoAlumnoModel.create(object, { validate: true })
            .then(async model => {
                CursoModel.update(
                    { cantidad_inscriptos: curso.cantidad_inscriptos + 1},
                    { where: { id: object.curso_id }, validate: true },
                );

                res.status(201).json(successResponse(model));
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };

    private static async checkCorrelativasByCursoAlumno(carreraMateriaId: number, alumnoId: number) {
        const queryStringCorrelativas = CursoAlumnoController.getQueryStringCorrelativas();
        const correlativas = await sequelize.query(queryStringCorrelativas,
            { replacements: [carreraMateriaId], type: QueryTypes.SELECT })
            .then((resultQuery) => {
                return resultQuery;
            })
            .catch((error: Error) => {
                console.log(error);
                return null;
            });
        if (!correlativas) return false; 

        const queryStringCorrelativasCursada = CursoAlumnoController.getQueryStringCorrelativasCursada();

        const evaluacionesCorrelativas = await sequelize.query(queryStringCorrelativasCursada,
            { replacements: [carreraMateriaId, alumnoId], type: QueryTypes.SELECT })
            .then((resultQuery) => {
                return resultQuery;
            })
            .catch((error: Error) => {
                console.log(error);
                return null;
            });

        if (evaluacionesCorrelativas && evaluacionesCorrelativas.length === correlativas.length) return true;
        else return false;
    }

    private static getQueryStringCorrelativasCursada() {
        return `
            SELECT 
                cursos.id as curso,
                carreras_materias.id as carrera_materia_id,
                carreras.nombre as carrera,
                materias.nombre as materia,
                -- evaluaciones.id as evaluacion_id, 
                evaluaciones.tipo_evaluacion as evaluacion_tipo, 
                AVG(evaluaciones.nota) as nota_promedio
                -- cursos_alumnos.alumno_id
                -- cursos.id as curso_id
            FROM evaluaciones
            INNER JOIN cursos_alumnos ON cursos_alumnos.id = evaluaciones.curso_alumno_id
            INNER JOIN cursos ON cursos.id = cursos_alumnos.curso_id
            RIGHT JOIN carreras_materias on carreras_materias.id = cursos.carrera_materia_id
            INNER JOIN materias on materias.id = carreras_materias.materia_id
            INNER JOIN carreras on carreras.id = carreras_materias.carrera_id
            WHERE carreras_materias.id IN (SELECT correlativa_id FROM correlativas WHERE carrera_materia_id = ?)
            AND (cursos_alumnos.alumno_id = ? OR cursos_alumnos.alumno_id is null)
            AND evaluaciones.nota >= 4 AND evaluaciones.tipo_evaluacion = 'parcial'
            GROUP BY 
                cursos.id;           
        `;
    }

    private static getQueryStringCorrelativas() {
        return `
            SELECT 
                correlativa_id 
            FROM correlativas 
            WHERE carrera_materia_id = ?;          
        `;
    }
    
    public async list(req: express.Request, res: express.Response) {
        let query: any = {
            include: [                
                AlumnoModel,                
                {
                    model: CursoModel,
                    as: 'curso',
                    include: [
                        DocenteModel,
                        {
                            model: CarreraMateriaModel,
                            as: 'carreras_materia',
                            include: [
                                {
                                    model: CarreraModel,
                                    as: 'carrera'
                                },
                                {
                                    model: MateriaModel,
                                    as: 'materia'
                                }                        
                            ]
                        },                     
                    ]
                },
            ],
            where: {
                fecha_hasta: null
            }
        }

        if (req.query.curso_id) {
            query.where['curso_id'] = req.query.curso_id;
        }

        CursoAlumnoModel.findAll(query)
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        CursoAlumnoModel.findByPk(id, {
            include: [                
                AlumnoModel,                
                {
                    model: CursoModel,
                    as: 'curso',
                    include: [
                        DocenteModel,
                        {
                            model: CarreraMateriaModel,
                            as: 'carreras_materia',
                            include: [
                                {
                                    model: CarreraModel,
                                    as: 'carrera'
                                },
                                {
                                    model: MateriaModel,
                                    as: 'materia'
                                }                        
                            ]
                        },                     
                    ]
                },
            ],
        })
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const objectFieldUpdate = req.body;

        CursoAlumnoModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async(object) => {        
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else {
                const objectEntity = await CursoAlumnoModel.findByPk(id);
                if (! objectEntity) res.status(400).send(errorResponse(400, Error('No encontrado')));
    
                res.status(200).json(successResponse({objectEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const objectFieldUpdate = {
            fecha_hasta: new Date()
        }
    
        CursoAlumnoModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true}
        )
        .then((object) => {
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(204).end();
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
