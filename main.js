import $, { each, event, post } from 'jquery'

const app = {
    level: 0,
    original: true,
    allCoordinates: [],
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



paintMap()
//switch case
window.onkeydown = (event) => { //finds out which arrow key is pressed and updates playerPosition, precedingPoint, and followingPoint
    paintMap()
    let playerPosition = playerOriginalPosition()
    let precedingPoint = [] //for behind new player position
    let followingPoint = [] //for infront of new player position
    let allCoordinates = [] //compile all coordinates
    if (!app.original) {
        precedingPoint = app.allCoordinates[0]
        playerPosition = app.allCoordinates[1]
        followingPoint = app.allCoordinates[2]
        console.log('here')
    }
    if (event.key === 'ArrowUp') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[0] -= 1

        followingPoint[0] = playerPosition[0] - 1
        followingPoint[1] = playerPosition[1]

        allCoordinates.push(precedingPoint, playerPosition, followingPoint)
        app.allCoordinates = allCoordinates
        console.log('up')
    } else if (event.key === 'ArrowDown') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[0] += 1

        followingPoint[0] = playerPosition[0] + 1
        followingPoint[1] = playerPosition[1]

        allCoordinates.push(precedingPoint, playerPosition, followingPoint)
        app.allCoordinates = allCoordinates
        console.log('down')
    } else if (event.key === 'ArrowLeft') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[1] -= 1

        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] - 1

        allCoordinates.push(precedingPoint, playerPosition, followingPoint)
        app.allCoordinates = allCoordinates
        console.log('left')
    } else if (event.key === 'ArrowRight') {
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]

        playerPosition[1] += 1

        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] + 1

        allCoordinates.push(precedingPoint, playerPosition, followingPoint)
        app.allCoordinates = allCoordinates
        console.log('right')
    }
    app.original = false//!!!!!!!!!!!!!!!!!!!!!!!!!!double check
    console.log(app.allCoordinates)
    updateSymbols()
    // render()

}

// const render = () => {
//     updateSymbols(playerPosition)
// }



//change to switch case
//check restriction and change symbols
const updateSymbols = () => {
    const playerPosition = app.allCoordinates[0]
    if (playerPosition === '#' || ((playerPosition === '$' || playerPosition === '*') && (followingPoint === '#' || followingPoint === '$' || followingPoint === '*'))) {//check restriction: whether the player has a wall infront of them or not
        console.log('move restricted')
    } else {
        for (let i = 0; i < app.allCoordinates.length; i++) {//change....
            const row = app.allCoordinates[i][0]
            const column = app.allCoordinates[i][1]
            const point = app.currentMap[row][column]
            if (i === 0) {//preceding points can only change to floor or goal
                if (point === '@') { //player
                    point = ' ' //change to floor
                } else if (point === '+') { //player on goal
                    point = '.' //change to goal
                }
            } else if (i === 1) {//player points can only change to player or player on goal
                if (point === ' ') {//floor
                    point = '@'//player
                } else if (point === '.') {//goal
                    point = '+'//player on goal
                }
            } else if (i === 2) {//following points only need to change to box or box on goal
                if (app.currentMap[row][column] === '$') {

                }
                if (point === ' ') {//floor
                    point = '$'//box
                } else if (point === '.') {//goal
                    point = '*'//box on goal
                }
            }
        }
    }
}