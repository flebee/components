import { compose, cva } from 'cva';

export const groupBase = cva({
  base: 'flex flex-wrap',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col'
    },
    size: {
      sm: 'gap-x-2 gap-y-1',
      md: 'gap-x-3 gap-y-2',
      lg: 'gap-x-3 gap-y-2'
    }
  }
});

export const groupLabel = cva({
  base: 'block flex-[100%]',
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

export const base = cva({
  base: 'group max-w-fit flex items-center justify-start p-2 -mx-2 select-none has-[:enabled]:cursor-pointer has-[:disabled]:opacity-50'
});

export const labelWrapper = cva({
  base: 'flex flex-col',
  variants: {
    size: {
      sm: 'ml-1.5',
      md: 'ml-2',
      lg: 'ml-2'
    }
  }
});

export const label = cva({
  base: 'block',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg'
    },
    invalid: {
      false: 'text-main',
      true: 'text-danger-600'
    }
  }
});

export const description = cva({
  base: 'block',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-md'
    },
    invalid: {
      false: 'text-secondary',
      true: 'text-danger-600'
    }
  }
});

export const groupDescription = compose(description, cva({ base: 'flex-[100%]' }));

export const wrapper = cva({
  base: 'relative inline-flex items-center justify-center flex-shrink-0 border-solid border-2 rounded-full transition-colors ease-linear duration-200 motion-reduce:transition-none peer-enabled:peer-hover:bg-opacity-40',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6'
    },
    invalid: {
      false: 'border-neutral group-has-[:checked]:border-primary',
      true: 'border-danger group-has-[:checked]:border-danger'
    }
  }
});

export const control = cva({
  base: 'opacity-0 scale-0 origin-center rounded-full group-has-[:checked]:opacity-100 group-has-[:checked]:scale-100 transition ease-linear duration-200 motion-reduce:transition-none',
  variants: {
    size: {
      sm: 'size-1.5',
      md: 'size-2',
      lg: 'size-2.5'
    },
    invalid: {
      false: 'bg-primary',
      true: 'bg-danger'
    }
  }
});
