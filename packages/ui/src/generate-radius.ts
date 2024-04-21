export type Radius = Record<'lg' | 'md' | 'sm' | 'xl' | 'xs', `${number}${'px' | 'rem'}`>;

export const prefix = 'bee' as const;

const radius: Radius = { xs: '0.375rem', sm: '0.5rem', md: '0.875rem', lg: '1rem', xl: '1.25rem' } as const;

export const generateRadius = (config: Partial<Radius> | undefined) => {
  const borderRadius = Object.entries({ ...radius, ...config }).map(([key, value]) => [`${prefix}-${key}`, value]);

  return Object.fromEntries(borderRadius);
};
