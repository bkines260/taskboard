const { isValidDueDate } = require('./validators');

describe('isValidDueDate', () => {
  test.each(['2026-11-15', '2028-02-29', '2026-01-01', '2026-12-31'])('accepts %s', (value) => {
    expect(isValidDueDate(value)).toBe(true);
  });

  test.each(['2026-02-30', '2027-02-29', '2026-13-01', '2026-00-10', '2026-04-31'])(
    'rejects impossible date %s',
    (value) => {
      expect(isValidDueDate(value)).toBe(false);
    }
  );

  test.each(['15/11/2026', '20261115', '', '2026-1-5', '2026-11-15T00:00:00Z'])(
    'rejects badly formatted %p',
    (value) => {
      expect(isValidDueDate(value)).toBe(false);
    }
  );

  test.each([20261115, {}, [], true])('rejects non-string %p', (value) => {
    expect(isValidDueDate(value)).toBe(false);
  });
});
