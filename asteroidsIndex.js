//PRINTS TITLES ONLY

let dateKey = '2023-01-01';
let asteroidWeekData

// document.querySelector('#each-day-week-1').style.display = "none"
// document.querySelector('#each-day-week-2').style.display = "none"
document.querySelector('#sort-by').style.display = "none"
document.querySelector('#each-day').style.display = 'none'

//working on range input form
fetch('http://localhost:3000/dates')
.then(res=>res.json())
.then(data=>{ 
    data.dayValues.forEach(addsStartDayOptions)
    data.monthValues.forEach(addsStartMonthOptions)
    data.dayValues.forEach(addsEndDayOptions)
    data.monthValues.forEach(addsEndMonthOptions)
    submitsDateEnablesMenu()

    })
let dayDateStart
let monthDateStart
let dayDateEnd
let monthDateEnd
let dateRange

//populate day input from json - validation function
function addsStartDayOptions(data){
    const dayStartInputValue = document.createElement('option')
    dayStartInputValue.innerText = data
    dayStartInputValue.value = data
    document.querySelector('#set-day-start').append(dayStartInputValue)
}
function addsStartMonthOptions(data){
    const monthStartInputValue = document.createElement('option')
    monthStartInputValue.innerText = data
    monthStartInputValue.value = data
    document.querySelector('#set-month-start').append(monthStartInputValue)
    //console.log(data)
}
function addsEndDayOptions(data){
    const dayEndInputValue = document.createElement('option')
    dayEndInputValue.innerText = data
    dayEndInputValue.value = data
    document.querySelector('#set-day-end').append(dayEndInputValue)
}
function addsEndMonthOptions(data){
    const monthEndInputValue = document.createElement('option')
    monthEndInputValue.innerText = data
    monthEndInputValue.value = data
    document.querySelector('#set-month-end').append(monthEndInputValue)
    //console.log(data)
}

//submit event
//inputs dates from set-db-range form
//uses them to fetch that set of data
//returns those dates as part of a new array - dateRange
function submitsDateEnablesMenu(){document.querySelector('#set-db-range').addEventListener('submit', (e) => {
    e.preventDefault()
    dayDateStart = e.target['set-day-start'].value
    monthDateStart = e.target['set-month-start'].value
    dayDateEnd = e.target['set-day-end'].value
    monthDateEnd = e.target['set-month-end'].value
    fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-${monthDateStart}-${dayDateStart}&end_date=2023-${monthDateEnd}-${dayDateEnd}&api_key=${NASA_AUTH_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            dateRange = Object.keys(data.near_earth_objects)
            dateRange.forEach(populatesDayOptions)
            isPotentiallyHazardousPopulates(data.near_earth_objects)
            enablesDayDropDown(data.near_earth_objects)
        })
    
    document.querySelector('#each-day').style.display = 'block'
    
    e.target.reset()})}

//dateRange has to be used to populate specific day options dateRange.forEach
//and input into the correct value

function populatesDayOptions(userDateRange){
    const eachDayData = document.createElement('option')
    eachDayData.innerText = userDateRange
    eachDayData.value = userDateRange
    document.querySelector('#day-drop-down-menu').append(eachDayData)
}

function enablesDayDropDown(dataForDayDropDown) {
    document.querySelector('#day-drop-down-menu').addEventListener('change', (e) => {
        e.preventDefault()
        if (e.target.value === 'hazardfunction') {console.log(hazard)
            document.querySelector("#asteroid-list").innerHTML = ""
            isPotentiallyHazardousPopulates(dataForDayDropDown)
            document.querySelector('#sort-by').style.display = "none"
        }
        else {
            document.querySelector("#asteroid-list").innerHTML = ""
            dateKey = e.target.value
            const initialLoad = dataForDayDropDown[`${dateKey}`]
                  initialLoad.forEach(printsDetailedLists)

            document.querySelector('#sort-by').style.display = "block"

            enablesSortingDropDownMenu(dataForDayDropDown[`${dateKey}`])
        }
    })
}

// //fetch for January First - January Seventh
// document.querySelector('#week-1').addEventListener('click', (e) => {
//     fetch(
//         `https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=${NASA_AUTH_KEY}`
//     )
//         .then((res) => res.json())
//         .then((data) => {
//             enableDayDropDownMenuWeek1(data.near_earth_objects)
//             asteroidWeekData = data.near_earth_objects
    
//             //event listner for form submits will lead to the fully populated body
//         })
    
//         document.querySelector('#each-day-week-1').style.display = "block"


// })

let currentAsteroid;
//document.querySelector('#day-drop-down-menu').addEventListener('mouseover', ()=> document.querySelector('#sorting-option-div').style.display = "block")


let hazardousAsteroids

function enableDayDropDown(dataForDayDropDown) {
    document.querySelector('#day-drop-down-menu-week-1').addEventListener('change', (e) => {
        e.preventDefault()
        if (e.target.value === 'hazardfunction') {
            document.querySelector("#asteroid-list").innerHTML = ""
            isPotentiallyHazardousPopulates(dataForDayDropDown)
            document.querySelector('#sort-by').style.display = "none"
        }
        else {
            document.querySelector("#asteroid-list").innerHTML = ""
            dateKey = e.target.value
            const initialLoad = dataForDayDropDown[`${dateKey}`]
                  initialLoad.forEach(printsDetailedLists)

            document.querySelector('#sort-by').style.display = "block"

            enablesSortingDropDownMenu(dataForDayDropDown[`${dateKey}`])
        }
    })
}

function enableDayDropDownMenuWeek2(dataForDayDropDown) {
    document.querySelector('#day-drop-down-menu-week-2').addEventListener('change', (e) => {
        e.preventDefault()
        if (e.target.value === 'hazardfunction') {
            document.querySelector("#asteroid-list").innerHTML = ""
            isPotentiallyHazardousPopulates(dataForDayDropDown)
            document.querySelector('#sort-by').style.display = "none"
        }
        else {
            document.querySelector("#asteroid-list").innerHTML = ""
            dateKey = e.target.value
            const initialLoad = dataForDayDropDown[`${dateKey}`]
                  initialLoad.forEach(printsDetailedLists)

            document.querySelector('#sort-by').style.display = "block"

            enablesSortingDropDownMenu(dataForDayDropDown[`${dateKey}`])
        }
    })
}


//returns only those data points that return as true to hazardous and are identified with their date & size
//POPULATES BODY
function isPotentiallyHazardousPopulates(dataForHazardous) {
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
