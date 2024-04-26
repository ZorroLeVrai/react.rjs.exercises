import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
// import ResizeObserver from 'resize-observer-polyfill';

// //to fix error with ResizeObserver
// global.ResizeObserver = ResizeObserver;

//To fix error with hasPointerCapture is not a function
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();

//to fix error with the matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});