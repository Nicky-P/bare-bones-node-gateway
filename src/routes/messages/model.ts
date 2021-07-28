import * as D from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/function';

const emptyRequest = D.type({});

const createExampleRequest = D.type({
  body: D.type({
    exampleText: D.string,
    userId: D.number,
  }),
});

const exampleResponse = D.type({
  id: D.number,
  exampleText: D.string,
  createdBy: D.number,
});

export const gatewayEsExampleRequestDec = pipe(
  D.type({
    query: D.type({
      queryText: D.string,
    }),
  }),
  D.intersect(
    D.partial({
      size: D.string,
    })
  )
);
export const gatewayEsExampleResponseDec = D.type({ exampleSuggestions: D.array(D.string) });

export const gatewayCreateExampleRequestDec = createExampleRequest;
export const gatewayCreateExampleResponseDec = exampleResponse;

export const gatewayGetExmaplesRequestDec = emptyRequest;
export const gatewayGetExamplesResponseDec = D.array(exampleResponse);
