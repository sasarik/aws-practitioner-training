const HTTP_PRODUCTS_API_GATEWAY = 'https://1zqt81q62j.execute-api.eu-west-1.amazonaws.com';
const HTTP_PRODUCTS_IMPORT_API_GATEWAY = 'https://dtu7p3ri43.execute-api.eu-west-1.amazonaws.com';

export const apiRoutes = {
  productsService: () => `${HTTP_PRODUCTS_API_GATEWAY}/products`,
  productById: (productId: string) => `${HTTP_PRODUCTS_API_GATEWAY}/products/${productId}`,
  productFileImport: () => `${HTTP_PRODUCTS_IMPORT_API_GATEWAY}/import`,
};
