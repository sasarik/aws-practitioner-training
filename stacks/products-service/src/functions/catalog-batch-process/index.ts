import { buildLambdaHandlerPath } from '@helpers/common';

export const catalogBatchProcess = {
  handler: buildLambdaHandlerPath(__dirname),
  events: [
    {
      sqs: {
        batchSize: 5,
        arn: {
          'Fn::Join': [
            ':',
            [
              'arn',
              'aws',
              'sqs',
              { Ref: 'AWS::Region' },
              { Ref: 'AWS::AccountId' },
              `${process.env.PRODUCTS_IMPORT_SQS_QUEUE_NAME}`,
            ],
          ],
        },
      },
    },
  ],
  description: 'Iterate over income SQS messages and create corresponding products in the products table',
};
