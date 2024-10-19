declare global {
  declare module '@flebee/ui/icon' {
    export interface BeeIconTypes {
      outline: 'brand-github' | 'carousel-horizontal' | 'settings-pin' | 'user' | NonNullable<unknown>;
      filled: 'carousel-horizontal' | 'user' | NonNullable<unknown>;
      brand: 'flebee';
    }
  }
}
