import { rest } from 'msw';
import API_PATHS from '~/constants/apiPaths';
import { orders } from '~/mocks/data';

export const handlers = [
  // TODO del then
  // rest.get(`${API_PATHS.order}/order`, (_req, res, ctx) => {
  //   return res(ctx.status(200), ctx.delay(), ctx.json<Order[]>(order));
  // }),
  rest.put(`${API_PATHS.order}/order`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.get(`${API_PATHS.order}/order/:id`, (req, res, ctx) => {
    const order = orders.find((p) => p.id === req.params.id);
    if (!order) {
      return res(ctx.status(404));
    }
    return res(ctx.status(200), ctx.delay(), ctx.json(order));
  }),
  rest.delete(`${API_PATHS.order}/order/:id`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
  rest.put(`${API_PATHS.order}/order/:id/status`, (_req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
