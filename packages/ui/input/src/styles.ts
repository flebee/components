import { cva } from 'cva';

export const wrapper = cva({
  base: 'flex group w-full items-center relative flex-row bg-foreground has-[:enabled]:hover:bg-neutral-100 has-[:enabled]:hover:cursor-text has-[:focus]:bg-neutral-100 transition duration-200 rounded-bee-md outline-none motion-reduce:transition-none gap-2.5 has-[:disabled]:opacity-50',
  variants: {
    size: {
      sm: 'px-2.5 h-9 min-h-9',
      md: 'px-3 h-10 min-h-10',
      lg: 'px-3 h-11 min-h-11'
    }
  }
});

export const inputBase = cva({
  base: 'w-full font-normal bg-transparent outline-none placeholder:text-secondary/90 focus:outline-none text-main h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    }
  }
});

export const label = cva({
  base: 'block text-main',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    }
  }
});

export const content = cva({
  base: 'block pointer-events-none select-none text-main/70 flex-shrink-0',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    }
  }
});

export const baseWrapper = cva({
  base: 'flex flex-col gap-2'
});

export const description = cva({
  base: 'block text-secondary mt-2',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm'
    }
  }
});
