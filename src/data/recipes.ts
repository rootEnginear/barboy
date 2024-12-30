export const BASE_LIQUORS = ['Vodka', 'Gin', 'Rum', 'Tequila', 'Whiskey', 'Other'] as const;
export type BaseLiquor = (typeof BASE_LIQUORS)[number];

export interface Recipe {
	name: string;
	base: BaseLiquor;
	method: string;
	glass: string;
	ice: string | false;
	steps: string[];
	top?: string;
	garnish?: string;
}

export const RECIPES: Recipe[] = [
	{
		name: 'Whiskey Rickey',
		base: 'Whiskey',
		method: 'Build',
		glass: 'Highball',
		ice: 'Crushed',
		steps: ['1/2 Lime, squeezed and thrown into the glass', '2 Whiskey'],
		top: 'Soda',
		garnish: 'Lime wedge'
	},
	{
		name: 'Gin Rickey',
		base: 'Gin',
		method: 'Build',
		glass: 'Highball',
		ice: 'Crushed',
		steps: ['1/2 Lime, squeezed and thrown into the glass', '2 Gin'],
		top: 'Soda',
		garnish: 'Lime wedge'
	},
	{
		name: 'Screwdriver',
		base: 'Vodka',
		method: 'Build',
		glass: 'Highball',
		ice: 'Cubes',
		steps: ['2 Vodka'],
		top: 'OJ',
		garnish: 'Orange'
	}
];
