<script lang="ts">
	// import chess from "chess";
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	import { generateSquares } from "../helpers";
	let dispatch = createEventDispatcher();

	import { ColorType, IBoardState, PieceType } from "../interfaces";
	import ActionBar from "../common/ActionBar.svelte";
	import SmallButton from "../common/SmallButton.svelte";

	export let boardState: IBoardState;

	let squares = generateSquares(boardState);
</script>

<ActionBar>
	<SmallButton
		color="success"
		reverse
		on:click={() => dispatch("share")}
		icon="share"
		title="Share!"
	/>
</ActionBar>

<div class="board">
	{#each squares as square (square.id)}
		<div
			class="square"
			class:black={square.backgroundColor === ColorType.black}
		>
			{#if square.backgroundUrl}
				<img class="piece" src={square.backgroundUrl} />
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.board {
		display: flex;
		flex-wrap: wrap;
		height: 100%;
	}

	.square {
		width: calc(100vw / 8);
		aspect-ratio: 1/1;
		background-color: white;
		&.black {
			background-color: black;
		}
	}
</style>
