import express from 'express';
import BaseController from './BaseController';
import TurnoModel from '../models/TurnoModel';
import { errorResponse, successResponse } from '../valueObject/response';

export default class TurnoController extends BaseController {
    constructor() {
        super(TurnoModel);
    }

    public async list(req: express.Request, res: express.Response) {
        TurnoModel.findAll()
        .then(collection => res.status(200).json(successResponse(collection)))
        .catch((error: Error) => res.status(500).send(errorResponse(500, error)));
    };
}
