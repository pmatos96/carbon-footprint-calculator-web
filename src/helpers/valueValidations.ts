
export const isPositiveNumber = (value: number): boolean => typeof value === 'number' && value > 0;
export const isNonNegativeNumber = (value: number): boolean => typeof value === 'number' && value >= 0;
export const isNonNegativeInteger = (value: number): boolean => isNonNegativeNumber(value) && Number.isInteger(value);
export const isPositiveInteger = (value: number): boolean => isPositiveNumber(value) && Number.isInteger(value);