import { isString } from '@powwow-js/core';
import { validationError } from '@aws-practitioner-training/serverless-utils';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { Readable } from 'stream';

export function assertFileNameIsValid(fileName: unknown): asserts fileName is string {
  if (!fileName || !isString(fileName))
    throw validationError(`Expect to have a string fileName provided, but got ${fileName}`);
}

export const asStream = (response: GetObjectCommandOutput) => {
  return response.Body as Readable;
};
