export type Radius = Record<'lg' | 'md' | 'sm' | 'xs', `${number}${'px' | 'rem'}`>;

export const prefix = 'bee' as const;

const radius: Radius = { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem' } as const;

export const generateRadius = (config: Partial<Radius> | undefined) => {
  const borderRadius = Object.entries({ ...radius, ...config }).map(([key, value]) => [`${prefix}-${key}`, value]);

  return Object.fromEntries(borderRadius);
};
