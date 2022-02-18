<script>
	import Blackboard from "./components/Blackboard.svelte"
	import BigPost from "./components/BigPost.svelte"
	let color = "red"
	$: nameColor = color
	const changeColor = () => {
		console.log("hello")
		if (color === "blue") {
			color = "red"
		} else {
			color ="blue"
		}
	}
	
	

	let posts = [
		{
			id: 1,
			userName: "Bob",
			city: "NY",
			headline: "Just looking",
			text: "Hey guys Im looking for people to start a Rock Band!!!"
		},
		{
			id: 2,
			userName: "Sarah",
			City: "Berlin",
			headline: "Just looking",
			text: "I need a singer for my Hip Hop project"
		},
		{
			id: 3,
			userName: "David",
			City: "Berlin",
			headline: "Just looking",
			text: "I love Death Metal. Want to start a Band. I drum"
		}
	]
	let chosenId;
	let chosenPost;
	const chooseId = (e) => {
		console.log("event.detail: " , e.detail)
		chosenId = e.detail;
		chosenPost = posts[e.detail-1]
	}
	const exitPost = () => {
		chosenId = false;
	}
	
</script>

<main>
	<h2 style="color: {nameColor}" on:mouseenter={changeColor}>BandMates</h2>
	<Blackboard {posts} on:choose-post={chooseId}/>
	{#if chosenId}
	<BigPost {chosenPost} on:exit-post={exitPost} />
	{/if}

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h2 {
		color: purple;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>