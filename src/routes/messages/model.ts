import * as D from 'io-ts/lib/Decoder';

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

export const gatewayCreateExampleRequestDec = createExampleRequest;
export const gatewayCreateExampleResponseDec = exampleResponse;

export const gatewayGetExmaplesRequestDec = emptyRequest;
export const gatewayGetExamplesResponseDec = D.array(exampleResponse);
