import $, { each, event, post } from 'jquery'

const app = {
    level: 0,
    original: true,
    allCoordinates: [],
    // prevCoordinates: [],
    currentMap: [],
    maps: [//put in separate js file and import/export eg export function setupCounter(element) and  imprt {setupCounter} from 'file.js'
        `####
# .#
#  ###
#*@  #
#  $ #
#  ###
####`,

        `######
#    #
# #@ #
# $* #
# .* #
#    #
######`,

        `  ####
###  ####
#     $ #
# #  #$ #
# . .#@ #
#########`,

        `########
#      #
# .**$@#
#      #
#####  #
    ####`,

        ` #######
 #     #
 # .$. #
## $@$ #
#  .$. #
#      #
########`//microban level 5
    ]
}


const originalMapProcessing = () => {//to render map readable (from string to array)
    app.currentMap = app.maps[app.level] //map of current level
    const currentMap = app.currentMap//this is not yet an ARRAY so... diff from current map after moves are done
    const currentMapRows = currentMap.split('\n') //create rows
    const currentMapArray = []
    for (const row of currentMapRows) {
        const points = row.split('') //separate each point in each row
        currentMapArray.push(points)//recompile rows with separated points in arrays
    }
    return currentMapArray
}

const paintMap = () => {
    if (app.original) {
        app.currentMap = originalMapProcessing()
    }
    const $body = $('body')
    $body.empty()
    const $map = $('<section>').addClass('map')
    for (const row of app.currentMap) { //for each row of map
        const $section = $('<section>').addClass('row')//each section represents a row
        for (const point of row) { //for each point in each row
            let pointSymbol = point //each point
            if (pointSymbol === '#') {
                pointSymbol = 'wall'
            } else if (pointSymbol === '@') {
                pointSymbol = 'player'
            } else if (pointSymbol === '$') {
                pointSymbol = 'box'
            } else if (pointSymbol === '.') {
                pointSymbol = 'goal'
            } else if (pointSymbol === '*') {
                pointSymbol = 'box_on_goal'
            } else if (pointSymbol === '+') {
                pointSymbol = 'player_on_goal'
            } else if (pointSymbol === ' ') {
                pointSymbol = 'floor'
            }
            const $div = $('<div>').text(point).addClass(pointSymbol).attr('id', 'point') //each div represents a point with respective classes (except ' ')
            $section.append($div)
        }
        $body.append($map)
        $map.append($section)
    }
    return $body
}




//find player's original point
const playerOriginalPosition = () => {
    for (const row in app.currentMap) {
        const position = []
        for (const column in app.currentMap[row]) {//why is this no different froma just app.currentMap
            if (app.currentMap[row][column] === '@' || app.currentMap[row][column] === '+') {//check if the element is player or player on goal
                position.push(parseInt(row), parseInt(column))
                return position
            }
        }
    }
}



paintMap()//can be used for reset
//switch case
window.onkeydown = (event) => { //finds out which arrow key is pressed and updates playerPosition, precedingPoint, and followingPoint
    // paintMap()
    let playerPosition = playerOriginalPosition()
    let coordinates = [] //compile all coordinates
    let precedingPoint = []
    let followingPoint = []

    // if (!app.original) {
    //     precedingPoint = app.allCoordinates[0]
    //     playerPosition = app.allCoordinates[1]
    //     followingPoint = app.allCoordinates[2]
    //     coordinates.push(precedingPoint, playerPosition, followingPoint)

    //     console.log('here')
    // }
    // app.prevCoordinates = [precedingPoint, playerPosition, followingPoint]

    if (event.key === 'ArrowUp') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[0] -= 1

        followingPoint[0] = playerPosition[0] - 1
        followingPoint[1] = playerPosition[1]

        console.log('up')
    } else if (event.key === 'ArrowDown') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[0] += 1

        followingPoint[0] = playerPosition[0] + 1
        followingPoint[1] = playerPosition[1]

        console.log('down')
    } else if (event.key === 'ArrowLeft') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[1] -= 1

        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] - 1

        console.log('left')
    } else if (event.key === 'ArrowRight') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[1] += 1

        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] + 1

        console.log('right')
    }

    coordinates[0] = precedingPoint
    coordinates[1] = playerPosition
    coordinates[2] = followingPoint

    const restrictedRow = coordinates[1][0]
    const restrictedColumn = coordinates[1][1]
    const restrictedRow1 = coordinates[2][0]
    const restrictedColumn1 = coordinates[2][1]
    let restrictions = ''
    let restrictions1 = ''
    if (restrictedRow >= 0 && restrictedColumn >= 0 && restrictedRow1 >= 0 && restrictedColumn1 >= 0 ) {
        restrictions = app.currentMap[restrictedRow][restrictedColumn] //check for restrictions of player movement
        restrictions1 = app.currentMap[restrictedRow1][restrictedColumn1] //check for restrictions based on following point
        // console.log(restrictions)
        // console.log(restrictions1)
        if (restrictions === '#' || ((restrictions === '$' || restrictions === '*') && (restrictions1 === '#' || restrictions1 === '$' || restrictions1 === '*'))) {//check restriction: whether the player has a wall infront of them or not
            console.log('in grid but move restricted')
            // console.log(app.allCoordinates)
        } else {
            app.allCoordinates = coordinates
            console.log('dapat move')
            // console.log(app.allCoordinates)
            updateSymbols()
            paintMap()
        }
    } else {
        console.log('over the grid alr')
        app.allCoordinates = []
        // console.log(app.allCoordinates)
    }


    app.original = false//!!!!!!!!!!!!!!!!!!!!!!!!!!double check
    // console.log(app.allCoordinates)
    // render()
    

}

// const render = () => {
//     updateSymbols(playerPosition)
// }



//change to switch case
//check restriction and change symbols
const updateSymbols = () => {
    for (let i = 2; i>=0; i--) {//change....
        const row = app.allCoordinates[i][0]
        const column = app.allCoordinates[i][1]
        const prevRow = app.allCoordinates[1][0]
        const prevColumn = app.allCoordinates[1][1]
        const prevPoint = app.currentMap[prevRow][prevColumn]
        if (row >= 0 && column >= 0) {
            let point = app.currentMap[row][column]
            console.log(point)
            if (i === 0) {//preceding points can only change to floor or goal
                if (point === '@') { //player
                    app.currentMap[row][column] = ' ' //change to floor
                } else if (point === '+') { //player on goal
                    app.currentMap[row][column] = '.' //change to goal
                }
            } else if (i === 1) {//player points can only change to player or player on goal
                if (point === ' ' || point === '$') {//floor or box
                    app.currentMap[row][column] = '@'//player
                } else if (point === '.' || point === '*') {//goal or box on goal
                    app.currentMap[row][column] = '+'//player on goal
                }
            } else if (i === 2) {//following points only need to change to box or box on goal
                if (point === ' ' || point === '.') {
                    if (prevPoint === '$') {
                        app.currentMap[row][column] = '$'
                    } else if (prevPoint === '*') {
                        app.currentMap[row][column] = '*'
                    }
                }
            }
        
        }
    }
}
