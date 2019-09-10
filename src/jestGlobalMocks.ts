const createStorageMock = () => {
  let storage = {};
    return {
      getItem: key => key in storage ? storage[key] : null,
      setItem: (key, value) => storage[key] = value || '',
      removeItem: key => delete storage[key],
      clear: () => storage = {},
  };
};

Object.defineProperty(window, 'CSS', {value: null});
Object.defineProperty(window, 'localStorage', {value: createStorageMock()});
Object.defineProperty(window, 'sessionStorage', {value: createStorageMock()});
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => {
    return {
      display: 'none',
      appearance: ['-webkit-appearance'],
      getPropertyValue: (prop) => {
        return '';
      }
    };
  }
});
/**
* ISSUE: https://github.com/angular/material2/issues/7101
* Workaround for JSDOM missing transform property
*/
Object.defineProperty(document.body.style, 'transform', {
    value: () => {
        return {
            enumerable: true,
            configurable: true,
        };
    },
});

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// Workaround for JSDOM missing matchMedia function
Object.defineProperty(window, 'matchMedia', {
    value: query => {
      return {
        matches: false,
        media: query,
        onchange: null,
        addListener: () => '',
        removeListener: () => '',
      };
    }
  });

const WARN_SUPPRESSING_PATTERNS = [
    /Could not find Angular Material core theme/,
    /Could not find HammerJS/,
    ];

    const warn = console.warn;

    Object.defineProperty(console, 'warn', {
     value: (...params: string[]) => {
       if (!WARN_SUPPRESSING_PATTERNS.some((pattern) => pattern.test(params[0]))) {
         warn(...params);
       }
     }
});
