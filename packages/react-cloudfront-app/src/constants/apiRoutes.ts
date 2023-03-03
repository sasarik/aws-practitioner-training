const HTTP_PRODUCTS_API_GATEWAY = 'https://dvwtr13aob.execute-api.eu-west-1.amazonaws.com';
const HTTP_PRODUCTS_IMPORT_API_GATEWAY = 'https://2299slu5aj.execute-api.eu-west-1.amazonaws.com';

export const apiRoutes = {
  productsService: () => `${HTTP_PRODUCTS_API_GATEWAY}/products`,
  productById: (productId: string) => `${HTTP_PRODUCTS_API_GATEWAY}/products/${productId}`,
  productFileUploadUrl: (fileName: string) => `${HTTP_PRODUCTS_IMPORT_API_GATEWAY}/import?fileName=${fileName}`,
};
