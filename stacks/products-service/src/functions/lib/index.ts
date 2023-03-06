import type { FromSchema } from 'json-schema-to-ts';
import AvailableProductSchema from './AvailableProductSchema';
import { isNumber } from '@powwow-js/core';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { AttributeValue } from '@aws-sdk/client-dynamodb/dist-types/models';
import { validationError } from '@aws-practitioner-training/serverless-utils';

export type StockDbItem = {
  productId: string;
  count: number;
};

export type ProductDbItem = {
  id: string;
  title: string;
  price: number;
  description: string;
};

export type AvailableProduct = FromSchema<typeof AvailableProductSchema>;

export function assertNotEmpty<T>(valueName: string, value: T): asserts value is NonNullable<T> {
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

export const unmarshallDbItem = (item: Record<string, AttributeValue>) => {
  if (item) {
    return unmarshall(item);
  }
  return item;
};
