<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import {
		generateSquares,
		getDefaultBoardState,
		getPieceIcon,
	} from "../helpers";
	import InfoDialog from "../components/InfoDialog.svelte";

	let dispatch = createEventDispatcher();

	import { ColorType, IBoardState, ISquare } from "../interfaces";
	import ActionBar from "../common/ActionBar.svelte";
	import SmallButton from "../common/SmallButton.svelte";

	export let boardState: IBoardState;

	export let squares: ISquare[];

	let selectedSquare: ISquare | null = null;
	function clickSquare(square: ISquare) {
		if (selectedSquare === square || (!selectedSquare && !square.piece)) {
			selectedSquare = null;
			return;
		}

		if (selectedSquare) {
			// make sure the move is probably legal
			if (selectedSquare?.piece.colorType !== square.piece?.colorType) {
				movePiece(selectedSquare, square);
			}

			selectedSquare = null;
		} else {
			selectedSquare = square;
		}
	}

	function movePiece(from: ISquare, to: ISquare) {
		// delete old piece from board state
		if (to.piece) {
			boardState.pieces = boardState.pieces.filter(
				(piece) => piece.col !== to.col || piece.row !== to.row
			);
		}

		// update position
		from.piece.col = to.col;
		from.piece.row = to.row;

		// update board
		to.piece = from.piece;
		from.piece = undefined;

		// tell svelte to rerender
		squares = squares;

		dispatch("updateurl");
	}

	let showInfo = false;
</script>

<ActionBar>
	<SmallButton
		color="secondary"
		reverse
		on:click={() => (showInfo = true)}
		icon="info"
		title="What?"
	/>

	<SmallButton
		color="success"
		reverse
		on:click={() => dispatch("share")}
		icon="share"
		title="Share!"
	/>

	<SmallButton
		color="primary"
		reverse
		on:click={() => dispatch("reset")}
		title="New game"
	/>
</ActionBar>

<InfoDialog bind:showDialog={showInfo} />

<div class="board">
	{#each squares as square (square.id)}
		<div
			class="square"
			class:black={square.backgroundColor === ColorType.black}
			class:selected={selectedSquare === square}
			on:click={() => clickSquare(square)}
		>
			{#if square.piece}
				<img
					class="piece"
					src={getPieceIcon(square.piece)}
					alt="piece"
				/>
			{/if}
		</div>
	{/each}
</div>

<style lang="scss">
	.board {
		display: flex;
		flex-wrap: wrap;
		max-height: 80vh;
		aspect-ratio: 1/1;
		margin-left: auto;
		margin-right: auto;
	}

	.square {
		width: calc(100% / 8);
		aspect-ratio: 1/1;
		background-color: white;

		&.black {
			background-color: black;
		}

		&.selected {
			background-color: yellow !important;
		}
	}
</style>
