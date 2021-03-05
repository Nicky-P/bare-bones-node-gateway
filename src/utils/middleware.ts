import { RequestHandler } from 'express';
import * as D from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { ParamsDictionary } from 'express-serve-static-core';
import { Request, Response, NextFunction } from 'express';

export const structureRequest = (req: Request, res: Response, next: NextFunction) => {
  res.locals.structuredRequest = {
    body: req.body,
    query: req.query,
    params: req.params,
  };
  next();
};

export const requestValidator: <T, A>(decoder: D.Decoder<T, A>) => RequestHandler<ParamsDictionary, any, T> = decoder => (req, res, next) => {
  return pipe(
    decoder.decode(res.locals.structuredRequest),
    fold(
      errors => res.status(400).send({ code: 'BadArgument', status: 'error', error: D.draw(errors) }),
      () => next()
    )
  );
};

export const responseValidator = (req: Request, res: Response, next: NextFunction) => {
  const decoder: D.Decoder<unknown, string> = res.locals.decoder;

  if (!decoder) next();

  return pipe(
    decoder.decode(res.locals.responseData),
    fold(
      errors => res.status(500).send({ code: 'InternalServerError', status: 'error', error: D.draw(errors) }),
      decodedResp => res.send(JSON.parse(JSON.stringify(decodedResp)))
    )
  );
};
