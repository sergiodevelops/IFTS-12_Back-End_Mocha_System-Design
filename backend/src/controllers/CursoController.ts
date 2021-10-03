import express from 'express';
import moment from 'moment';
import sequelize from '../configuration';
import { QueryTypes } from 'sequelize';
import { Parser } from 'json2csv';
import { successResponse, errorResponse } from '../valueObject/response';
import CursoModel from '../models/CursoModel';
import BaseController from './BaseController';
import DocenteModel from '../models/DocenteModel';
import CarreraMateriaModel from '../models/CarreraMateriaModel';
import CarreraModel from '../models/CarreraModel';
import MateriaModel from '../models/MateriaModel';
import CursoAlumnoModel from '../models/CursoAlumnoModel';

export default class CursoController extends BaseController {
    constructor() {
        super(CursoModel);
    }

    public async getEvaluaciones(req: express.Request, res: express.Response) {
        const queryString = CursoController.getQueryString();

        await sequelize.query(queryString, { type: QueryTypes.SELECT })
            .then((query) => {
                let csv;
                if (query.length > 0) { 
                    const json2csv = new Parser();
                    csv = json2csv.parse(query);
                } else csv = [];

                const date = moment().format("DD-MM-YYYY-HH-mm-ss");

                res.header('Content-Type', 'text/csv');
                res.attachment(`${date}-reporte.csv`);
                res.status(200).send(csv);
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    }

    public async getEvaluacionesByCurso(req: express.Request, res: express.Response) {
        const cursoId = req.params.id;

        let queryString = CursoController.getQueryString();
        queryString = `${queryString} WHERE cursos.id = ? `;

        await sequelize.query(queryString,
            { replacements: [cursoId], type: QueryTypes.SELECT })
            .then((query) => {
                let csv;
                if (query.length > 0) { 
                    const json2csv = new Parser();
                    csv = json2csv.parse(query);
                } else csv = [];

                const date = moment().format("DD-MM-YYYY-HH-mm-ss");

                res.header('Content-Type', 'text/csv');
                res.attachment(`${date}-reporte.csv`);
                res.status(200).send(csv);
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    }

    private static getQueryString() {
        return `
            SELECT 
                cursos.id as Curso_id, 
                docentes.apellido as Docente_apellido, 
                docentes.nombres as Docente_nombre, 
                carreras.nombre as Carrera, 
                materias.nombre as Materia, 
                alumnos.apellido as Alumno_apellido, 
                alumnos.nombres as Alumno_nombre, 
                evaluaciones.tipo_evaluacion as Tipo_evaluacion, 
                evaluaciones.fecha_evaluacion as Fecha_evaluacion, 
                evaluaciones.nota as Nota, 
                evaluaciones.folio as Folio, 
                evaluaciones.hoja as Hoja
            FROM cursos 
            INNER JOIN carreras_materias ON carreras_materias.id = cursos.carrera_materia_id 
            INNER JOIN docentes ON docentes.id = cursos.docente_id 
            INNER JOIN carreras ON carreras.id = carreras_materias.carrera_id 
            INNER JOIN materias ON materias.id = carreras_materias.materia_id 
            INNER JOIN cursos_alumnos ON cursos_alumnos.curso_id = cursos.id 
            INNER JOIN alumnos ON alumnos.id = cursos_alumnos.alumno_id 
            INNER JOIN evaluaciones ON evaluaciones.curso_alumno_id = cursos_alumnos.id             
        `;
    }

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;

        object.fecha_estado = new Date();

        const exist = await CursoModel.findAll({
            where: {
                carrera_materia_id: object.carrera_materia_id,
                docente_id: object.docente_id,
                fecha_hasta: null
            }
        });

        if (exist.length > 0) res.status(400).send(errorResponse(400, Error("Carrera materia docente existente")));
        else {
            CursoModel.create(object, { validate: true })
                .then(model => res.status(201).json(successResponse(model)))
                .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };

    public async list(req: express.Request, res: express.Response) {
        const query = {
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
            ],
            where: {
                fecha_hasta: null
            }
        }

        CursoModel.findAll(query)
            .then(collection => res.status(200).json(successResponse(collection)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        CursoModel.findByPk(id, {
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
            ],
        })
            .then(model => {
                if (!model) res.status(400).send(errorResponse(400, Error('No encontrado')));
                else res.status(200).json(successResponse({ model }));
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const objectFieldUpdate = req.body;

        CursoModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
            .then(async (object) => {
                if (!object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
                else {
                    const objectEntity = await CursoModel.findByPk(id);
                    if (!objectEntity) res.status(400).send(errorResponse(400, Error('No encontrado')));

                    res.status(200).json(successResponse({ objectEntity }));
                }
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;

        const objectFieldUpdate = {
            fecha_hasta: new Date()
        }

        const queryExistCursoAlumno = {
            where: {
                curso_id: id,
                fecha_hasta: null
            }
        }

        const existCursoAlumno = await CursoAlumnoModel.findOne(queryExistCursoAlumno)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
        
        if (existCursoAlumno) res.status(400).send(errorResponse(400, Error("Curso alumno vigente")))
        else {
            CursoModel.update(
                objectFieldUpdate,
                { where: { id }, validate: true }
            )
            .then((object) => {
                if (!object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
