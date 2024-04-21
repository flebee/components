import { cva } from 'cva';

export const button = cva({
  base: 'inline-flex min-w-min relative select-none appearance-none whitespace-nowrap overflow-hidden items-center justify-center font-medium transition duration-200 disabled:opacity-50 enabled:active:scale-95',
  variants: {
    variant: {
      primary: 'bg-primary text-slate-50 enabled:hover:bg-opacity-80',
      secondary: 'bg-primary-50 text-primary-600 enabled:hover:bg-primary-100',
      danger: 'bg-danger text-black enabled:hover:bg-opacity-80'
    },
    size: {
      sm: 'gap-2 text-sm h-9',
      md: 'gap-3 text-md h-10',
      lg: 'gap-3 text-md h-11'
    },
    isInGroup: {
      true: 'rounded-none first:rounded-s-bee-md last:rounded-e-bee-md',
      false: 'rounded-bee-md'
    },
    iconOnly: {
      true: null
    }
  },
  compoundVariants: [
    { size: 'sm', iconOnly: false, class: 'px-4' },
    { size: 'md', iconOnly: false, class: 'px-5' },
    { size: 'lg', iconOnly: false, class: 'px-5' },
    { size: 'sm', iconOnly: true, class: 'w-9' },
    { size: 'md', iconOnly: true, class: 'w-10' },
    { size: 'lg', iconOnly: true, class: 'w-11' }
  ]
});

export const buttonGroup = cva({
  base: 'inline-flex items-center justify-center h-auto rounded-md',
  variants: {
    fullWidth: {
      true: 'w-full *:w-full',
      false: 'w-max'
    }
  }
});
