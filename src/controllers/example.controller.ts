import { Request, Response } from 'express';
import * as exampleClient from '../services/remote/example/exampleClient';

export const create = (req: Request, res: Response) => {
  (async () => {
    try {
      const response = await exampleClient.createExamples(req.body.exampleText, req.body.userId);
      res.send(response);
    } catch (error) {
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
      res.status(500).send({ code: 'InternalServerError', status: 'Error' });
    }
  })();
};

export const autoComplete = (req: Request, res: Response) => {
  (async () => {
    try {
      const response = await exampleClient.autocompleteExample(req.query.queryText as string, req.query.size as string);
      res.send(response);
    } catch (error) {
      res.status(500).send({ code: 'InternalServerError', status: 'Error' });
    }
  })();
};
