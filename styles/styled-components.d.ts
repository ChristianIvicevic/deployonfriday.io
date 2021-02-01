import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    readonly fonts: {
      readonly primary: string;
      readonly secondary: string;
      readonly tertiary: string;
    };
  }
}
