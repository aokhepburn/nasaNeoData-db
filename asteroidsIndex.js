/*with the way the search data is currently loading you can add your search data together because 
the submit event doesnt clear out the existing containers.
It is currently a bug because I haven't set up a way to keep track of the seperate fetch's
dayRange array and integrate them so they can be sorted together
To get bug back remove $document.querySelector('#asteroid-list').innerHTML=''
*/

/*loading ca file
https://cneos.jpl.nasa.gov/ca/ov/#load=&time=1688133581000&orientation=0,0,0,1&lookat=Earth&interval=2&eclipticgrid=false&eclipticaxis=false&distance=29919.57414&pitch=0&roll=0&yaw=0&scale=0.8923864590681115&rotateX=-16.318030827136496&rotateY=90.05714870511403&desig=${name}&cajd=2460125.916451321&
*/

let dateKey = '2023-01-01';
let currentAsteroid
let dayDateStart
let monthDateStart
let dayDateEnd
let monthDateEnd
let yearDate = 2023
let dateRange

document.querySelector('#sort-by').style.display = "none"
document.querySelector('#each-day').style.display = 'none'
document.querySelector('#if-hazardous-explanation').style.display = "none"

//let sortedDistance = `.close_approach_data["0"].miss_distance.astronomical`

//fetch for populating range form

const dayValues =  [
      "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
      "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24",
      "25", "26", "27", "28", "29", "30", "31"
    ]
  
const monthValues = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]

dayValues.forEach(populatesDayDatesValues)
monthValues.forEach(populatesMonthDatesValues)
submitsDateEnablesMenu()

