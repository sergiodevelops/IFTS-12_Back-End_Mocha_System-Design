import express from 'express';
import sequelize from '../configuration';
import { QueryTypes, Op } from 'sequelize';
import { successResponse, errorResponse } from '../valueObject/response';
import BaseController from './BaseController';
import EvaluacionModel from '../models/EvaluacionModel';
import CursoAlumnoModel from '../models/CursoAlumnoModel';
import CursoModel from '../models/CursoModel';

export default class EvaluacionController extends BaseController {
    constructor() {
        super(EvaluacionModel);
    }

    public async createBulk(req: express.Request, res: express.Response) {
        const collection = req.body;
        let checkCorrelativas = true;
        
        for await (let evaluacion of collection) {
            const cursoAlumno: any = await CursoAlumnoModel.findByPk(evaluacion.curso_alumno_id, {include: CursoModel});
            if (evaluacion.tipo_evaluacion == 'final') {
                const checkCorrelativasFinales = await EvaluacionController.checkCorrelativasFinalesByCursoAlumno(cursoAlumno.curso.carrera_materia_id, cursoAlumno.alumno_id);
                
                if (!checkCorrelativasFinales) checkCorrelativas = false;

                const checkFinalCursoAlumno = await EvaluacionModel.findOne({where: { curso_alumno_id: evaluacion.curso_alumno_id, tipo_evaluacion: 'final', nota: {[Op.gte]: 4}}});
                if (checkFinalCursoAlumno) checkCorrelativas = false;
            }
        };
        
        if (checkCorrelativas) {
            EvaluacionModel.bulkCreate(collection, { validate: true })
            .then(model => res.status(201).json(successResponse(model)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        } else res.status(400).send(errorResponse(400, Error('Debe finales por rendir o ya existe el final aprobado')));
    };

    private static getQueryStringCorrelativas() {
        return `
            SELECT 
                correlativa_id 
            FROM correlativas 
            WHERE carrera_materia_id = ?;          
        `;
    }

    private static async checkCorrelativasFinalesByCursoAlumno(carreraMateriaId: number, alumnoId: number) {
        const queryStringCorrelativas = EvaluacionController.getQueryStringCorrelativas();
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

        const queryStringCorrelativasFinales = EvaluacionController.getQueryStringCorrelativasFinales();

        const evaluacionesCorrelativas = await sequelize.query(queryStringCorrelativasFinales,
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

    private static getQueryStringCorrelativasFinales() {
        return `
            SELECT 
                cursos.id as curso,
                carreras_materias.id as carrera_materia_id,
                carreras.nombre as carrera,
                materias.nombre as materia,
                -- evaluaciones.id as evaluacion_id, 
                evaluaciones.tipo_evaluacion as evaluacion_tipo, 
                evaluaciones.nota as nota_final
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
            AND evaluaciones.nota >= 4 AND evaluaciones.tipo_evaluacion = 'final'
            GROUP BY 
                cursos.id;           
        `;
    }
}
