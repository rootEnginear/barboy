export interface Recipe {
	name: string;
	method: string;
	glass: string;
	ice: string;
	steps: string[];
	top: string;
	garnish: string;
}

export const RECIPES: Recipe[] = [
	{
		name: 'Whiskey Rickey',
		method: 'Build',
		glass: 'Highball',
		ice: 'Crushed',
		steps: ['1/2 Lime, squeezed and thrown into the glass', '2oz Whiskey'],
		top: 'Soda',
		garnish: 'Lime wedge'
	},
	{
		name: 'Gin Rickey',
		method: 'Build',
		glass: 'Highball',
		ice: 'Crushed',
		steps: ['1/2 Lime, squeezed and thrown into the glass', '2oz Gin'],
		top: 'Soda',
		garnish: 'Lime wedge'
	}
];
