export const groupBy = <T, K extends string | number | symbol>(
	arr: T[],
	groupFn: (element: T) => K
): Record<K, T[]> =>
	arr.reduce(
		(r, v, _i, _a, k = groupFn(v)) => ((r[k] || (r[k] = [])).push(v), r),
		{} as Record<K, T[]>
	);
