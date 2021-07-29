import got from 'got';
import * as exampleTypes from './model';
import { validateRequest, validateResponse } from '../../../../utils/helpers';
import { exampleBcUrl } from '../../../../config';

export const createExamples = async (exampleText: string, userId: number) => {
  const requestBody = { exampleText, userId };
  validateRequest(exampleTypes.bcCreateExampleRequestDec, requestBody);

  const response = await got.post(`${exampleBcUrl}/api/v1/examples`, {
    json: {
      ...requestBody,
    },
  });
  validateResponse(exampleTypes.bcCreateExampleResponseDec, JSON.parse(response.body));
  return JSON.parse(response.body);
};

export const getExamples = async () => {
  const response = await got.get(`${exampleBcUrl}/api/v1/examples`);
  validateResponse(exampleTypes.bcGetExamplesResponseDec, JSON.parse(response.body));
  return JSON.parse(response.body);
};

export const autocompleteExample = async (queryText: string, size?: string) => {
  validateRequest(exampleTypes.bcExampleSuggestionsRequestDec, { query: { queryText, size } });
  const response = await got.get(`${exampleBcUrl}/api/v1/es/example-suggestion`, {
    searchParams: { queryText, size },
  });
  validateResponse(exampleTypes.bcExampleSuggestionsResponseDec, JSON.parse(response.body));
  return JSON.parse(response.body);
};
