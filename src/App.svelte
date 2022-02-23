<script>
	import Blackboard from "./components/Blackboard.svelte"
	import BigPost from "./components/BigPost.svelte"
	import NewPost from "./components/NewPost.svelte"
	import Filter from "./components/Filter.svelte"
	import Login from "./components/Login.svelte"
	import url from './url'
	console.log("url: ", url)
	import { Router, Link, Route } from "svelte-navigator";


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
	let posts = [];
	const loadPosts = () => {
		let loadedPosts = [];
		fetch("/select-post"
        ).then((result)=>{
            console.log("fetch in svelte 1: ", result)
            return result.json()
        }).then((result)=> {
            console.log("fetch in svelte 2: ", result)
			result.forEach(element => {
				loadedPosts.push(element)
				posts = loadedPosts;
			});
			console.log("posts: ", posts)
			bboard = true;
        })
	}
	loadPosts();
	$: reactivePosts = posts
	
	let chosenId;
	let chosenPost;
	const chooseId = (e) => {
		console.log("event.detail: " , e.detail)
		chosenId = e.detail || window.location.href.split("/").pop();;
		fetch(`/choose-post/${chosenId}`).then((result)=>{
			return result.json()
		}).then((result)=> {
			console.log("result from choose post: ", result)
			chosenPost = result
			window.history.replaceState({}, '',`#/post/${chosenId}`);
		})
			
	}

	let linkedPost = window.location.href.split("/").pop();
	console.log(linkedPost)
	if (!chosenPost && linkedPost) {
		chooseId(linkedPost)
	}
	


	const exitPost = () => {
		chosenPost = false;
		window.history.replaceState({}, '','/');
	}

	const exitNewPost = () => {
		console.log("exit new Post")
		newPost = false;
	}

	let newPost = false;
	const clickNewPost = () => {
		console.log("newPost")
		newPost = true;
	}

	let noResults = false;
	const filterPosts = (e) => {
		let filteredPosts = [];
		console.log("filterPosts: ", e.detail)
		//send chosen city to server
		fetch(`/filter-posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(e.detail),
        }).then((results)=> {
			return results.json()
		}).then((results)=> {
			console.log("results in filteredPosts: ", results)
			results.forEach(element => {
				filteredPosts.push(element)
				if (filteredPosts.length<1) {
					noResults = true;
				} else {
				posts = filteredPosts;
				console.log("posts in filtered: ", posts)
				}
			});
		})
		
	}	

	const exitLogin = () => {
		console.log("exit login")
		window.history.replaceState({}, '','/');
	}
</script>

<main>
	<nav>
		<a class="login-button" href="#/login">Login</a> 
	</nav>
	
		
	
	
	<h2 class="banner" style="color: {nameColor}" on:mouseenter={changeColor}>BandMates</h2>
	<div class="filter">
		<Filter on:filter-posts={filterPosts}/>
	</div>
	
	<div class="middle">
		{#if bboard}
			<Blackboard posts = {reactivePosts} on:choose-post={chooseId}/>
		{/if}
		{#if chosenPost && $url.hash === `#/post/${chosenId}`}
			<BigPost {chosenPost} on:exit-post={exitPost} />
		{/if}
		{#if newPost}
			<NewPost on:exit-new-post={()=> {exitNewPost(); loadPosts()}} />
		{/if}
		{#if $url.hash === "#/login"}
			<Login on:exit-login={exitLogin}/>	
		{/if}
	</div>
	<button on:click={clickNewPost}>New Post</button>

</main>

<style>
	main {
		height: 100vh;
		width: 100vw;
		text-align: center;
		max-width: 240px;
		display: grid;;
		grid-template-rows: 0.5fr 0.5fr 8fr 1fr;
	}

	.banner {
		color: purple;
		font-size: 3em;
		font-weight: 100;
		grid-row: 1;
	}

	.middle {
		grid-row: 3;
		overflow-y: auto;
		background-color: white;
	}

	button {
		grid-row: 4
	}

	.filter {
		justify-self: end;
		width: 50vw;
		right: 5px;
		grid-row: 2;
		height: 80%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-around;
		border: 1px black solid;
		margin-bottom: 5px;
		border-radius: 10px;
		transform: translateX(-10px);
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>