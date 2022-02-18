<script>
    export let chosenPost;
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    const exitPost = () => {
        dispatch('exit-post')
    }
</script>

<div class="indiv-post">
    <div class="post-center">
        <div class="name">User: {chosenPost.userName}</div>
        <div class="headline">Title: {chosenPost.headline}</div>
        <div class="text">Post: {chosenPost.text}</div>
    <button class="exit-button" on:click={exitPost}>X</button>
    </div>
</div>

<style>
    .indiv-post {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);

    }
    .post-center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        height: 80vh;
        width: 70vw;
        opacity: 1;
        z-index: 10;
        border-radius: 10px;
    }
</style>