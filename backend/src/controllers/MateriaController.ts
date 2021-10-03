import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import MateriaModel from '../models/MateriaModel';
import TurnoModel from '../models/TurnoModel';
import BaseController from './BaseController';
import MateriaTurnoModel from '../models/MateriaTurnoModel';
import CarreraMateriaModel from '../models/CarreraMateriaModel';

export default class MateriaController extends BaseController {
    constructor() {
        super(MateriaModel);
    }

    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        MateriaModel.findByPk(id, {
            include: [                
                TurnoModel,                                
            ],
        })
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();
        object.estado = 'activo';

        const response = await MateriaModel.create(object, { validate: true })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));

        const collection = object.turnos.map((element: any) => { return {turno_id: element.turno_id, materia_id: response.get('id')}});
        
        MateriaTurnoModel.bulkCreate(collection, {ignoreDuplicates: true})
        .then(collection => res.status(201).json(successResponse(response)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const materiaFieldsUpdate = req.body;
        
        if (req.body.nombre) materiaFieldsUpdate.nombre = req.body.nombre;
        if (req.body.duracion) materiaFieldsUpdate.duracion = req.body.duracion;
        
        if (req.body.estado) {
            materiaFieldsUpdate.estado = req.body.estado;
            materiaFieldsUpdate.fecha_estado = new Date();
        }
    
        const query = {
            where: {
                materia_id: id
            }
        }
    
        MateriaTurnoModel.destroy(query)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
    
        const collection = req.body.turnos.map((element: any) => {return {materia_id: id, turno_id: element.turno_id}});
        
        MateriaTurnoModel.bulkCreate(collection, {ignoreDuplicates: true})
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    
        MateriaModel.update(
            materiaFieldsUpdate,
            { where: { id }, validate: true },
        )
        .then(async (materia) => {        
            if (! materia[0]) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
            else {
                const materiaEntity = await MateriaModel.findByPk(id);
                if (! materiaEntity) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
    
                res.status(200).json(successResponse({materiaEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const materiaFieldsUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }

        const queryExistCarreraMateria = {
            where: {
                materia_id: id,
                estado: 'activo'
            }
        }

        const existCarreraMateria = await CarreraMateriaModel.findOne(queryExistCarreraMateria)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
        
        if (existCarreraMateria) res.status(400).send(errorResponse(400, Error("Carrera materia vigente")))
        else {
            MateriaModel.update(
                materiaFieldsUpdate,
                { where: { id }, validate: true}
            )
            .then((materia) => {
                if (! materia[0]) res.status(400).send(errorResponse(400, Error('Materia no encontrada')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
