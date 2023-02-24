const REGION = 'eu-west-1';
const API_ID = '3ee91ql685';
const STAGE = 'dev';
const API_GATEWAY = `https://${API_ID}.execute-api.${REGION}.amazonaws.com/${STAGE}`;

export const apiRoutes = {
  productsService: () => `${API_GATEWAY}/products`,
  productById: (productId: string) => `${API_GATEWAY}/products/${productId}`,
};
