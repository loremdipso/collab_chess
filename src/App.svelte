<script lang="ts">
	import { onMount } from "svelte";
	onMount(() => {
		// force-reset scroll top, since for some reason browsers remember this
		document.body.scrollTop = 0;
	});

	import Toast from "./common/Toast.svelte";
	import { toaster } from "./common/Toast.svelte";
	import GithubCorner from "./common/GithubCorner.svelte";
	import Board from "./components/Board.svelte";
	import type { IBoardState, ISquare } from "./interfaces";
	import {
		calculateLinkUrl,
		decodeBoardState,
		generateSquares,
		getDefaultBoardState,
	} from "./helpers";

	// let showPlayerEntry = true;
	// let matchups: IResultPair[] = [];

	function getBoardState(): IBoardState {
		const urlParams = new URLSearchParams(window.location.search);
		const state = urlParams.get("state");
		return state ? decodeBoardState(state) : getDefaultBoardState();
	}

	export let boardState: IBoardState = getBoardState();
	export let squares: ISquare[] = generateSquares(boardState);

	function doReset() {
		boardState = getDefaultBoardState();
		squares = generateSquares(boardState);
		doResetUrl();
	}

	addEventListener("popstate", (event) => {
		boardState = getBoardState();
		squares = generateSquares(boardState);
	});

	let url = "";
	function doResetUrl() {
		const url = new URL(location.pathname, location.href);
		url.searchParams.delete("state");
		window.history.pushState({}, "", url);
	}

	function doUpdateUrl() {
		let url = calculateLinkUrl(boardState);
		window.history.pushState({}, "", url);
	}

	function doShare() {
		let url = calculateLinkUrl(boardState); // just in case
		if (navigator.share) {
			navigator.share({ url });
		} else {
			navigator.clipboard.writeText(url);
			toaster.notify("Added link to clipboard");
		}
	}

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
				>Collab
				<img
					src="collab.svg"
					alt="Chess doesn't have to have winners AND losers"
					class="collab-icon"
				/>
				Chess</a
			>
		</h6>

		<GithubCorner
			href="https://github.com/loremdipso/collab_chess"
			position="topLeft"
			small
		/>
	</header>

	<Toast />

	<div class="fade-in w-full">
		<Board
			bind:boardState
			bind:squares
			on:share={doShare}
			on:updateurl={doUpdateUrl}
			on:reseturl={doResetUrl}
			on:reset={doReset}
		/>
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