function fetchesAPIOffUserDates() {
    fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${yearDate}-${monthDateStart}-${dayDateStart}&end_date=${yearDate}-${monthDateEnd}-${dayDateEnd}&api_key=${NASA_AUTH_KEY}`
    )
        .then((res) => res.json())
        .then((data) => {
            dateRange = Object.keys(data.near_earth_objects)
            dateRange.forEach(populatesDayOptions)
            isPotentiallyHazardousPopulates(data.near_earth_objects)
            enablesDayDropDown(data.near_earth_objects)
        })
}

//populate day input from json - validation function
//needs to be separate functions because they are being called on two different data sets,
//i mean could combine em as two different parameters. Nope! cause i'm calling a for each.
function populatesDayDatesValues(data) {
    const dayStartInputValue = document.createElement('option')
    optionElementPopulator(dayStartInputValue, data)
    document.querySelector('#set-day-start').append(dayStartInputValue)

    const dayEndInputValue = document.createElement('option')
    optionElementPopulator(dayEndInputValue, data)
    document.querySelector('#set-day-end').append(dayEndInputValue)

}

function populatesMonthDatesValues(data) {
    const monthStartInputValue = document.createElement('option')
    optionElementPopulator(monthStartInputValue, data)
    document.querySelector('#set-month-start').append(monthStartInputValue)

    const monthEndInputValue = document.createElement('option')
    optionElementPopulator(monthEndInputValue, data)
    document.querySelector('#set-month-end').append(monthEndInputValue)
}

//so taking the first three and making the helper function
function optionElementPopulator(inputValue, data){
// const inputValue = document.createElement('option')
    inputValue.innerText = data
    inputValue.value = data
    //return inputValue
}

//submit event - inputs dates from set-db-range form & uses them to fetch that set of data
//returns those chosen dates which are used both in the fetch as part of the URL

function submitsDateEnablesMenu() {
    document.querySelector('#set-db-range').addEventListener('submit', (e) => {
        e.preventDefault()
        document.querySelector('#asteroid-list').innerHTML=''

        dayDateStart = e.target['set-day-start'].value
        monthDateStart = e.target['set-month-start'].value

        if (e.target['set-day-end'].value > 7 + parseInt(dayDateStart)) {
            console.log(dayDateStart)
            alert("DATABASE CAN ONLY ACCESS A WEEK'S WORTH OF DATA. PLEASE SHORTEN YOUR TIME SPAN.");
            return false;
        } else { dayDateEnd = e.target['set-day-end'].value }

        monthDateEnd = e.target['set-month-end'].value
        yearDate = e.target['set-year'].value
        //console.log(yearDate)

        //actually returns the data using the values set above as variables in the fetch URL
        fetchesAPIOffUserDates()

        //enables visibility of each day menu
        document.querySelector('#each-day').style.display = 'block'
        populatesAsteroidArrayTitleDiv()
        

        e.target.reset()
    })
}

function populatesAsteroidArrayTitleDiv(){
    document.querySelector('#asteroid-cards-title-h1').textContent =
    `Near Earth Objects From ${monthDateStart}/${dayDateStart}/${yearDate}
    to ${monthDateEnd}/${dayDateEnd}/${yearDate}`
}


//dateRange has to be used to populate specific day options dateRange.forEach
//and input into the correct value
function populatesDayOptions(userDateRange) {
    const eachDayData = document.createElement('option')
    eachDayData.innerText = userDateRange
    eachDayData.value = userDateRange
    document.querySelector('#day-drop-down-menu').append(eachDayData)
}

function enablesDayDropDown(dataForDayDropDown) {
    document.querySelector('#day-drop-down-menu').addEventListener('change', (e) => {
        e.preventDefault()
        if (e.target.value === 'hazardfunction') {
            console.log(hazard)
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

let hazardousAsteroids

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
// function sorting(data, sortChoice){
//     console.log('sorting function')
//     for (let i = 0; i < data.length; i++) {
//         let sortedAsteroids = data.sort(
//             (a, b) =>
//                 parseFloat(a[sortChoice]) -
//                 parseFloat(b[sortChoice])
//         );
//         return sortedAsteroids;
   
// }
// }

// function sortsWithForEach(data, sortChoice){
//     let sortedAsteroids = data.sort(
//         (a, b) =>
//             parseFloat(a[sortChoice]) -
//             parseFloat(b[sortChoice]))
//             return sortedAsteroids
// }

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

/*
function printsFirstCards(dataPoint){
    currentAsteroid = dataPoint
    const asteroidFlexTitleContainers = document.createElement("div");
    document.querySelector("#asteroid-list").append(asteroidFlexTitleContainers);

    const nameField = document.createElement("h3");
    nameField.textContent = `${dataPoint.name}`;
    nameField.id = "name-field";
    asteroidFlexTitleContainers.append(nameField);

    const dateAndTimeField = document.createElement("h2");
    dateAndTimeField.textContent = `Date Passed By: ${dataPoint.close_approach_data[0].close_approach_date_full}`;
    dateAndTimeField.id = "dateAndTimeField";
    asteroidFlexTitleContainers.append(dateAndTimeField);

    const speedField = document.createElement("h2");
    speedField.textContent = `Velocity When Passing: ${dataPoint.close_approach_data[0].relative_velocity.kilometers_per_second} kilometres per second`;
    speedField.id = "speed-field";
    asteroidFlexTitleContainers.append(speedField);

    const sizeField = document.createElement("h2");
    sizeField.textContent = `Estimated Diameter In: ${dataPoint.estimated_diameter.kilometers.estimated_diameter_max} kilometres`;
    sizeField.id = "size-field";
    asteroidFlexTitleContainers.append(sizeField);

    document.querySelector('asteroidFlexTitleContainers').addEventListener('mouseover',(e)=>{
        asteroidFlexTitleContainers.innerHTML=''
        printsDetailedLists(currentAsteroid)
    })
}
*/


function printsDetailedLists(dataPoint) {
    currentAsteroid = dataPoint;
    if (document.querySelector('#day-drop-down-menu').value === 'hazardfunction'){
        document.querySelector('#if-hazardous-explanation').style.display = "block"
    } else {
        document.querySelector('#if-hazardous-explanation').style.display = "none"
    }

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

/*show details:
function printsAsteroidPreviews
[NAME] passed by Earth at a speed of [VELOCITY] kilometres per second on [DATE]

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
                console.log(sortedByDistance)
                //console.log(sortedByDistance);
            }

            e.target.reset;
        })
}
/*
when sorting based off what matches will I have to return a new object that then will have the sort function
called on it? or can i just link the functions? 
*/
