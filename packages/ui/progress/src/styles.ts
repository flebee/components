import { cva } from 'cva';

export const base = cva({ base: 'flex flex-col gap-2 w-full aria-disabled:opacity-50' });

export const track = cva({
  base: 'z-0 rounded-full relative bg-neutral-300/50 overflow-hidden',
  variants: {
    size: {
      sm: 'h-1',
      md: 'h-3',
      lg: 'h-5'
    }
  }
});

export const indicator = cva({
  base: 'h-full rounded-full transition-all duration-300 ease-linear',
  variants: {
    color: {
      neutral: 'bg-neutral-400',
      primary: 'bg-primary',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger'
    },
    indeterminate: {
      true: 'absolute w-full origin-left animate-indeterminate-bar'
    }
  }
});

export const label = cva({
  base: 'flex justify-between text-main items-center',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }
  }
});
