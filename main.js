import $, { each, event } from 'jquery'

const app = {
    playerPosition: '???',
    level: 0,
    currentMap: [],
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


const currentMapProcessing = () => {//to render map readable
    const currentMap = app.maps[app.level] //map of current level
    const currentMapRows = currentMap.split('\n') //create rows
    const currentMapArray = []
    for (const row in currentMapRows) {
        const points = currentMapRows[row].split('') //separate each point in each row
        currentMapArray.push(points)//recompile rows with separated points in arrays
    }
    return currentMapArray
}

const paintMap = () => {
    app.currentMap = currentMapProcessing()
    const $body = $('body')
    const $map = $('<section>').addClass('map')
    for (const row in app.currentMap) { //for each row of map
        const $section = $('<section>').addClass('row')//each section represents a row
        for (const point in app.currentMap[row]) { //for each point in each row
            let pointSymbol = app.currentMap[row][point] //each point
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


//find player's point
const playerOriginalPosition = () => {
    for (const row in app.currentMap) {
        const position = []
        for (const column in app.currentMap) {
            if (app.currentMap[row][column] === '@') {//check if the element is @
                position.push(parseInt(row), parseInt(column))
                return position
            }
        }
    }
}

paintMap()
// console.log(playerOriginalPosition())
// console.log(app)


//paint new map



//detect movement and change map


window.onkeydown = (event) => { //finds out which arrow key is pressed and updates playerPosition etc
    const playerPosition = playerOriginalPosition()
    if (event.key==='ArrowUp') {
        const precedingPoint = [] //for behind new player position
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]
        
        playerPosition[0] -=1


        const followingPoint = [] //for infront of new player position
        followingPoint[0] = playerPosition[0] -1
        followingPoint[1] = playerPosition[1]

        console.log(precedingPoint)
        console.log(playerPosition)
        console.log(followingPoint)
        console.log('up')
    } else if (event.key==='ArrowDown') {
        const precedingPoint = [] //for behind new player position
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]
        
        playerPosition[0] +=1


        const followingPoint = [] //for infront of new player position
        followingPoint[0] = playerPosition[0] +1
        followingPoint[1] = playerPosition[1]

        console.log(precedingPoint)
        console.log(playerPosition)
        console.log(followingPoint)

        console.log('down')
    } else if (event.key==='ArrowLeft') {
        const precedingPoint = [] //for behind new player position
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]
        
        playerPosition[1] -=1


        const followingPoint = [] //for infront of new player position
        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] -1

        console.log(precedingPoint)
        console.log(playerPosition)
        console.log(followingPoint)

        console.log('left')
    } else if (event.key==='ArrowRight') {
        const precedingPoint = [] //for behind new player position
        precedingPoint[0] = playerPosition[0]
        precedingPoint[1] = playerPosition[1]
        
        playerPosition[1] +=1


        const followingPoint = [] //for infront of new player position
        followingPoint[0] = playerPosition[0]
        followingPoint[1] = playerPosition[1] +1

        console.log(precedingPoint)
        console.log(playerPosition)
        console.log(followingPoint)

        console.log('right')
    }
}

//every move will change current, new and ahead point