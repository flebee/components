import { cva } from 'cva';

export const avatar = cva({
  base: 'flex relative aspect-square justify-center items-center box-border overflow-hidden align-middle bg-neutral-50/70 text-neutral-700',
  variants: {
    size: {
      sm: 'size-8 text-tiny',
      md: 'size-10 text-tiny',
      lg: 'size-14 text-small'
    },
    radius: {
      none: 'rounded-none',
      xs: 'rounded-bee-xs',
      sm: 'rounded-bee-sm',
      md: 'rounded-bee-md',
      lg: 'rounded-bee-lg',
      xl: 'rounded-bee-xl',
      full: 'rounded-full'
    }
  }
});

export const avatarImage = cva({
  base: 'flex object-cover size-full transition-opacity duration-500 z-[1]',
  variants: {
    loaded: {
      false: 'opacity-0'
    }
  }
});

export const avatarFallback = cva({
  base: 'flex items-center justify-center inset-0 size-full text-inherit font-normal absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
});
