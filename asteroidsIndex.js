//TO DO PRINTSSORTEDLISTS FUNCTION NEEDS TO BE TURNED TO DETAILS POPULATE
//PRINTSSORTEDLISTS WILL BE THE LESS DETAILED VERSION ROLLOVER CALLBACK WILL CALL DETAILS

let dateKey = '2023-01-01';
let data;
let asteroidWeekData
//fetch for January First - January Seventh
fetch(
    `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=${NASA_AUTH_KEY}`
)
    .then((res) => res.json())
    .then((data) => {
        //isPotentiallyHazardousWithDateAndSize(data.near_earth_objects)
        enablesSortingDropDownMenu(data.near_earth_objects[`${dateKey}`])
        asteroidWeekData = data.near_earth_objects
        //buttonEventListeners(data.near_earth_objects)

        //event listner for form submits will lead to the fully populated body
    });
let currentAsteroid;

//document.querySelector('#sorting-option-div').style.display = "none"
//document.querySelector('#day-drop-down-menu').addEventListener('mouseover', ()=> document.querySelector('#sorting-option-div').style.display = "block")


//first function: returns only those data points that return as true to hazardous and are identified with their date & size
//POPULATES BODY

let hazardousAsteroids
// function dayDropDownMenuFunction(dataForEachDayMenu) {
//     document.querySelector('#day-drop-down-menu').addEventListener('submit', (e) => {
//         e.preventDefault()
//         console.log(e.target)
//         if (e.target.input.value = 'hazardfunction') { console.log('hazardfunction result') }
//         else {
//             console.assert(false)
//             document.querySelector("#asteroid-list").innerHTML = ""
//             dateKey = e.target.input.value
//             const initialLoad = dataForEachDayMenu[`${keyDate}`]
//             initialLoad.forEach(printsDetailedLists)
//         }
//     e.target.reset()
//     })
// }
function buttonEventListeners(dataForButtons) {
    document.querySelector('#day1week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })

    document.querySelector('#day2week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.log('Button 2')
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
        console.log(sortedBySizes)
    })

    document.querySelector('#day3week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })

    document.querySelector('#day4week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })

    document.querySelector('#day5week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })
    document.querySelector('#day6week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })
    document.querySelector('#day7week1').addEventListener('click', (e) => {
        document.querySelector("#asteroid-list").innerHTML = ""
        console.assert(false)
        dateKey = e.target.value
        const sortedBySizes = sortsBySizes(dataForButtons[`${dateKey}`]);
        sortedBySizes.forEach(printsDetailedLists)
        enablesSortingDropDownMenu(dataForButtons[`${dateKey}`])
    })
}



function isPotentiallyHazardousWithDateAndSize(dataForHazardous) {
    for (let key of Object.keys(dataForHazardous)) {
        for (let i = 0; i < dataForHazardous[key].length; i++) {
            if (dataForHazardous[key][i].is_potentially_hazardous_asteroid == true) {
                hazardousAsteroids = dataForHazardous[key][i]

                printsDetailedLists(hazardousAsteroids)
                //console.log(`(${data[key][i].name}) potentially hazardous: ${hazardousAsteroids.is_potentially_hazardous_asteroid}`)
            }
        }
    }
}

//returns the miss distance of all data points SORTED - right now only works one day at a time
//i.e. will return sorted within the day but not in relation to all of each other
//return new array for each search result and sort based off that?
//have the date key be a second parameter so that each choice of date would vary
//or have retrieve functions return new arrays that are than sorted through & printed

function sortsByDistance(dataForDistance) {
    for (let i = 0; i < dataForDistance.length; i++) {
        let sortedByDistance = dataForDistance.sort(
            (a, b) =>
                parseFloat(a.close_approach_data["0"].miss_distance.astronomical) -
                parseFloat(b.close_approach_data["0"].miss_distance.astronomical)
        );
        // console.log(
        //     `(${sortedByDistance[i].name}) distance missed earth by: ${sortedByDistance[i].close_approach_data["0"].miss_distance.astronomical}`
        // );
        return sortedByDistance;
    }
}

function sortsByVelocity(dataForSpeed) {
    for (let i = 0; i < dataForSpeed.length; i++) {
        let sortedBySpeed = dataForSpeed.sort(
            (a, b) =>
                parseFloat(
                    a.close_approach_data["0"].relative_velocity.kilometers_per_second
                ) -
                parseFloat(
                    b.close_approach_data["0"].relative_velocity.kilometers_per_second
                )
        );
        // console.log(
        //     `(${sortedBySpeed[i].name}) approach velocity: ${sortedBySpeed[i].close_approach_data["0"].relative_velocity.kilometers_per_second}`
        // );
        return sortedBySpeed;
    }
}

function sortsBySizes(dataForSize) {
    //console.assert(dateKey != null, "dateKey is null!!")
    for (let i = 0; i < dataForSize.length; i++) {
        let sortedBySize = dataForSize.sort(
            (a, b) =>
                parseFloat(a.estimated_diameter.kilometers.estimated_diameter_max) -
                parseFloat(b.estimated_diameter.kilometers.estimated_diameter_max)
        );
        // console.log(
        //     `(${sortedBySize[i].name}) estimated diameter: ${sortedBySize[i].estimated_diameter.kilometers.estimated_diameter_max} kilometres`
        // );
        return sortedBySize;
    }
}

function printsDetailedLists(dataPoint) {
    currentAsteroid = dataPoint;

    const asteroidFlexContainers = document.createElement("div");
    document.querySelector("#asteroid-list").append(asteroidFlexContainers);

    const nameFieldTitle = document.createElement("h3");
    nameFieldTitle.textContent = `Name Of Asteroid:`;
    nameFieldTitle.id = "name-field-title";
    asteroidFlexContainers.append(nameFieldTitle);

    const nameField = document.createElement("h1");
    nameField.textContent = `${dataPoint.name}`;
    nameField.id = "name-field";
    asteroidFlexContainers.append(nameField);

    const dateAndTimeField = document.createElement("p");
    dateAndTimeField.textContent = `Date Passed By: ${dataPoint.close_approach_data[0].close_approach_date_full}`;
    dateAndTimeField.id = "dateAndTimeField";
    asteroidFlexContainers.append(dateAndTimeField);

    const distanceField = document.createElement("p");
    distanceField.textContent = `Distance Missed Earth By: ${dataPoint.close_approach_data[0].miss_distance.astronomical} astronomical units`;
    distanceField.id = "distance-field";
    asteroidFlexContainers.append(distanceField);

    const speedField = document.createElement("p");
    speedField.textContent = `Velocity When Passing: ${dataPoint.close_approach_data[0].relative_velocity.kilometers_per_second} kilometres per second`;
    speedField.id = "speed-field";
    asteroidFlexContainers.append(speedField);

    const sizeField = document.createElement("p");
    sizeField.textContent = `Estimated Diameter In: ${dataPoint.estimated_diameter.kilometers.estimated_diameter_max} kilometres`;
    sizeField.id = "size-field";
    asteroidFlexContainers.append(sizeField);

    const hazardFieldTitle = document.createElement("p");
    hazardFieldTitle.textContent = "Classified as Potentially Hazardous Asteroid";
    asteroidFlexContainers.append(hazardFieldTitle);

    if (dataPoint.is_potentially_hazardous_asteroid == true) {
        const hazardField = document.createElement("h3");
        hazardField.textContent = "🦖 The end is nigh 🦕";
        hazardField.id = "hazard-returns-true";
        hazardFieldTitle.insertAdjacentElement("beforeend", hazardField);
    } else {
        const hazardField = document.createElement("h3");
        hazardField.textContent = "Safe!";
        hazardField.id = "hazard-returns-false";
        hazardFieldTitle.insertAdjacentElement("beforeend", hazardField);
    }

    //assignAsteroidBackground(dataPoint)
}

/*
//function assigns scaled asteroid image as background to details div element
function assignAsteroidBackground(dataPoint) {
    if (dataPoint.close_approach_data[0].close_approach_date_full < RANGE 1) {
        BACKGROUNDIMAGE.SRC = SMALLEST ASTEROID PNG
    }
    else if (dataPoint.close_approach_data[0].close_approach_date_full < RANGE 2) {
        BACKGROUNDIMAGE.SRC = SECOND SMALLEST ASTEROID PNG
    } else if (dataPoint.close_approach_data[0].close_approach_date_full < ETC) {
        ETC
    } else {ETC}
}
*/

function enablesSortingDropDownMenu(dataForSortingDropDown) {
    console.log("test")
    console.assert(false)
    document
        .querySelector("#sorting-drop-down-menu")
        .addEventListener("change", (e) => {
            e.preventDefault();

            if (e.target.value === "arrangeBySize") {
                console.log("hello from the event listener arrange 1")
                document.querySelector("#asteroid-list").innerHTML = "";
                const sortedBySizes = sortsBySizes(dataForSortingDropDown);
                //having two random asteroids  show up on console log - wait are they from my sorting?
                sortedBySizes.forEach(printsDetailedLists);
                //console.log(sortedBySizes);
            } else if (e.target.value === "arrangeBySpeed") {
                document.querySelector("#asteroid-list").innerHTML = "";
                const sortedByVelocity = sortsByVelocity(dataForSortingDropDown);
                sortedByVelocity.forEach(printsDetailedLists);
                //console.log(sortedByVelocity);
            } else {
                document.querySelector("#asteroid-list").innerHTML = "";
                const sortedByDistance = sortsByDistance(dataForSortingDropDown);
                sortedByDistance.forEach(printsDetailedLists);
                //console.log(sortedByDistance);
            }

            e.target.reset;
        })
}

/*
when sorting based off what matches will I have to return a new object that then will have the sort function
called on it? or can i just link the functions? 
*/
function enablesSortingDropDownMenu(data) {
    document
       .querySelector("#sorting-drop-down-menu")
       .addEventListener("change", (e) => {
         e.preventDefault();
         console.log("hello from the event listener");
 
         if (e.target.value === "arrangeBySize") {
           document.querySelector("#asteroid-list").innerHTML = "";
           const sortedBySizes = sortsBySizes(data);
           //having two random asteroids  show up on console log - wait are they from my sorting?
           sortedBySizes.map(printsDetailedLists);
           console.log(sortedBySizes);
         } else if (e.target.value === "arrangeBySpeed") {
           document.querySelector("#asteroid-list").innerHTML = "";
           const sortedByVelocity = sortsByVelocity(data);
           sortedByVelocity.forEach(printsDetailedLists);
           console.log(sortedByVelocity);
         } else {
           document.querySelector("#asteroid-list").innerHTML = "";
           const sortedByDistance = sortsByDistance(data);
           sortedByDistance.forEach(printsDetailedLists);
           console.log(sortedByDistance);
         }
 
         e.target.reset;
       })
     }
