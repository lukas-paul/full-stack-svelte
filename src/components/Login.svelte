<script>
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let newPost = {};

    const submit = () => {
        console.log(newPost)
        fetch("/add-new-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost)
        }).then(()=> {
             dispatch("exit-new-post")
        })
    }

    const exit = () => {
        dispatch("exit-login")
    }

</script>

<div class="indiv-post">
    <div class="post-center">
        <h2>Login</h2>
        <input type="text" name="email" placeholder="Your email" on:input={(e) => newPost.name = e.target.value}>
        <input type="text" name="password" placeholder="Your password" on:input={(e) => newPost.city = e.target.value}>
        <button on:click={submit}>Login</button>
        <div class="exit-button" on:click={exit}>
           <div class="x">X</div>
        </div>
        
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