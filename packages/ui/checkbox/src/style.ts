import { cva } from 'cva';

export const base = cva({
  base: 'group max-w-fit inline-flex items-center justify-start p-2 -m-2 has-[:enabled]:cursor-pointer has-[:disabled]:opacity-50'
});

export const label = cva({
  base: 'block text-main select-none',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }
  }
});

export const icon = cva({
  base: 'z-10 opacity-0 group-has-[:checked]:opacity-100 group-has-[:indeterminate]:opacity-100 *:motion-reduce:transition-none *:transition-[stroke-dashoffset] *:duration-200 *:ease-linear *:delay-200',
  variants: {
    size: {
      sm: 'size-3',
      md: 'w-4 h-3',
      lg: 'w-5 h-4'
    }
  }
});

export const wrapper = cva({
  base: "relative inline-flex items-center justify-center flex-shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:border-neutral-500 after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-has-[:checked]:after:scale-100 group-has-[:indeterminate]:after:scale-100 peer-enabled:peer-hover:bg-primary/40 group-has-[:checked]:after:opacity-100 group-has-[:indeterminate]:after:opacity-100 peer-focus-visible:outline-none peer-focus-visible:ring-2 after:bg-primary peer-enabled:peer-hover:after:bg-opacity-70 after:text-slate-50 transition duration-200 ease-linear text-slate-50 before:transition-colors after:transition after:ease-linear after:duration-200 motion-reduce:transition-none before:motion-reduce:transition-none after::motion-reduce:transition-none",
  variants: {
    size: {
      sm: 'size-4 mr-2 rounded-bee-xs before:rounded-bee-xs after:rounded-bee-xs',
      md: 'size-5 mr-2 rounded-bee-sm before:rounded-bee-sm after:rounded-bee-sm',
      lg: 'size-6 mr-2 rounded-bee-sm before:rounded-bee-sm after:rounded-bee-sm'
    }
  }
});
