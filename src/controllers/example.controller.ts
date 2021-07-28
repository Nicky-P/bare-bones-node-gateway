import { Request, Response, NextFunction } from 'express';
import { assignResValidatorValues } from '../utils/helpers';
import { gatewayGetExamplesResponseDec, gatewayCreateExampleResponseDec, gatewayEsExampleResponseDec } from '../routes/messages/model';
import * as exampleClient from '../services/remote/example/v1/exampleClient';

export const create = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const responseData = await exampleClient.createExamples(req.body.exampleText, req.body.userId);
      assignResValidatorValues(res, responseData, gatewayCreateExampleResponseDec);
      next();
    } catch (e) {
      console.log(e.message);
      res.status(e.status || 500).send({ code: 'InternalServerError', message: e.message });
    }
  })();
};

export const findAll = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const responseData = await exampleClient.getExamples();
      assignResValidatorValues(res, responseData, gatewayGetExamplesResponseDec);
      next();
    } catch (e) {
      console.log(e.message);
      res.status(e.status || 500).send({ code: 'InternalServerError', message: e.message });
    }
  })();
};

export const autoComplete = (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const responseData = await exampleClient.autocompleteExample(req.query.queryText as string, req.query.size as string);
      assignResValidatorValues(res, responseData, gatewayEsExampleResponseDec);
      next();
    } catch (e) {
      console.log(e.message);
      res.status(e.status || 500).send({ code: 'InternalServerError', message: e.message });
    }
  })();
};
