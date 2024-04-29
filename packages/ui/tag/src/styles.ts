import { cva } from 'cva';

export const tag = cva({
  base: 'relative max-w-fit min-w-min inline-flex items-center border-[0.5px] justify-between whitespace-nowrap rounded-full',
  variants: {
    size: {
      sm: 'px-2 h-6 text-xs',
      md: 'px-3 h-7 text-sm',
      lg: 'px-4 h-8 text-base'
    },
    color: {
      neutral: 'bg-neutral-50/70 text-neutral-700 border-neutral',
      primary: 'bg-primary-50/70 text-primary-700 border-primary',
      success: 'bg-success-50/70 text-success-700 border-success',
      warning: 'bg-warning-50/70 text-warning-700 border-warning',
      danger: 'bg-danger-50/70 text-danger-700 border-danger'
    }
  }
});
