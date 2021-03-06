import got from 'got';
import * as exampleTypes from './model';
import { validateRequest, validateResponse } from '../../../utils/validationHelper';
import { response } from 'express';

export const createExamples = async (exampleText: string, userId: number) => {
  const requestBody = { exampleText, userId };
  validateRequest(exampleTypes.bcCreateExampleRequestDec, requestBody);

  const response = await got.post('http://localhost:8080/api/examples', {
    json: {
      ...requestBody,
    },
  });
  validateResponse(exampleTypes.bcCreateExampleResponseDec, JSON.parse(response.body));
  return response.body;
};

export const getExamples = async () => {
  const response = await got.get('http://localhost:8080/api/examples');
  validateResponse(exampleTypes.bcGetExamplesResponseDec, JSON.parse(response.body));
  return response.body;
};

export const autocompleteExample = async (queryText: string, size?: string) => {
  validateRequest(exampleTypes.bcExampleRequestDec, { query: { queryText, size } });
  const response = await got.get('http://localhost:8080/api/examples/es/example-suggestion', {
    searchParams: { queryText, size },
  });
  validateResponse(exampleTypes.bcExampleResponseDec, JSON.parse(response.body));
  return response.body;
};
