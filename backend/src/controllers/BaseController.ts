import express from 'express';
import { Model, ModelCtor } from "sequelize/types";
import { successResponse, errorResponse } from '../valueObject/response';

export default class BaseController {
    static baseModel: ModelCtor<Model<any, any>>;

    constructor(model: ModelCtor<Model<any, any>>) {
        BaseController.baseModel = model;
    }

    public async create(req: express.Request, res: express.Response) {
        const object = req.body;
        
        object.fecha_estado = new Date();
        object.estado = 'activo';
        
        BaseController.baseModel.create(object, { validate: true })
        .then(model => res.status(201).json(successResponse(model)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async list(req: express.Request, res: express.Response) {
        const query = {
            where: {
                estado: 'activo'
            }
        }

        BaseController.baseModel.findAll(query)
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async read(req: express.Request, res: express.Response) {
        const id = req.params.id;
        BaseController.baseModel.findByPk(id)
        .then(model => {
            if (! model) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else res.status(200).json(successResponse({model}));
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async update(req: express.Request, res: express.Response) {
        const id = req.params.id;
        const objectFieldUpdate = req.body;
    
        BaseController.baseModel.update(
            objectFieldUpdate,
            { where: { id }, validate: true },
        )
        .then(async(object) => {        
            if (! object[0]) res.status(400).send(errorResponse(400, Error('No encontrado')));
            else {
                const objectEntity = await BaseController.baseModel.findByPk(id);
                if (! objectEntity) res.status(400).send(errorResponse(400, Error('No encontrado')));
    
                res.status(200).json(successResponse({objectEntity}));
            }
        })
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
    
    public async delete(req: express.Request, res: express.Response) {
        const id = req.params.id;
    
        const objectFieldUpdate = {
            estado: 'baja',
            fecha_estado: new Date()
        }
    
        BaseController.baseModel.update(
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
