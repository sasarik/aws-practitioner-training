// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_) => {
  // TODO Authorization routines
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'My "basicAuthorizer" function executed successfully!',
      },
      null,
      2
    ),
  };
};
