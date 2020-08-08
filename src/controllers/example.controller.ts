import { Request, Response, NextFunction } from 'express';
import * as exampleClient from '../services/remote/exampleClient';

export const create = (req: Request, res: Response) => {
  (async () => {
    try {
      const response = await exampleClient.createExamples(req.body.exampleText, req.body.userId);
      res.send(response);
    } catch (error) {
      console.log(error.response.body);
      res.status(500).send({ code: 'InternalServerError', status: 'Error' });
    }
  })();
};

export const findAll = (req: Request, res: Response) => {
  (async () => {
    try {
      const response = await exampleClient.getExamples();
      res.send(response);
    } catch (error) {
      console.log(error.response.body);
      res.status(500).send({ code: 'InternalServerError', status: 'Error' });
    }
  })();
};
