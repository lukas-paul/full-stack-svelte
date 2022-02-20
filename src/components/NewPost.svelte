<script>
    let newPost = {};

    const submit = () => {
        console.log(newPost)
        fetch("/add-new-post", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost)
        })
    }

</script>

<div class="indiv-post">
    <div class="post-center">
        <h2>New Post</h2>
        <input type="text" name="name" placeholder="Your name" on:input={(e) => newPost.name = e.target.value}>
        <input type="text" name="city" placeholder="Your city" on:input={(e) => newPost.city = e.target.value}>
        <input type="text" name="title" placeholder="Title of your post" on:input={(e) => newPost.title = e.target.value}>
        <input type="text" name="text" placeholder="Your text" on:input={(e) => newPost.text = e.target.value}>
        <button on:click={submit}>Submit</button>
        
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