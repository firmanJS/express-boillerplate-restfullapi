const { jsonParse } = require('./pagination')

/* eslint-disable no-undef */
describe('helpers custom testing ', () => {
  it('jsonParse', () => {
    expect(jsonParse('{string}')).toBe('string');
  })
})
