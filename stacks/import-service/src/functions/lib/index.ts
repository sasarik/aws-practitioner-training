import { isString } from '@powwow-js/core';
import { validationError } from '@aws-practitioner-training/serverless-utils';

export function assertFileNameIsValid(fileName: unknown): asserts fileName is string {
  if (!fileName || !isString(fileName))
    throw validationError(`Expect to have a string fileName provided, but got ${fileName}`);
}
