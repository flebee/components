import { cva } from 'cva';

export const wrapper = cva({
  base: 'flex group w-full items-center relative flex-row has-enabled:hover:cursor-text transition duration-200 rounded-bee-md outline-hidden motion-reduce:transition-none gap-2.5 has-disabled:opacity-50',
  variants: {
    size: {
      sm: 'px-2.5 h-9 min-h-9',
      md: 'px-3 h-10 min-h-10',
      lg: 'px-3 h-11 min-h-11'
    },
    invalid: {
      true: 'bg-danger-50 has-enabled:hover:saturate-150 has-focus:saturate-150',
      false: 'bg-neutral-50 has-enabled:hover:bg-neutral-50/75 has-focus:bg-neutral-50/75'
    }
  }
});

export const inputBase = cva({
  base: 'w-full font-normal bg-transparent outline-hidden focus:outline-hidden h-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder-shown:text-ellipsis',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    },
    invalid: {
      true: 'placeholder:text-danger-700/60 text-danger-600',
      false: 'placeholder:text-secondary/80 text-main'
    }
  }
});

export const label = cva({
  base: 'block',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    },
    invalid: {
      false: 'text-main',
      true: 'text-danger-600'
    }
  }
});

export const content = cva({
  base: 'block pointer-events-none select-none text-main/70 shrink-0',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-md'
    }
  }
});

export const base = cva({ base: 'flex flex-col gap-2' });

export const description = cva({
  base: 'block',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-xs',
      lg: 'text-sm'
    },
    invalid: {
      true: 'text-danger-600',
      false: 'text-secondary'
    }
  }
});
