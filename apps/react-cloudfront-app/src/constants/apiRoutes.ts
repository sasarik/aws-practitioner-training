const HTTP_PRODUCTS_API_GATEWAY = 'https://1zqt81q62j.execute-api.eu-west-1.amazonaws.com';
const HTTP_PRODUCTS_IMPORT_API_GATEWAY = 'https://dtu7p3ri43.execute-api.eu-west-1.amazonaws.com';
const HTTP_CART_SERVICE_API_GATEWAY = 'https://p4z4jg9hje.execute-api.eu-west-1.amazonaws.com'; // Api Gateway to EBS EC2 cart service
// const HTTP_CART_SERVICE_API_GATEWAY = 'https://3ce9f8ld0d.execute-api.eu-west-1.amazonaws.com'; // cart service as Lambda
// const HTTP_CART_SERVICE_API_GATEWAY = 'http://localhost:3000';

export const apiRoutes = {
  // Products
  productsService: () => `${HTTP_PRODUCTS_API_GATEWAY}/products`,
  productById: (productId: string) => `${HTTP_PRODUCTS_API_GATEWAY}/products/${productId}`,
  productFileImport: () => `${HTTP_PRODUCTS_IMPORT_API_GATEWAY}/import`,
  // Carts
  cartsService: () => `${HTTP_CART_SERVICE_API_GATEWAY}/api/carts`,
  getUserCart: (userId: string) => `${HTTP_CART_SERVICE_API_GATEWAY}/api/carts?userId=${userId}`,
  checkout: () => `${HTTP_CART_SERVICE_API_GATEWAY}/api/carts/checkout`,
  // Orders
  getUserOrders: (userId: string) => `${HTTP_CART_SERVICE_API_GATEWAY}/api/orders?userId=${userId}`,
  orderById: (orderId: string) => `${HTTP_CART_SERVICE_API_GATEWAY}/api/orders/${orderId}`,
  orderStatusById: (orderId: string) => `${HTTP_CART_SERVICE_API_GATEWAY}/api/orders/${orderId}/status`,
};
