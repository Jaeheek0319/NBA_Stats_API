const search = document.querySelector(".search")
const stats = document.querySelector(".stats")
const info = document.querySelector(".info")
const save = document.querySelector(".save")
const show = document.querySelector(".show")
const favorite = document.querySelector(".favorite")
const hideFav = document.querySelector(".hideFav")
const favplayer = document.querySelector(".favPlayer")

search.addEventListener("click", (event) => {
    const player = document.querySelector("#name").value;
    fetch(`https://www.balldontlie.io/api/v1/players?search=${player}`)
    .then((res) => {
        return res.json();
    })
    
    .then((data) => {
        for (let i = 0;  i < 3; i++) {
            const elements = data[i];
            
            console.log("data: ", data);
            template +=`<p id="name"> ${data.data[i].first_name} ${data.data[i].last_name}</p>       <p>${data.data[i].team.full_name} | ${data.data[i].position}</p>    <p>Height: ${data.data[i].height_feet}' ${data.data[i].height_inches}"</p> <p>Weight: ${data.data[i].weight_pounds} lbs</p>`

            const id = data.data[i].id
            console.log("id: ", id)
            info.innerHTML = template;


            
            
            fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${id}`)
            .then((res) => {
                return res.json();
            })
            .then((stat) => {
                console.log("stats: ", stat);
                template = "";
                
                if (stat.data.length > 0) {
                    for (let index = 0; index < 3; index++) {
                        const element = stat.data[index];
                        if (element) {
                            console.log("element: ", element)
                            template += `
                            <p>Current Season:</p>
                            <div class="advStats">
                            <p>GP: ${element.games_played} </p>
                            <p>MIN: ${element.hasOwnProperty("min") ? element.min : "N/A"} </p>
                            <p>PTS: ${element.hasOwnProperty("pts") ? element.pts : "N/A"} </p>
                            <p>FGM: ${element.hasOwnProperty("fgm") ? element.fgm : "N/A"} </p>
                            <p>FGA: ${element.hasOwnProperty("fga") ? element.fga : "N/A"} </p>
                            <p>FG%: ${element.hasOwnProperty("fg_pct") ? element.fg_pct : "N/A"} </p>
                            <p>3PM: ${element.hasOwnProperty("fg3m") ? element.fg3m : "N/A"} </p>
                            <p>3PA: ${element.hasOwnProperty("fg3a") ? element.fg3a : "N/A"} </p>
                            <p>3P%: ${element.hasOwnProperty("fg3_pct") ? element.fg3_pct : "N/A"} </p>
                            <p>REB: ${element.hasOwnProperty("reb") ? element.reb : "N/A"} </p>
                            <p>STL: ${element.hasOwnProperty("stl") ? element.stl : "N/A"} </p>
                            <p>BLK: ${element.hasOwnProperty("blk") ? element.blk : "N/A"} </p>
                            <p>TOV: ${element.hasOwnProperty("turnover") ? element.turnover : "N/A"} </p>
                            </div>
                            `
                        }
                    }
                } else {
                    
                    template += `
                    <p> No stats avalible</p>
                    `  }
                    
                    stats.innerHTML = template;
                })
            }
            })
            
            save.classList.remove("hide");
            
        }

    );
        

save.addEventListener("click", (event) => {

    const basicInfo = JSON.parse(localStorage.getItem("info")) || [];
    const infoSheet = info.innerHTML;

    basicInfo.push(infoSheet)

    localStorage.setItem("info", JSON.stringify(basicInfo))
    console.log(localStorage);


    //show

    // combine al html string into one string
    let template = "";
    for (let index = 0; index < basicInfo.length; index++) {
        const element = basicInfo[index];
        template += element;
        // template = template + element

    }

    // innerhtml the combined sgtring
    const favPlayer = document.querySelector(".favPlayer")
    favPlayer.innerHTML = template;

    // favPlayer.innerHTML = `${localStorage.info}`

})

show.addEventListener("click", (event) => {

    favorite.classList.remove("hide");
    hideFav.classList.remove("hide");
    show.classList.add("hide");


})

hideFav.addEventListener("click", (event) => {

    favorite.classList.add("hide");
    show.classList.remove("hide");
    hideFav.classList.add("hide");


})

const basicInfo = JSON.parse(localStorage.getItem("info")) || [];
let template = "";
for (let index = 0; index < basicInfo.length; index++) {
    const element = basicInfo[index];
    template += element;
    // template = template + element

}

// innerhtml the combined sgtring
const favPlayer = document.querySelector(".favPlayer")
favPlayer.innerHTML = template;