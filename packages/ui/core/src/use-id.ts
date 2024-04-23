type Prefix = `bee-${string}`;

const ids = new Map<Prefix, number>();

export const useId = (prefix: string) => {
  const fullPrefix = `bee-${prefix}` as const;
  const id = (ids.get(fullPrefix) ?? 0) + 1;

  ids.set(fullPrefix, id);

  return `${prefix}-${id}`;
};
