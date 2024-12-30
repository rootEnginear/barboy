import { array, literal, object, optional, string, union, type InferOutput } from 'valibot';

export const BASE_LIQUORS = ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Other'] as const;
export type BaseLiquor = (typeof BASE_LIQUORS)[number];

export const RecipeSchema = object({
	name: string(),
	base: union(BASE_LIQUORS.map((lq) => literal(lq))),
	method: string(),
	glass: string(),
	ice: union([string(), literal(false)]),
	steps: array(string()),
	top: optional(string()),
	garnish: optional(string())
});
export type Recipe = InferOutput<typeof RecipeSchema>;
