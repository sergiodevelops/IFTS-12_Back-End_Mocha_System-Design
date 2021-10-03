import express from 'express';
import { successResponse, errorResponse } from '../valueObject/response';
import CorrelativaModel from '../models/CorrelativaModel';

export default class CorrelativaController {
    constructor() {}
    
    public async create(req: express.Request, res: express.Response) {
        const carreraMateriaId = req.params.carreraMateriaId;
        const collection = req.body;

        const query = {
            where: {
                carrera_materia_id: carreraMateriaId
            }
        }
        await CorrelativaModel.destroy(query)
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)))

        if (Object.entries(collection).length !== 0 || collection.length !== 0) {
            CorrelativaModel.bulkCreate(collection)
            .then(collection => res.status(201).json(successResponse(collection)))
            .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
        } else res.status(201).json(successResponse([]));
    };
}
