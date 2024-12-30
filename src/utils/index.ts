import type { BaseLiquor } from '@/data/recipes';

export const groupBy = <T, K extends string | number | symbol>(
	arr: T[],
	groupFn: (element: T) => K
): Record<K, T[]> =>
	arr.reduce(
		(r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{} as Record<K, T[]>
	);

export const getLiquorColor = (liquor: BaseLiquor) => {
	switch (liquor) {
		case 'Vodka':
			return 'bg-blue-100';
		case 'Gin':
			return 'bg-green-100';
		case 'Rum':
			return 'bg-red-100';
		case 'Tequila':
			return 'bg-orange-100';
		case 'Whiskey':
			return 'bg-purple-100';
		default:
			return 'bg-pink-100';
	}
};
