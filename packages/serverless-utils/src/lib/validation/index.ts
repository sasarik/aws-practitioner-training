import { isNumber } from '@powwow-js/core';
import { AvailableProduct } from '../schemas';

export class ValidationError extends Error {}

export const validationError = (message: string): ValidationError => new ValidationError(message);

export function assertNotEmptyString(valueName: string, value: unknown): asserts value is NonNullable<string> {
  if (!value) {
    throw validationError(`Expect to have a "${valueName}" defined, but got nothing`);
  }
}

export function assertProductIsValid(product: Record<string, unknown>): asserts product is AvailableProduct {
  if (!product) {
    throw validationError('Expect to have a product defined, but got nothing');
  }

  if (!product.title) {
    throw validationError('Expect to have a product.title defined, but got nothing');
  }

  if (!product.price || !isNumber(product.price) || product.price < 0) {
    throw validationError(`Expect to have a product.price defined as number correctly, but got [${product.price}]`);
  }

  if (product.count && (!Number.isInteger(product.count) || product.count < 0)) {
    throw validationError(`Expect to have a product.count defined as integer correctly, but got [${product.count}]`);
  }
}
