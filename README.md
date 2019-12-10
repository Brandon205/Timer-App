# cubeX

## What is it?
cubeX is simply a timer for you to use in whatever way you see fit however it has extra capabilities when used as a Rubik's cube solve timer. In general once a user logs in all of the times that they have is stored in a MongoDB so that no matter where you are logged in your times follow you. The app also will generate a (non-WCA) scramble for some of the more simple cubes though more scramble generators are coming soon. It uses the Ruwix 3D Cube Widget to show you what the scramble should look like. It also has a few data analysis features like calculating your most recent Average of 5, along with your most recent Average of 12. If the option is selected there is also a helpful generated graph of your times in that session so that you can see your progress. Another feature that is coming is a tutorial page in which the user can learn the different move notations along with a basic step-by-step tutorial on how to solve the cube.

## The App
Here is a link to the deployed [app](#). It is a Heroku app so please give it some time to spin up.
Here are some testing credentials: email: t@t.com, password: password

## Pre Day 1 
Once the idea for this app came to my head I started thinking about the features that I wanted the app to have as well as a basic layout of the app. At this time I also looked at other sites that do similar things for users to see what works well and what I would like to change in my version of the app. Most of the base app was made and tested here, so things like getting the timer working and figuring out more on how I would have to do things based on the timer etc.

## Day 1 
After having basic planning laid out I decided on the stack that I was going to use for this project. I am the most experienced with the MERN stack, so I went with that. Instead of using Express for all of the routing including the database routes I also looked into, and decided to use, GraphQL to handle all of the database amnipulation. The rest of the day was finishing up planning including stubbing out the GraphQL routes, and finalizing design and layout plans. Then I started writing out the Queries that I was going to use with GraphQL, prior to this my experience was light with GraphQL, but even then writing out these routes only took a few hours,and the GraphiQL interface is a really nice way to test out your queries. By the end of the day I was able to make a lot of progress and have all of my queries crafted. Here are some of them:
![GraphiQL interface with some queries](/screenshots/graphiql2.png)

## Day 2 
Day 2 was mostly me just making the queries I made yesterday acutally work not just in GraphiQL but in the app based on buttons and onClicks. This did end up taking up nearly all day just because I needed to figure out a few more things than what I knew about GraphQL like making a seperate file for all of your queries and then how to import and then use them. Once figuring that out another breakthrough I had was finding out that you can pass variables to a query not just mutations, which was very helpful for a few of my routes.

## Day 3 & 4
This weekend I was able to make a little bit of progress I had to redo and fix a few of my queries as well as make 1 new one so that I could get a session id from a search string, other than that I moved a lot of things from state where I was testing things to the database where it was going to be in the end product.

## Day 5
By day 5 the project was getting pretty close to the base plan I had laid out. Becuase of all of the data analysis oportunities that this app has I wanted to add a few extra features that would show more details on things like averages and other useful data. I ended up looking into using a graph to chart your times for that session, this was relatively easy to do and I just used a basic graphing node module (react-chartkick + chart.js) to make the graph.

## Day 6 
Today was very simple and all I really had left to do was run through the app and make sure there wasn't any bugs which there weren't too many besides a logout one that wouldn't redirect the user back to the homepage after loggin out causing an error becuase on the /main page I do need a user to be signed in. After fixing those I got onto styling which wasn't too bad becuase I had somewhat been doing this throughout the project so the alignment was there just things like fonts and shadows and other less necessary details were left.

## Future Plans 
I plan to use this app whenever I want to time myself becuase I made it and I can add features as I see fit so I am sure this todo list here will get longer and longer the more I use it, but here are the basic things that need to be done. 
- The timer lags a little every once and a while, which isn't bad but becuase of all of the state updates and math that is done it could be better
- To make the timer better I need to look into [Moment.js's](https://momentjs.com/) timer node module because if it does what I slightly understand it to do I can replace my current self-made timer with it for better performance.
- The time in the db is not great becuase it is of a weird format and what I should change it to is something that the Moment timer spits out or for every 1 in the minutes column it needs to add 60 to the seconds and then just store it as a float with seconds and milliseconds, though this woudl make displaying them a bit tougher as I would need to change them back to MM:SS.mmm.
- Self made tutorial page.
- Change the way that I'm generating scrambles completely, because right now they are not official and sometimes they generate with moves that just don't make sense. 
- A great alternative to my current ways would be using [this](https://github.com/nickcolley/scrambo) becuase this is not only far better than mine, but has more options as well. This would not take too long to implement either.