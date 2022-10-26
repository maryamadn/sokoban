# SOKOBAN

This game was built with JavaScript, jQuery, CSS mainly within a week and deployed in Vercel. Click [here](https://sokobangame.vercel.app/) to play!

Try it out and feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/maryamad/) or at maryamahmaddahlan@gmail.com!

## Game Breakdown

![](https://user-images.githubusercontent.com/106648853/198065305-f7b9d60d-2ce3-45b0-9f61-05c8d563e486.png)

## Aim

Push all Coins into Chests

## Rules

- Player can move in 4 directions with arrow key presses
- Player and Coins cannot move through walls, only through Floors and Chests
- Player can push a Coin (provided its not blocked by a Wall or another Coin)

## Levels

Currently, there are only 5 levels to the game for the purpose of demonstrating the completion of all levels. Levels can be easily added and they are sourced [here](http://www.abelmartin.com/rj/sokobanJS/Skinner/David%20W.%20Skinner%20-%20Sokoban.htm). These are called Microban levels created by David W. Skinner.

## Features

### Create/Load Game
- Local Storage
  - Upon creation of a new game, it will check for the existence of the username in localStorage (getItem()), and return error when necessary
  - If successful, the localStorage will be updated accordingly
  
<img src="https://user-images.githubusercontent.com/106648853/198076819-c8ef36df-7f0f-40af-9d9e-aec8de601a82.png" height="100" />

- Error Messages
  - Invalid entry (empty or spaces) are not accepted
  - Invalid username or password

### Loading Bar Page
- For user experience
- Width changes 0 – 100 in 30ms intervals
- Changes to gamePage after 6000ms (loading bar is complete)

![](https://user-images.githubusercontent.com/106648853/198070450-4e4e56fb-8561-476b-9f9b-d6c46f8a5b98.png)

### Game
- Reset/Quit

<img src="https://user-images.githubusercontent.com/106648853/198071431-42722060-9ec7-4eff-b25e-b5fe45a6c16f.png" height="400" />

- Next level (Progress will be saved for each game account)

![](https://user-images.githubusercontent.com/106648853/198070072-e6478814-dcdf-4d4b-9391-52e100f747c6.png)

- Complete all levels

![](https://user-images.githubusercontent.com/106648853/198071031-35e0631c-30ee-43e2-82a2-f83860c32012.png)


### Leaderboard
- Empty

![](https://user-images.githubusercontent.com/106648853/198070475-f5c770b1-8117-457a-a726-527ce41f224a.png)

- Filled

![](https://user-images.githubusercontent.com/106648853/198070501-fe1819e2-88bf-479d-88c2-9fb7c5616b40.png)

## Responsiveness
Basic CSS was used to ensure responsiveness across devices/screens. There are differences in layout/sizes at screen widths of 400px and below, between 401px and 650px, and above 650px.

## Coding Logic
I would like to share a snippet of the logic involved in creating this game. The most important thing to consider is the restrictions in movement.
As per the rules, players can move in 4 directions as long as they are not blocked by walls. They can also push a coin that is not blocked by another coin or a wall.
Hence, before any movement is made, 2 things need to be checked.

- The following point that the player moves to:
  - It must not be a wall.
  - If it is a coin, the point after the coin must not be a coin or a wall.
  
Once everything is checked and if the movement is not restricted, 3 points will change. The preceding point will change to the point that the player was in previously.
The player point will change to the point that the following point was. Lastly, the following point will take the new point that is after it.

<img src="https://user-images.githubusercontent.com/106648853/198079080-b973c51d-c499-4f7b-adad-2f3cda046842.png" height="400" />

## End Remarks

This is my first game that I made that can be visualised and is deployed through Vercel. Although it took me a while to sort out the logic behind the game, it has been worth it!
I truly enjoyed figuring out how to display the level maps and set the movement restrictions. Creating this puzzle was a delightful puzzle in itself. If you have tried my game,
I hope you enjoyed it as well. If there are any enquiries at all or feedbacks, please do contact me at maryamahmaddahlan@gmail.com. Thank you and have a nice day!
