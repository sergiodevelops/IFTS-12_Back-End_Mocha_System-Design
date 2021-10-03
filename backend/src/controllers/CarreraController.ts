import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CarreraModel from '../models/CarreraModel';
import BaseController from './BaseController';
import MateriaModel from '../models/MateriaModel';
import CarreraMateriaModel from '../models/CarreraMateriaModel';

export default class CarreraController extends BaseController {
    constructor() {
        super(CarreraModel);
    }
    
    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;

        const query = {
            include: {
                model: CarreraMateriaModel,
                include: [
                    {
                        model: MateriaModel
                    }
                ]
            }
        }

        CarreraModel.findByPk(id, query)
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };

    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const carreraFieldsUpdate = req.body;
        
        if (req.body.nombre) carreraFieldsUpdate.nombre = req.body.nombre;
    
        if (req.body.estado) {
            carreraFieldsUpdate.estado = req.body.estado;
            carreraFieldsUpdate.fecha_estado = new Date();
        }
    
        CarreraModel.update(
            carreraFieldsUpdate,
            { where: { id }, validate: true },
        )
        .then(async (carrera) => {        
            if (! carrera[0]) res.status(400).send(errorResponse(400, Error('Carrera no encontrada')));
            else {
                const carreraEntity = await CarreraModel.findByPk(id);
                if (! carreraEntity) res.status(400).send(errorResponse(400, Error('Carrera no encontrada')));
    
                res.status(200).json(successResponse({carreraEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const carreraFieldsUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
        
        const queryExistCarreraMateria = {
            where: {
                carrera_id: id,
                estado: 'activo'
            }
        }

        const existCarreraMateria = await CarreraMateriaModel.findOne(queryExistCarreraMateria)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))
        
        if (existCarreraMateria) res.status(400).send(errorResponse(400, Error("Carrera materia vigente")))
        else {
            CarreraModel.update(
                carreraFieldsUpdate,
                { where: { id }, validate: true}
            )
            .then((carrera) => {
                if (! carrera[0]) res.status(400).send(errorResponse(400, Error('Carrera no encontrada')));
                else res.status(204).end();
            })
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        }
    };
}
