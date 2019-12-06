# TimerApp

## What is it?
TimerApp is simply a timer for you to use in whatever way you see fit however it has extra capabilities when used as a Rubik's cube solve timer. In general once a user logs in all of the times that they have is stored in a MongoDB so that no matter where you are logged in your times follow you. The app also will generate a (non-WCA)scramble for some of the more simple cubes though more scramble generators are coming soon. It uses the Ruwix 3D Cube Widget to show you what the scramble should look like. It also has a few data analysis features like calculating your most recent Average of 5, along with your most recent Average of 12. If the option is selected there is also a helpful generated graph of your times in that session so that you can see your progress. Another feature that is coming is a tutorial page in which the user can learn the different move notations along with a basic step-by-step tutorial on how to solve the cube.

## Pre Day 1 
Once the idea came to my head I started thinking about the features that I wanted the app to have as well as a basic layout of the app. At this time I also looked at other sites that do similar things for users to see what works well and what I would like to change in my version of the app.

## Day 1 
After having basic planning laid out I decided on the stack that I was going to use for this project. I am the most experienced with the MERN stack, so I went with that. Instead of using Express for all of the routing including the database routes I also looked into, and decided to use, GraphQL to handle all of the database amnipulation. The rest of the day was finishing up planning including stubbing out the GraphQL routes, and finalizing design and layout plans. Then I started writing out the Queries that I was going to use with GraphQL, prior to this my experience was light with GraphQL, but even then writing out these routes only took a few hours,and the GraphiQL interface is a really nice way to test out your queries. By the end of the day I was able to make a lot of progress and have all of my queries crafted.

## Day 2 