import * as D from 'io-ts/lib/Decoder';
import { Response } from 'express';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/function';

interface SimpleObject {
  [key: string]: any;
}

const validate = <T, A>(decoder: D.Decoder<T, A>, object: T, errorMessage: string) => {
  return pipe(
    decoder.decode(object),
    fold(
      errors => {
        console.log(`${errorMessage} ${D.draw(errors)}`);
        throw `${errorMessage} ${D.draw(errors)}`;
      },
      () => {}
    )
  );
};

export const validateRequest = <T, A>(decoder: D.Decoder<T, A>, object: T) => {
  validate(decoder, object, 'Error validating request:');
};

export const validateResponse = <T, A>(decoder: D.Decoder<T, A>, object: T) => {
  validate(decoder, object, 'Error validating response:');
};

export const assignResValidatorValues = (res: Response, data: SimpleObject, decoder: D.Decoder<unknown, object>) => {
  res.locals.responseData = data;
  res.locals.decoder = decoder;
};
