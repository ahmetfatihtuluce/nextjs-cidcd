// Bu dosya Jest ve jest-dom tiplerini global olarak tanımlar
// Cypress tipleri ile çakışmayı önler

import "@testing-library/jest-dom";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveAttribute(
        attr: string,
        value?: string | RegExp | jest.AsymmetricMatcher
      ): R;
      toHaveTextContent(text: string | RegExp): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toHaveClass(...classNames: string[]): R;
      toHaveStyle(css: Record<string, unknown>): R;
      toContainElement(element: HTMLElement | null): R;
      toHaveValue(value: string | string[] | number): R;
    }
  }
}
