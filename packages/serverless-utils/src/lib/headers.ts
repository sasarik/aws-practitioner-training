export const Response = Object.freeze({
  withAccessControlAllowOrigin: Object.freeze((origin: string) => ({ 'Access-Control-Allow-Origin': origin })),
  ContentType: Object.freeze({
    AppJSON: Object.freeze({ 'Content-Type': 'application/json' }),
    TextPlain: Object.freeze({ 'Content-Type': 'text/plain' }),
  }),
});
