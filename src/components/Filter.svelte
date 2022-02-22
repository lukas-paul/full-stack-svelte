<script>
 import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();



let cities = ["Barcelona", "Berlin", "New York"]
let genres = ["Rock", "Pop", "Rap", "Schlager"]
let showCities = false;
let showGenre = false;
let filterColor = "antiquewhite"

$: color = filterColor;

const clickCity = (e) => {
    showCities = !showCities;
}

const clickGenre = (e) => {
    showGenre = !showGenre;
}


let elements = document.getElementsByClassName("cities")
let chosenCity = {};
const chooseCity = (e) => {
    console.log("e: ", e)
   for (let i = 0; i < elements.length; i++) {
       console.log("element: ", elements[i].id)
       if (e == elements[i].id) {
           elements[i].style.color = "red"
           chosenCity.city = e;
       } else {
           elements[i].style.color = "black"
       }
    }
    chosenCity.city = e;
    console.log("chosenCity.city: ", chosenCity.city)
}

const filterPosts = () => {
    dispatch("filter-posts", chosenCity.city)
}

</script>
        <div class="filt-element">
            <div class="filter-container">
        
                <div class="city-button" on:click={clickCity}>City</div>
            
            {#if showCities}
                {#each cities as city (city)}
                    <div style="background-color: {color}" class="cities" id = {city} on:click={()=>chooseCity(city)}>
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
                    <div class="filters">
                        <p>{genre}</p>
                    </div>  
                {/each}
            {/if}
            </div>
         
        </div>
        <div class="filter-button" on:click={filterPosts}>Filter</div>
    
            
  


<style>

    .city-button {
        background-color: bisque;
        width: 4em;
        height: 20px;
        color: white;
        cursor: pointer;
    }

    .filter-container {
        background-color: antiquewhite;
        position: absolute;
        transform: translateY(-10px);
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
        color: white
    }
</style>