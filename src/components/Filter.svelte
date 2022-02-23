<script>
 import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();



let cities = ["Barcelona", "Berlin", "New York"]
let genres = ["Rock", "Pop", "Rap", "Schlager"]
let showCities = false;
let showGenre = false;
let filterColor = "white"

$: color = filterColor;

const clickCity = (e) => {
    showCities = !showCities;
}

const clickGenre = (e) => {
    showGenre = !showGenre;
}


let cityElements = document.getElementsByClassName("cities")
let genreElements = document.getElementsByClassName("genres")


let chosenFilter = {};
const chooseCity = (filter, e) => {
    let elements;
    if (filter == "city") {
        elements = cityElements;
    } else {
        elements = genreElements;
    }
    console.log("elements: ", elements)
    console.log("e: ", e)
   for (let i = 0; i < elements.length; i++) {
       console.log("element: ", elements[i].id)
       if (e == elements[i].id) {
           elements[i].style.color = "red"
           chosenFilter[filter] = e;
       } else {
           elements[i].style.color = "black"
       }
    }
    console.log("chosenCity.city: ", chosenFilter)
}

const filterPosts = () => {
    dispatch("filter-posts", chosenFilter)
}

</script>
        <h3>Filter:</h3>
        <div class="filt-element">
            <div class="filter-container">
        
                <div class="city-button" on:click={clickCity}>City</div>
            
            {#if showCities}
                {#each cities as city (city)}
                    <div style="background-color: {color}" class="cities" id = {city} on:click={()=>chooseCity("city", city)}>
                        <p >{city}</p>
                    </div>  
             
                {/each}
            {/if}
            </div>
        </div>

        <div>
             <div class="filter-container">
                <div class="city-button" on:click={clickGenre}>Genre</div>
            {#if showGenre}
                {#each genres as genre (genre)}
                    <div class="genres" id={genre} on:click={()=>chooseCity("genre", genre)}>
                        <p>{genre}</p>
                    </div>  
                {/each}
            {/if}
            </div>
         
        </div>
        <div class="filter-button" on:click={filterPosts}>Search</div>
    
            
  


<style>

    .city-button {
        background-color: white;
        width: 4em;
        height: 20px;
        cursor: pointer;
    }

    .city-button:hover {
        border-bottom: 1px solid black;
    }

    .filter-container {
        background-color: white;
        position: absolute;
        transform: translateY(-10px);
        font-family: monospace;
        color: black
    }

    .filt-element {
        position: relative;
    }

    .filter-button {
        background-color: white;
        width: 50px;
        height: 20px;
        color: black;
        cursor: pointer;
    }

    p {
        cursor: pointer
    }
    p:hover {
        color: darkgrey
    }
</style>