export const toNumber = (r: number, g: number, b: number): number =>
	(r << 16) | (g << 8) | b;
