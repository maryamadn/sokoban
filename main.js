import $, { each, event } from 'jquery'

const app = {
    level: 0,
    maps: [
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


const currentMap = app.maps[app.level] //map of current level
const currentMapProcessing = () => {//to render map readable
    const currentMapRows = currentMap.split('\n') //create rows
    const currentMapArray = []
    for (const row in currentMapRows) {
        const points = currentMapRows[row].split('') //separate each point in each row
        currentMapArray.push(points)//recompile rows with separated points in arrays
    }
    return currentMapArray
}

const paintOriginalMap = () => {
    const $body = $('body')
    const $map = $('<section>').addClass('map')
    for (const row in currentMapProcessing()) { //for each row of map
        const $section = $('<section>').addClass('row')//each section represents a row
        for (const point in currentMapProcessing()[row]) { //for each point in each row
            let pointSymbol = currentMapProcessing()[row][point] //each point
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
            const $div = $('<div>').addClass(pointSymbol).attr('id','point') //each div represents a point with respective classes (except ' ')
            $section.append($div)
        }
        $body.append($map)
        $map.append($section)
    }
    return $body
}



paintOriginalMap()


//paint new map


//find player's point
const playerPosition = () => {
    for (const row in currentMapProcessing()) {
        const position = []
        for (const column in currentMapProcessing()) {
            if (currentMapProcessing()[row][column] === '@') {//check if the element is @
                position.push(row, column)
                return position
            }
        }
    }
}

//detect movement and change map


window.onkeydown = (event) => { //finds out which arrow key is pressed and updates playerPosition
    if (event.key==='ArrowUp') {
        console.log(playerPosition()[0] -=1)

    } else if (event.key==='ArrowDown') {
        console.log(playerPosition()[0] +=1)
        console.log('down')
    } else if (event.key==='ArrowLeft') {
        console.log(playerPosition()[1] -=1)
        console.log('left')
    } else if (event.key==='ArrowRight') {
        console.log(playerPosition()[1] +=1)
        console.log('right')
    }
}