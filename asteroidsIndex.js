//TO DO PRINTSSORTEDLISTS FUNCTION NEEDS TO BE TURNED TO DETAILS POPULATE
//PRINTSSORTEDLISTS WILL BE THE LESS DETAILED VERSION ROLLOVER CALLBACK WILL CALL DETAILS

let dateKey

//fetch for January First - January Seventh
fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=2023-01-01&end_date=2023-01-07&api_key=${NASA_AUTH_KEY}`)
    .then(res => res.json())
    .then(data => {
        dateKey = data.near_earth_objects
        const sortedBySizes = sortsBySizes(data.near_earth_objects)
                sortedBySizes.map(printsDetailedLists)
        //printsSortedLists should be called on an array of hazardous asteroids as default load
        //event listner for form submits will lead to the fully populated body

        // const sortedBySizes = sortsBySizes(data.near_earth_objects)
        // sortedBySizes.map(printsDetailedLists)
        console.log('console.log: basic fetch working')

        
        document.querySelector('#sorting-drop-down-menu').addEventListener('change', (e)=>{
            e.preventDefault()
            console.log('hello from the event listener')
            
            //console.log(sortsBySizes(data.near_earth_objects))

            //only getting two elements returned in console.log in first if statement when I just call sortsBySizes, if I take the retun
            //out of the sortsBySizes functions i can console.log all elements so wtf

            //functions are working if statements are not
            
            if (e.target.value === 'arrangeBySize'){
                console.log('hello from the event listener')
                const sortedBySizes = sortsBySizes(data.near_earth_objects)
                //having two random asteroids  show up on console log - wait are they from my sorting?
                sortedBySizes.map(printsDetailedLists)
                console.log(sortedBySizes)
            } else if (e.target.value ==='arrangeBySpeed'){
                const sortedByVelocity = sortsByVelocity(data.near_earth_objects)
                sortedByVelocity.forEach(printsDetailedLists)
                console.log(sortedByVelocity)
            } else {
                const sortedByDistance = sortsByDistance(data.near_earth_objects)
                sortedByDistance.forEach(printsDetailedLists)
                console.log(sortedByDistance)
            }
        })
        
    })

let currentAsteroid

//first function: returns only those data points that return as true to hazardous and are identified with their date & size
function isPotentiallyHazardousWithDateAndSize(data) {
    for (let key of Object.keys(data)) {
        for (let i = 0; i < data[key].length; i++) {
            if (data[key][i].is_potentially_hazardous_asteroid == true) {
                console.log(`(${data[key][i].name}) potentially hazardous: ${data[key][i].is_potentially_hazardous_asteroid}`)
            }
        }
    }
}

//returns the miss distance of all data points SORTED - right now only works one day at a time
//i.e. will return sorted within the day but not in relation to all of each other
//return new array for each search result and sort based off that?
//have the date key be a second parameter so that each choice of date would vary
//or have retrieve functions return new arrays that are than sorted through & printed

function sortsByDistance(data) {
    for (let i = 0; i < data['2023-01-01'].length; i++) {
        let sortedByDistance = data['2023-01-01'].sort((a, b) => parseFloat(a.close_approach_data['0'].miss_distance.astronomical) - parseFloat(b.close_approach_data['0'].miss_distance.astronomical))
        console.log(`(${sortedByDistance[i].name}) distance missed earth by: ${sortedByDistance[i].close_approach_data['0'].miss_distance.astronomical}`)
        return sortedByDistance
    }

}

function sortsByVelocity(data) {
    for (let i = 0; i < data['2023-01-01'].length; i++) {
        let sortedBySpeed = data['2023-01-01'].sort((a, b) => parseFloat(a.close_approach_data['0'].relative_velocity.kilometers_per_second) - parseFloat(b.close_approach_data['0'].relative_velocity.kilometers_per_second))
        console.log(`(${sortedBySpeed[i].name}) approach velocity: ${sortedBySpeed[i].close_approach_data['0'].relative_velocity.kilometers_per_second}`)
        return sortedBySpeed
    }

}

function sortsBySizes(data) {
    // let sortedBySize = data['2023-01-01'].sort((a, b) => parseFloat(a.estimated_diameter.kilometers.estimated_diameter_max) - parseFloat(b.estimated_diameter.kilometers.estimated_diameter_max))
    // return sortedBySize
    let sortedBySize = data['2023-01-01'].sort((a, b) => parseFloat(a.estimated_diameter.kilometers.estimated_diameter_max) - parseFloat(b.estimated_diameter.kilometers.estimated_diameter_max))
    // for (let i = 0; i < data['2023-01-01'].length; i++) {
    //     console.log(`(${sortedBySize[i].name}) estimated diameter: ${sortedBySize[i].estimated_diameter.kilometers.estimated_diameter_max} kilometres`)   
    // }
    // console.log(sortedBySize)
    return sortedBySize
}

function printsDetailedLists(dataPoint) {
    currentAsteroid = dataPoint

    const asteroidFlexContainers = document.createElement('div')
    console.log(document.querySelector("#asteroid-list"))
    document.querySelector('#asteroid-list').append(asteroidFlexContainers)

    const nameFieldTitle = document.createElement('h3')
    nameFieldTitle.textContent = `Name Of Asteroid:`
    nameFieldTitle.id = 'name-field-title'
    asteroidFlexContainers.append(nameFieldTitle)

    const nameField = document.createElement('h1')
    nameField.textContent = `${dataPoint.name}`
    nameField.id = 'name-field'
    asteroidFlexContainers.append(nameField)

    const dateAndTimeField = document.createElement('p')
    dateAndTimeField.textContent = `Date Passed By: ${dataPoint.close_approach_data[0].close_approach_date_full}`
    dateAndTimeField.id = 'dateAndTimeField'
    asteroidFlexContainers.append(dateAndTimeField)

    const distanceField = document.createElement('p')
    distanceField.textContent = `Distance Missed Earth By: ${dataPoint.close_approach_data[0].miss_distance.astronomical} astronomical units`
    distanceField.id = 'distance-field'
    asteroidFlexContainers.append(distanceField)

    const speedField = document.createElement('p')
    speedField.textContent = `Velocity When Passing: ${dataPoint.close_approach_data[0].relative_velocity.kilometers_per_second} kilometres per second`
    speedField.id = 'speed-field'
    asteroidFlexContainers.append(speedField)

    const sizeField = document.createElement('p')
    sizeField.textContent = `Estimated Diameter In: ${dataPoint.estimated_diameter.kilometers.estimated_diameter_max} kilometres`
    sizeField.id = 'size-field'
    asteroidFlexContainers.append(sizeField)

    const hazardFieldTitle = document.createElement('p')
    hazardFieldTitle.textContent = "Classified as Potentially Hazardous Asteroid"
    asteroidFlexContainers.append(hazardFieldTitle)

    if (dataPoint.is_potentially_hazardous_asteroid == true) {
        const hazardField = document.createElement('h3')
        hazardField.textContent = "🦖 The end is nigh 🦕"
        hazardField.id = 'hazard-returns-true'
        hazardFieldTitle.insertAdjacentElement('beforeend', hazardField)
    } else {
        const hazardField = document.createElement('h3')
        hazardField.textContent = 'Safe!'
        hazardField.id = 'hazard-returns-false'
        hazardFieldTitle.insertAdjacentElement('beforeend', hazardField)
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




/*
when sorting based off what matches will I have to return a new object that then will have the sort function
called on it? or can i just link the functions? 
*/
