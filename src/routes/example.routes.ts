import { Application, Router, Request, Response, NextFunction } from 'express';
import * as exampleController from '../controllers/example.controller';
import { requestValidator, responseValidator, structureRequest } from '../utils/middleware';
import * as exampleTypes from './messages/model';

export default (app: Application) => {
  var router = Router();

  app.use(structureRequest);

  app.use('/api', router);

  router.post('/v1/examples/', requestValidator(exampleTypes.gatewayCreateExampleRequestDec), exampleController.create);

  router.get('/v1/examples/', requestValidator(exampleTypes.gatewayGetExmaplesRequestDec), exampleController.findAll);

  router.get('/v1/es/example-suggestion', requestValidator(exampleTypes.gatewayEsExampleRequestDec), exampleController.autoComplete);

  app.use(responseValidator);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send(`Route: ${req.method} ${req.path} cannot be found.`);
  });
};
