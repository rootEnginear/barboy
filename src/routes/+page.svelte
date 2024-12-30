<script lang="ts">
	import { RECIPES, type Recipe } from '@/data/recipes';
	import { flip } from 'svelte/animate';

	interface Order {
		orderId: number;
		name: string | null;
		recipe: Recipe;
	}

	let todoOrders: Order[] = $state([]);
	let doneOrders: Order[] = $state([]);
	let currentOrderIndex = $derived(todoOrders.length + doneOrders.length);
</script>

<div class="flex h-svh select-none gap-16 bg-black p-16">
	<div class="flex w-[150px] shrink-0 flex-col gap-8 overflow-y-auto bg-white p-8">
		{#each RECIPES as recipe (recipe.name)}
			<div class="relative flex aspect-square items-center justify-center bg-blue-50 p-8">
				{recipe.name}
				<button
					type="button"
					class="absolute left-0 top-0 flex h-full w-1/2 items-end bg-black/10 text-xs/1 opacity-50"
					onclick={() => {
						const name = prompt('Name');
						todoOrders.push({ orderId: currentOrderIndex, name, recipe });
					}}>name</button
				>
				<button
					type="button"
					class="absolute right-0 top-0 flex h-full w-1/2 items-end justify-end text-xs/1 opacity-50"
					onclick={() => {
						todoOrders.push({ orderId: currentOrderIndex, name: null, recipe });
					}}>noname</button
				>
			</div>
		{/each}
	</div>
	<div
		class="flex min-w-0 flex-1 flex-row-reverse flex-wrap content-start items-start gap-8 overflow-y-auto bg-white p-8"
	>
		{#each todoOrders as order, idx (order.orderId)}
			{@const recipe = order.recipe}
			<button
				class="flex w-[200px] flex-col items-stretch bg-yellow-50 p-8 text-left first:border-4 first:border-red-500 first:bg-red-100"
				onclick={() => {
					todoOrders.splice(idx, 1);
					doneOrders.push(order);
				}}
				animate:flip={{ duration: 200 }}
			>
				<span class="text-lg font-bold">{recipe.name}</span>
				<span class="flex justify-between gap-4 text-sm text-gray-500">
					<span>{recipe.method}</span>
					<span>{recipe.glass}</span>
				</span>
				<hr class="my-2" />
				<ol class="ml-[2ch] list-disc">
					{#each recipe.steps as step}
						<li>{step}</li>
					{/each}
				</ol>
				<hr class="my-2" />
				<span class="flex justify-between gap-4">
					<span>{recipe.ice}</span>
					<span>{recipe.top}</span>
				</span>
				<span>{recipe.garnish}</span>
				<hr class="my-2" />
				{#if order.name}
					<span class="flex justify-between gap-4 text-sm text-gray-500">
						<span>{order.name}</span>
						<span>#{order.orderId}</span>
					</span>
				{:else}
					<span class="text-right text-sm text-gray-500">#{order.orderId}</span>
				{/if}
			</button>
		{/each}
	</div>
	<div
		class="flex w-[150px] shrink-0 flex-col-reverse justify-end gap-8 overflow-y-auto bg-white p-8"
	>
		{#each doneOrders as order, idx (order.orderId)}
			{@const recipe = order.recipe}
			<button
				class="flex aspect-square flex-col items-stretch justify-center bg-green-50 p-8"
				onclick={() => {
					doneOrders.splice(idx, 1);
					todoOrders.unshift(order);
				}}
			>
				<span>{recipe.name}</span>
				<span class="flex justify-between gap-4 text-sm text-gray-500">
					<span>{order.name}</span>
					<span>#{order.orderId}</span>
				</span>
			</button>
		{/each}
	</div>
</div>
