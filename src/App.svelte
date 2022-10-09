<script lang="ts">
	import { onMount } from "svelte";
	onMount(() => {
		// force-reset scroll top, since for some reason browsers remember this
		document.body.scrollTop = 0;
	});

	import Icon from "smelte/src/components/Icon";

	import Toast from "./common/Toast.svelte";
	import { toaster } from "./common/Toast.svelte";
	import GithubCorner from "./common/GithubCorner.svelte";
	import InfoDialog from "./components/InfoDialog.svelte";
	import Board from "./components/Board.svelte";
	import type { IBoardState } from "./interfaces";
	import { decodeBoardState, getDefaultBoardState } from "./helpers";

	let showInfo = false;
	// let showPlayerEntry = true;
	// let matchups: IResultPair[] = [];

	function doShare() {
		throw "todo";
		// // TODO: show loading graphic? Or will it just freeze?
		// if (players.length == 0) {
		// 	return;
		// }

		// matchups = getMatchups(players.slice(0, players.length - 1), true);
		// if (matchups.length === players.length - 1) {
		// 	showPlayerEntry = false;
		// } else {
		// 	toaster.alert("Can't find a valid set of pairings :(");
		// }
	}

	const urlParams = new URLSearchParams(window.location.search);
	const state = urlParams.get("state");

	export let boardState: IBoardState = state
		? decodeBoardState(state)
		: getDefaultBoardState();

	// isDebug
	// if (!state) {
	// TODO: board state
	// }

	// $: {
	// 	if (!players.length || players[players.length - 1].name.length !== 0) {
	// 		players.push(getEmptyPlayer());
	// 	}
	// }
</script>

<svelte:head>
	<!-- Material Icons -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<!-- Roboto -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<!-- Roboto Mono -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono"
	/>
</svelte:head>

<main class="pb-32">
	<header
		class="relative slide-in-from-top bg-primary-300 dark:bg-black flex flex-wrap h-16 items-center justify-center left-0 p-0 shadow top-0 w-full z-20"
	>
		<h6 class="select-none pl-3 tracking-widest text-lg">
			<a href="." class="text-white"
				>Collaborative
				<img
					src="collab.svg"
					alt="Chess doesn't have to have winners AND losers"
					class="collab-icon"
				/>
				Chess</a
			>
		</h6>

		<div class="absolute right-0 cursor-pointer pr-5" title="Show info">
			<Icon on:click={() => (showInfo = true)}>info</Icon>
		</div>

		<GithubCorner
			href="https://github.com/loremdipso/collab_chess"
			position="topLeft"
			small
		/>
	</header>

	<InfoDialog bind:showDialog={showInfo} />

	<Toast />

	<div class="fade-in w-full">
		<Board bind:boardState on:share={doShare} />
	</div>
</main>

<style lang="scss">
	:global(.actions-bar) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: blue;
	}

	:global(.actions-bar > *) {
		margin-right: 5px;
	}

	:global(html) {
		height: 100vh;
		overflow: hidden;
	}

	:global(body) {
		height: 100%;
		overflow-y: scroll;
		overflow-x: auto;
		background-color: #312e2b;
	}

	:global(a) {
		// TODO: figure out why this doesn't work
		// @apply text-blue-200;
		color: rgba(29, 142, 241, 1);
	}

	:global(.padded-table td, th) {
		padding: 1rem;
	}

	:global(.padded-table d:last-child, th:last-child) {
		width: 5rem;
	}

	.slide-in-from-top {
		animation: 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideDown;
	}
	@keyframes SlideDown {
		0% {
			transform: translate3d(0, -100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}

	.fade-in {
		animation: 1s ease-out 0s 1 FadeIn;
	}
	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}

	.collab-icon {
		height: 30px;
		display: inline;
	}
</style>
