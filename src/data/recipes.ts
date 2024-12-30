import type { Recipe } from '@/schema/recipe';

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
