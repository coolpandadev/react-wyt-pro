




# WYT React

React-based front-end app for the 'What You Think?' Yahoo Fantasy Basketball Trade Tool Opinion Aggregator app.
**To access the backend repository, please click this [link](https://github.com/stanley-tarce/wyt-rails)**
## Important!
*To access the app, you must have a Yahoo account currently playing in the NBA Fantasy (specifically within a League with an Active Roster). We use real data to create and compare stats of the players. Alternative solution would be clicking the following links:*

 
### Live/Demo
Please use this [link](https://wyt-react.vercel.app/) to access the app




 - [Trade Link 1](https://wyt-react.vercel.app/trade/3a4546e4-8361-413f-becb-1ed070ccd1a1) 
 - [Trade Link 2](https://wyt-react.vercel.app/trade/432f9e5e-528c-487c-8c7a-de4e4619e243) 

###  Objectives

 - User should be able to login via Yahoo email
 - When user logs in, they should be redirected to the index page which is the list of all trade proposals they have. They can also delete a trade from this dashboard 
 - On the index page, user should be able to create new trade proposal
 - On the create page, user should see his team name, the players on his team and their stats. 
 - On the create page, user should see a dropdown menu to choose which team he wants to trade with. Upon selection, the players of that team should be listed with their stats
 - When a user clicks a specific trade proposal, they should be able to see the details of the trade: which players will be traded and which players will be received.
 - User should be able to edit the trade to be able to change players involved 
 - On the show trade proposal page, user should see a list of comments from other users.
 - On the show trade proposal page, any user can fill out the comment form with their name and comment on the trade

### Technologies used
To create the frontend app, we used the following frameworks:
 1. React
 2. Material UI
 3. React Router
 4. React Hot Toast

### Snapshots 
<p align="center">
  <img src="./src/assets/WYT/Home.jpeg" width="900" alt="Picture1">  
 <img src="./src/assets/WYT/Leagues.jpeg" width="900" alt="Picture2">
 <img src="./src/assets/WYT/Create.jpg" width="900" alt="Picture3">
  <img src="./src/assets/WYT/Trades.jpg" width="900" alt="Picture4">
 <img src="./src/assets/WYT/Trade.jpeg" width="900" alt="Picture5">
  <img src="./src/assets/WYT/Update.jpg" width="900" alt="Picture6">
  
</p>



### Installation 
Clone the repository inside your local directory and change the directory to the root of the file

```sh
git clone https://github.com/ajong1994/wyt-react.git
```
Run this command to install the node modules
```sh
npm install
```
Once you are done, you can quickly run the app by using this command.
```sh
npm start
```
### Deployment 
To deploy the app to production you can choose any of these methods I use

 1. [GH Pages](https://github.com/gitname/react-gh-pages)
 2. [Vercel](https://vercel.com/guides/deploying-react-with-vercel)
 3. [Heroku](https://blog.heroku.com/deploying-react-with-zero-configuration)

### Credits
I would like to thank to my groupmate (Stanley) for working with the project and to my teachers in Avion School for making this possible.
