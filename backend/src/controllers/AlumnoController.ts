import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import AlumnoModel from '../models/AlumnoModel';
import BaseController from './BaseController';
import CursoAlumnoModel from '../models/CursoAlumnoModel';

export default class AlumnoController extends BaseController {
    constructor() {
        super(AlumnoModel);
    }
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const alumnoFieldsUpdate = req.body;
        
        if (req.body.nombres) alumnoFieldsUpdate.nombres = req.body.nombres;
        if (req.body.apellido) alumnoFieldsUpdate.apellido = req.body.apellido;
        if (req.body.sexo) alumnoFieldsUpdate.sexo = req.body.sexo;
        if (req.body.telefono) alumnoFieldsUpdate.telefono = req.body.telefono;
        if (req.body.celular) alumnoFieldsUpdate.celular = req.body.celular;
        if (req.body.email) alumnoFieldsUpdate.email = req.body.email;
        if (req.body.fecha_nacimiento) alumnoFieldsUpdate.fecha_nacimiento = req.body.fecha_nacimiento;
        if (req.body.tipo_doc) alumnoFieldsUpdate.tipo_doc = req.body.tipo_doc;
        if (req.body.documento) alumnoFieldsUpdate.documento = req.body.documento;
        if (req.body.domicilio) alumnoFieldsUpdate.domicilio = req.body.domicilio;
        
        if (req.body.estado) {
            alumnoFieldsUpdate.estado = req.body.estado;
            alumnoFieldsUpdate.fecha_estado = new Date();
        }
    
        AlumnoModel.update(
            alumnoFieldsUpdate,
            { where: { id }, validate: true },
        )
        .then(async (alumno) => {        
            if (! alumno[0]) res.status(400).send(errorResponse(400, Error('Alumno no encontrado')));
            else {
                const alumnoEntity = await AlumnoModel.findByPk(id);
                if (! alumnoEntity) res.status(400).send(errorResponse(400, Error('Alumno no encontrado')));
    
                res.status(200).json(successResponse({alumnoEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const alumnoFieldsUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
        
        const queryExistCursoAlumno = {
            where: {
                alumno_id: id,
                fecha_hasta: null
            }
        }

        const existCursoAlumno = await CursoAlumnoModel.findOne(queryExistCursoAlumno)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
        
        if (existCursoAlumno) res.status(400).send(errorResponse(400, Error("Curso Alumno vigente")))
        else {

            AlumnoModel.update(
                alumnoFieldsUpdate,
                { where: { id }, validate: true}
            )
            .then((alumno) => {
                if (! alumno[0]) res.status(400).send(errorResponse(400, Error('Alumno no encontrado')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
