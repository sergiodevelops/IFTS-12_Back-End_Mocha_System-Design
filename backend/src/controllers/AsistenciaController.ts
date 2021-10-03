import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import BaseController from './BaseController';
import AsistenciaModel from '../models/AsistenciaModel';

export default class AsistenciaController extends BaseController {
    constructor() {
        super(AsistenciaModel);
    }

    public async createBulk(req: express.Request, res: express.Response) {
        const collection = req.body;
                
        AsistenciaModel.bulkCreate(collection, { validate: true })
        .then(model => res.status(201).json(successResponse(model)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };  
}
