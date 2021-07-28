import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';

interface SimpleObject {
  [key: string]: any;
}

export const assignResValidatorValues = (res: Response, data: any, decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = data;
  res.locals.decoder = decoder;
};
