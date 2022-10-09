<script lang="ts">
	import Button from "smelte/src/components/Button";

	import FancyDialog from "../common/FancyDialog.svelte";

	export let showDialog = true;
</script>

<FancyDialog small bind:showDialog>
	<h5 slot="title">Fixing chess</h5>

	<p>
		Chess is fun if you're winning, but only one person can win at a time.
		Wouldn't it be nice if everyone won? Now, with <b>Collab Chess™</b>,
		they can!
	</p>

	<p>
		In <b>Collab Chess™</b> you can move pieces from either side. You work together
		with as many friends as you like to come up with interesting board states.
	</p>

	<p>
		Check, checkmate, castling, en passant, promotions, and restrictive
		piece movements are all far too competitive for <b>Collab Chess™</b> and
		so have been removed. Capturing pieces is still allowed as a nod to the beauty
		and fragility of life.
	</p>

	<p>
		I couldn't be asked to write a backend for this 😅, so once you make
		your moves you need to share the new board with the <b>Share!</b> button.
	</p>

	<div slot="actions">
		<Button text on:click={() => (showDialog = false)}>Wow, so cool!</Button
		>
		<Button text on:click={() => (showDialog = false)}>I love it!</Button>
	</div>
</FancyDialog>
