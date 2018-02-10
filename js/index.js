/* apiArray holding link, quote- and authorkeys of respective JSON, possibility to add more Quote APIs*/
var apiArray = [{
    link : "https://talaikis.com/api/quotes/random/" ,
    quotekey:"quote",
    authorkey:"author",
    credit:"Free Random Quotes API by <a href='https://talaikis.com/'>Tadas Talaikis</a>",
    twitter:"Talaikis"
  },{
    link: "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
    quotekey:"quoteText",
    authorkey:"quoteAuthor",
    credit:"Forismatic API by <a href='https://alty.co/'>Alty</a>",
    twitter:"Alterplay"
  }
];
/*--------------------------------------apiArray----------------------------------*/

/*singleton object to keep actual quote-author pair, used throughout the site*/
var quoteSingleton = {
  text: "",
  author: "",
  credit: "",
  twitter: "",
  getTwitter:function(){
    return this.twitter;
  },
  setTwitter:function(input){
    this.twitter=input;
  },
  getCredit:function(){
    return this.credit;
  },
  setCredit:function(input){
    this.credit=input;
  },
  getText:function(){
    return this.text;
  },
  setText:function(input){
    this.text=input;
  },
  getAuthor(){
    return this.author;
  },
  setAuthor(input){
    this.author=input;
  }
};
/*---------------------Singleton Object "quoteSingleton"------------------------*/

/*getQuote(apiList,quoteObject) chooses a random API from apiArray, retrieves quote and author from API in JSON form
and fills data in respective quoteObject properties, also updates html classes quote and author respectively*/
function getQuote(gqObject){
  //console.log("inside getQuote");
  var apiObject = gqObject.data.apiList[Math.floor(apiArray.length*Math.random())];//get a random api
  gqObject.data.quoteObject.setCredit("Retrieved from: "+apiObject.credit);
  gqObject.data.quoteObject.setTwitter(apiObject.twitter);
  $(".quotesource").html(gqObject.data.quoteObject.getCredit());
  $.getJSON(apiObject.link).done(function(json){
    $.each(json,function(key,value){
        switch(key){
          case apiObject.quotekey:
            gqObject.data.quoteObject.setText(value);
            $(".quote").html(value);
            break;
          case apiObject.authorkey:
            gqObject.data.quoteObject.setAuthor(value);
            $(".author").html(value);
            break;
        }
      });
  });
};
/*----------------getQuote(apiList,quoteObject)------------------*/


function hubshare(quoteObject){
                  //get hub and channel name
                  var fullchannel=document.getElementById("channel").value.split("@");
                  var quote= "[quote="+quoteObject.data.getAuthor()+"]"+quoteObject.data.getText()+"[/quote]"+"<br/>[b]Credit: "+quoteObject.data.getCredit()+"[/b]";
                  window.open("https://"+fullchannel[1]+"/rpost?&body="+quote+"&title=News from the Quotes Machine&channel="+fullchannel[0]);
                };

function tweet(quoteObject){
                  window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp"+encodeURIComponent(", author of quotes app challange")+quoteObject.data.getTwitter()+encodeURIComponent(", author of API used")+",tonkllr"+encodeURIComponent(", author of Quotes Machine App")+"&text="+quoteObject.data.getText()+" - "+quoteObject.data.getAuthor());
                };


$("document").ready(function(){
  getQuote({data:{apiList: apiArray, quoteObject: quoteSingleton}});
  $("#tweetbutton").on('click', quoteSingleton, tweet);
  $("#hubbutton").on('click', quoteSingleton, hubshare);
  $("#newquote").on('click', {apiList: apiArray, quoteObject: quoteSingleton}, getQuote);
});
