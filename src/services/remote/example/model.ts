import * as D from 'io-ts/lib/Decoder';
import { pipe } from 'fp-ts/function';

const emptyRequest = D.type({});

const createExampleRequest = D.type({
  exampleText: D.string,
  userId: D.number,
});

const exampleResponse = D.type({
  id: D.number,
  exampleText: D.string,
  createdBy: D.number,
});

export const bcCreateExampleRequestDec = createExampleRequest;
export const bcCreateExampleResponseDec = exampleResponse;

export const bcGetExmaplesRequestDec = emptyRequest;
export const bcGetExamplesResponseDec = D.array(exampleResponse);

export const bcExampleRequestDec = pipe(
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

export const bcExampleResponseDec = D.type({ exampleSuggestions: D.array(D.string) });
