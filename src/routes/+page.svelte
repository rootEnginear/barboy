<script lang="ts">
	import { RECIPES, type Recipe } from '@/data/recipes';
	import { groupBy } from '@/utils';
	import { persisted } from 'svelte-persisted-store';
	import { flip } from 'svelte/animate';
	import { twMerge } from 'tailwind-merge';

	interface Order {
		orderId: number;
		name: string | null;
		recipe: Recipe;
	}

	let todoOrders = persisted<Order[]>('todoOrders', []);
	let doneOrders = persisted<Order[]>('doneOrders', []);
	let currentOrderIndex = $derived(
		[...$todoOrders, ...$doneOrders].reduce((max, current) => Math.max(max, current.orderId), -1) +
			1
	);

	let sameOrderCount = $derived(
		Object.entries(groupBy($todoOrders, (order) => order.recipe.name))
			.map(([name, orders]) => [name, orders.length] as [string, number])
			.sort((a, b) => b[1] - a[1])
	);

	let sortAlgo: 'index' | 'most-sold' | 'least-sold' = $state('index');
	let soldCount = $derived(
		Object.fromEntries(
			Object.entries(groupBy($doneOrders, (order) => order.recipe.name)).map(
				([name, orders]) => [name, orders.length] as [string, number]
			)
		)
	);
	let sortedRecipes = $derived.by(() => {
		if (sortAlgo === 'index') return RECIPES;
		const sorted = [...RECIPES].sort((a, b) => soldCount[b.name] - soldCount[a.name]);
		if (sortAlgo === 'most-sold') return sorted;
		return sorted.reverse();
	});
</script>

<div class="flex h-svh select-none gap-16 bg-black p-16">
	<div class="flex w-[150px] shrink-0 flex-col gap-8 overflow-y-auto bg-white p-8">
		<select bind:value={sortAlgo}>
			<option value="index">Index</option>
			<option value="most-sold">Most Sold</option>
			<option value="least-sold">Least Sold</option>
		</select>
		{#each sortedRecipes as recipe (recipe.name)}
			<div
				class="relative flex aspect-square items-center justify-center bg-blue-50 p-8"
				animate:flip={{ duration: 200 }}
			>
				{recipe.name}
				<button
					type="button"
					class="absolute left-0 top-0 flex h-full w-1/2 items-end bg-black/10 p-8 text-xs/1 opacity-50"
					onclick={() => {
						const name = prompt('Name');
						$todoOrders = [...$todoOrders, { orderId: currentOrderIndex, name, recipe }];
					}}>name</button
				>
				<button
					type="button"
					class="absolute right-0 top-0 flex h-full w-1/2 items-end justify-end p-8 text-xs/1 opacity-50"
					onclick={() => {
						$todoOrders = [...$todoOrders, { orderId: currentOrderIndex, name: null, recipe }];
					}}>noname</button
				>
			</div>
		{/each}
	</div>
	<div class="relative min-w-0 flex-1 bg-white">
		<div class="h-full overflow-y-auto">
			<div
				class="flex min-w-0 flex-1 flex-row-reverse flex-wrap content-start items-start gap-8 p-8"
			>
				{#each $todoOrders as order, idx (order.orderId)}
					{@const recipe = order.recipe}
					<button
						type="button"
						class={twMerge(
							'flex w-[200px] flex-col items-stretch p-8 text-left first:border-4 first:border-red-500 first:bg-red-100',
							recipe.name === $todoOrders[0].recipe.name
								? 'border-2 border-dashed border-red-300 bg-red-50'
								: recipe.name === sameOrderCount[0][0]
									? 'bg-orange-50'
									: 'bg-yellow-50'
						)}
						onclick={() => {
							$todoOrders.splice(idx, 1);
							$todoOrders = $todoOrders;
							$doneOrders = [...$doneOrders, order];
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
		</div>
		<div class="absolute bottom-0 right-0 flex flex-col items-end">
			<ol class="flex flex-col items-end bg-white p-8">
				{#each sameOrderCount as [orderName, count] (orderName)}
					<li
						class={orderName === $todoOrders[0].recipe.name
							? 'text-lg font-bold text-red-500'
							: 'first:text-orange-500'}
					>
						{orderName} x{count}
					</li>
				{/each}
			</ol>
			<button
				type="button"
				class="bg-white p-8 underline decoration-double"
				ondblclick={() => {
					$doneOrders = [
						...$doneOrders,
						...$todoOrders.filter((order) => order.recipe.name === $todoOrders[0].recipe.name)
					];
					$todoOrders = $todoOrders.filter(
						(order) => order.recipe.name !== $todoOrders[0].recipe.name
					);
				}}>Clear Group</button
			>
		</div>
		<button
			type="button"
			class="absolute bottom-0 left-0 bg-white p-8 underline decoration-double"
			ondblclick={() => {
				if (confirm('Clear?')) $todoOrders = [];
			}}>Clear</button
		>
	</div>
	<div class="relative w-[150px] shrink-0 bg-white">
		<div class="h-full overflow-y-auto">
			<div class="flex flex-col-reverse justify-end gap-8 p-8">
				{#each $doneOrders as order, idx (order.orderId)}
					{@const recipe = order.recipe}
					<div
						class="relative flex aspect-square flex-col items-center justify-center bg-green-50 p-8 text-center"
						animate:flip={{ duration: 200 }}
					>
						<span>{recipe.name}</span>
						<span class="flex w-full justify-between gap-4 text-sm text-gray-500">
							<span>{order.name}</span>
							<span>#{order.orderId}</span>
						</span>
						<button
							type="button"
							class="absolute left-0 top-0 size-full"
							onclick={() => {
								$doneOrders.splice(idx, 1);
								$doneOrders = $doneOrders;
								$todoOrders = [order, ...$todoOrders];
							}}
							aria-label="move to todo"
						>
						</button>
						<button
							type="button"
							class="absolute left-0 top-0 flex items-center justify-center p-8 text-sm text-gray-500 underline decoration-double"
							ondblclick={() => {
								if (confirm('Clear?')) $doneOrders.splice(idx, 1);
							}}>X</button
						>
					</div>
				{/each}
			</div>
		</div>
		<button
			type="button"
			class="absolute bottom-0 left-0 bg-white p-8 underline decoration-double"
			ondblclick={() => {
				if (confirm('Clear?')) $doneOrders = [];
			}}>Clear</button
		>
		<span class="absolute bottom-0 right-0 bg-white p-8 text-sm text-gray-500"
			>Total: {$doneOrders.length}</span
		>
	</div>
</div>
