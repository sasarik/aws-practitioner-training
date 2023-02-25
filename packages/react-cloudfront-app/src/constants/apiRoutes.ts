const HTTP_API_GATEWAY = 'https://3nyabazn94.execute-api.eu-west-1.amazonaws.com';

export const apiRoutes = {
  productsService: () => `${HTTP_API_GATEWAY}/products`,
  productById: (productId: string) => `${HTTP_API_GATEWAY}/products/${productId}`,
};
