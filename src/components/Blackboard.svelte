<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    import { onMount } from "svelte"

    export let posts = [];

    
   
    console.log("posts: ", posts)
    const choosePost = (postId) => {
        console.log(postId)
        dispatch('choose-post', postId)
        
    }
</script>

<div class="blackboard">
{#each posts as post (post.id)}
    <div class="post" on:click={choosePost(post.id)}>
        <p>{post.username}</p>
        <p>{post.headline}</p>
    </div>  
{/each}
</div>

<style>
    .blackboard {
        width: 100vw;
        height: 100%;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 10px;
        margin: 5px;
    }

    .post {     
        border: black;
        color:#000;
        background: white;
        display:block;
        height:10em;
        width:10em;
        padding:1em;
        box-shadow: 5px 5px 7px rgba(33,33,33,.7);
    }


</style>