import { Application, Router, Request, Response, NextFunction } from 'express';
import * as exampleController from '../controllers/example.controller';
import { requestValidator, responseValidator } from '../utils/middleware';
import * as exampleTypes from '../routes/messages/exampleTypes';

export default (app: Application) => {
  var router = Router();
  app.use('/api/examples', router);

  router.post('/', requestValidator(exampleTypes.gatewayCreateExampleRequestDec), exampleController.create);

  router.get('/', requestValidator(exampleTypes.gatewayGetExmaplesRequestDec), exampleController.findAll);

  app.use(responseValidator);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.status(404).send(`Route: ${req.method} ${req.path} cannot be found.`);
  });
};
