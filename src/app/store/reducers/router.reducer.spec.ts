/// <reference types="jest" />
import { RouterStateSnapshot } from '@angular/router';

import { CustomRouterStateSerializer } from './router.reducer';

describe('CustomRouterStateSerializer', () => {
  let serializer: CustomRouterStateSerializer;

  beforeEach(() => {
    serializer = new CustomRouterStateSerializer();
  });

  it('should match snaphot when has URL only', () => {
    const request = {
      url: 'this-is-url',
      root: {
        queryParams: {},
        firstChild: {
          firstChild: null,
          params: {}
        }
      }
    } as RouterStateSnapshot;

    expect(serializer.serialize(request)).toMatchSnapshot();
  });

  it('should return route and query params', () => {
    const request = {
      url: 'this-is-url',
      root: {
        queryParams: {
          param1: 'val1',
          param2: 'val2'
        },
        firstChild: {
          firstChild: {
            firstChild: {
              firstChild: null,
              params: {
                param1: 'val1',
                param2: 'val2'
              }
            }
          }
        }
      }
    } as any;

    expect(serializer.serialize(request)).toMatchSnapshot();
  });
});
