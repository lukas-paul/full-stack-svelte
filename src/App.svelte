<script>
	import Blackboard from "./components/Blackboard.svelte"
	import BigPost from "./components/BigPost.svelte"
	import NewPost from "./components/NewPost.svelte"
	import { onMount } from "svelte"

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
	
	let bboard = false;
	let posts = []
	fetch("/select-post"
        ).then((result)=>{
            console.log("fetch in svelte 1: ", result)
            return result.json()
        }).then((result)=> {
            console.log("fetch in svelte 2: ", result)
			result.forEach(element => {
				posts.push(element)
			});
			console.log("posts: ", posts)
			bboard = true;
        })
	
	let chosenId;
	let chosenPost;
	const chooseId = (e) => {
		console.log("event.detail: " , e.detail)
		chosenId = e.detail;
		fetch(`/choose-post/${chosenId}`).then((result)=>{
			return result.json()
		}).then((result)=> {
			console.log("result from choose post: ", result)
			chosenPost = result
		})
			
	}
	const exitPost = () => {
		chosenPost = false;
	}

	let newPost = false;
	const clickNewPost = () => {
		console.log("newPost")
		newPost = true;
	}
	
</script>

<main>
	<h2 style="color: {nameColor}" on:mouseenter={changeColor}>BandMates</h2>
	<div class="middle">
		{#if bboard}
			<Blackboard posts = {posts} on:choose-post={chooseId}/>
		{/if}
		{#if chosenPost}
			<BigPost {chosenPost} on:exit-post={exitPost} />
		{/if}
		{#if newPost}
			<NewPost />
		{/if}
	</div>
	<button on:click={clickNewPost}>New Post</button>

</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		display: grid;;
		grid-template-rows: 1fr 8fr 1fr;
	}

	h2 {
		color: purple;
		font-size: 4em;
		font-weight: 100;
		grid-row: 1;
	}

	.middle {
		grid-row: 2;
	}

	button {
		grid-row: 3
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>