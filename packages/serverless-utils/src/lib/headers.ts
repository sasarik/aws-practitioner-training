export const ResponseHeader = Object.freeze({
  Authorization: {
    FieldName: 'Authorization',
  },
  ContentType: Object.freeze({
    FieldName: 'Content-Type',
    AppJSON: Object.freeze({ 'Content-Type': 'application/json' }),
    TextPlain: Object.freeze({ 'Content-Type': 'text/plain' }),
  }),
});
