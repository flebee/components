declare global {
  declare module '@flebee/ui/icon' {
    export interface BeeIconTypes {
      outline: 'carousel-horizontal' | 'settings-pin' | 'user' | string;
      filled: 'carousel-horizontal' | 'user' | string;
    }
  }
}
