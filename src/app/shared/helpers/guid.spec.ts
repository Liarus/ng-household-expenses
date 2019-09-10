import { Guid } from './guid';

describe('Guid', () => {
  it('should return GUID', () => {
    const actual = Guid.newGuid();

    expect(actual).toBeDefined();
    expect(actual.length).toEqual(36);
    expect(actual.match(
      '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
    ))
    .toBeTruthy();
  });
});
