import { cva } from 'cva';

export const button = cva({
  base: 'inline-flex min-w-min relative select-none appearance-none whitespace-nowrap overflow-hidden items-center justify-center font-medium transition duration-200 disabled:opacity-50 enabled:active:scale-95 enabled:hover:bg-opacity-80',
  variants: {
    variant: {
      primary: 'bg-primary text-slate-50',
      secondary: 'bg-primary-100 text-primary-600',
      danger: 'bg-danger-100 text-danger-700',
      warning: 'bg-warning-100 text-warning-700',
      ghost: 'text-primary-700 hover:bg-neutral-50'
    },
    size: {
      sm: 'gap-2 h-9',
      md: 'gap-3 h-10',
      lg: 'gap-3 h-11'
    },
    isInGroup: {
      true: 'rounded-none first:rounded-s-bee-md last:rounded-e-bee-md',
      false: 'rounded-bee-md'
    },
    iconOnly: {
      true: null
    },
    fullWidth: {
      true: 'w-full'
    }
  },
  compoundVariants: [
    { size: 'sm', iconOnly: false, class: 'px-4 text-sm' },
    { size: 'md', iconOnly: false, class: 'px-5 text-md' },
    { size: 'lg', iconOnly: false, class: 'px-5 text-md' },
    { iconOnly: false, fullWidth: false, class: 'w-min' },
    { size: 'sm', iconOnly: true, fullWidth: false, class: 'w-9 text-lg' },
    { size: 'md', iconOnly: true, fullWidth: false, class: 'w-10 text-xl' },
    { size: 'lg', iconOnly: true, fullWidth: false, class: 'w-11 text-xl' }
  ]
});

export const buttonGroup = cva({
  base: 'inline-flex items-center justify-center h-auto rounded-bee-md',
  variants: {
    fullWidth: {
      true: 'w-full',
      false: 'w-max'
    }
  }
});
