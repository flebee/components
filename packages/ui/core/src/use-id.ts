const ids = new Map<string, number>();

export const useId = <Prefix extends string>(prefix: Prefix): `${Prefix}-${number}` => {
  const id = (ids.get(prefix) ?? 0) + 1;

  ids.set(prefix, id);

  return `${prefix}-${id}`;
};
