I am using the NASA Near Earth Object Web Service API. Right now I have copy pasted seven arrays that have between nine and twenty two objects representing asteroids to a locally hosted JSON file so I can practice with nested information. Each object is populated with information that the website is supposed to make it easier to sort through. The fields I am thinking of using so far are “was it potentially hazardous”, the size, the speed, how close it passed to Earth, and the date. For my event listeners I am thinking of drop down menus which I believe would be a click; a hover event that would result in a rollover with detailed information; and a form submit for naming one of the objects which would then be patched to the database.

The database produces one json file for the max of a seven day range, at the moment you can only access pre-selected weeks, I would however eventually like to change the list elements of which week to view to a form input where the dates would be a variable and the user could choose their own range. The day drop down menu would have to take it's values from the form input so am leaving that idea at the moment to produce a viable product.

JAVASCRIPT
    A form to select the specific day, each near miss would show up on a different size gray circle
    -(maybe make an array of random asteroid images for the text to appear on)
    -wse a comparison for scale for which would show up

    if is_potentially_hazardous_asteroid = true
    display estimated_diameter.kilometers
    of interest to look at close_approach_data[i].relative_velocity.kilometers_per_second
                        close_approach_data[i].miss_distance.kilometers


    Main goal should be for users to easily interact with the data and choose how it is displayed.



LAYOUT
-100% span header on alt colour
-asteroids show up on scaled asteroid pngs
    -stored in seperate array
    -scaled: array of images reflective of relative estimated_diameter.kilometers.estimated_diameter_max
        -collect range of estimated_diameter.kilometers.estimated_diameter_max sizes and break into 5
-drop down menus - if hazardous  + the information can be sorted by
    filter by: size
    filter by: speed
    sort by: distance from earth
-each result will display collection of asteroids that match true and be sorted

