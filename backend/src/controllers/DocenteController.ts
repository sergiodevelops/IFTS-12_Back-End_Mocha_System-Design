import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import DocenteModel from '../models/DocenteModel';
import BaseController from './BaseController';
import CursoModel from '../models/CursoModel';

export default class DocenteController extends BaseController {
    constructor() {
        super(DocenteModel);
    }
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const docenteFieldsUpdate = req.body;
        
        if (req.body.nombres) docenteFieldsUpdate.nombres = req.body.nombres;
        if (req.body.apellido) docenteFieldsUpdate.apellido = req.body.apellido;
        if (req.body.telefono) docenteFieldsUpdate.telefono = req.body.telefono;
        if (req.body.celular) docenteFieldsUpdate.celular = req.body.celular;
        if (req.body.email) docenteFieldsUpdate.email = req.body.email;
        if (req.body.fecha_ingreso) docenteFieldsUpdate.fecha_ingreso = req.body.fecha_ingreso;
        if (req.body.fecha_ingreso) docenteFieldsUpdate.fecha_ingreso = req.body.fecha_ingreso;
        
        if (req.body.estado) {
            docenteFieldsUpdate.estado = req.body.estado;
            docenteFieldsUpdate.fecha_estado = new Date();
        }
    
        DocenteModel.update(
            docenteFieldsUpdate,
            { where: { id }, validate: true },
        )
        .then(async (docente) => {        
            if (! docente[0]) res.status(400).send(errorResponse(400, Error('Docente no encontrado')));
            else {
                const docenteEntity = await DocenteModel.findByPk(id);
                if (! docenteEntity) res.status(400).send(errorResponse(400, Error('Docente no encontrado')));
    
                res.status(200).json(successResponse({docenteEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
        
        const queryExistCurso = {
            where: {
                docente_id: id,
                fecha_hasta: null
            }
        }

        const existCurso = await CursoModel.findOne(queryExistCurso)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
        
        if (existCurso) res.status(400).send(errorResponse(400, Error("Curso vigente")))
        else {
            const docenteFieldsUpdate = {
                estado: 'baja',
                fecha_estado: new Date()
            }
        
            DocenteModel.update(
                docenteFieldsUpdate,
                { where: { id }, validate: true}
            )
            .then((docente) => {
                if (! docente[0]) res.status(400).send(errorResponse(400, Error('Docente no encontrado')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
