import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';




// declare variables
  let tweets = [],baseTweet=[];

// random date generation
function randomDate (start,end){
  return new Date(start.getTime() + Math.random()*(end.getTime()-start.getTime())).toString();
}

// random number between 1 and 5000
function randomNum () {
  return Math.floor((Math.random() * 5000)+1);
}

  // retrive data
  $.get('https://gist.githubusercontent.com/hrp/900964/raw/2bbee4c296e6b54877b537144be89f19beff75f4/twitter.json',function(data){
    baseTweet=JSON.parse(data);
      //10 tweets are generated from 'baseTweet' and are stored in 'tweets' 
  // only certain fields are stored

  // declare variables
    let tweetObj={},startDate=new Date(2013,0,1), endDate= new Date();
let i = 0;
    do {
      tweetObj['profileImg']=baseTweet.user.profile_image_url;
      tweetObj['username']=baseTweet.user.screen_name;
      tweetObj['tweet']=baseTweet.text;
      tweetObj['retweetCounts']=randomNum();
      tweetObj['date']=randomDate(startDate,endDate);
      tweetObj['timeZone']=baseTweet.user.time_zone;
      tweetObj['loc']=baseTweet.user.location;
      tweetObj['friends']=baseTweet.user.friends_count;
      tweetObj['descrip']=baseTweet.user.description;
      tweetObj['followers']=baseTweet.user.followers_count;
      tweets.push(tweetObj);
      tweetObj={};
      i++;
    }
    while (i<10);
  });
  
    
    
    

   
  $(document).ready(()=>{

    
    
    if (tweets.length !== 0){
  ReactDOM.render(<App data={tweets} />, document.getElementById('root'));
registerServiceWorker();
    }

  });

  

  


