<script lang="ts">
	import Button from "smelte/src/components/Button";

	import FancyDialog from "../common/FancyDialog.svelte";

	export let showDialog = true;
</script>

<FancyDialog small bind:showDialog>
	<h5 slot="title">Fixing chess</h5>

	<p>
		Chess is fun if you're winning, but only one person can win at a time.
		Wouldn't it be nice if everyone won? Now they can!
	</p>

	<p>
		In collab chess you can move pieces from either side. You work together
		with as many friends as you like to come up with interesting board
		states and (if you like) decide which color pieces should get mated.
	</p>

	<p>
		I couldn't be asked to write a backend for this 😅, so once you make
		your move you need to share the new board with the <b>Share!</b> button.
	</p>

	<div slot="actions">
		<Button text on:click={() => (showDialog = false)}>Got it!</Button>
	</div>
</FancyDialog>
