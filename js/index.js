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
    return twitter;
  },
  setTwitter:function(input){
    twitter=input;
  },
  getCredit:function(){
    return credit;
  },
  setCredit:function(input){
    credit=input;
  },
  getText:function(){
    return text;
  },
  setText:function(input){
    text=input;
  },
  getAuthor(){
    return author;
  },
  setAuthor(input){
    author=input;
  }
};
/*---------------------Singleton Object "quoteSingleton"------------------------*/

/*getQuote(apiList,quoteObject) chooses a random API from apiArray, retrieves quote and author from API in JSON form
and fills data in respective quoteObject properties, also updates html classes quote and author respectively*/
function getQuote(apiList,quoteObject){
  var apiObject = apiList[Math.floor(apiArray.length*Math.random())];//get a random api
  quoteObject.setCredit("Retrieved from: "+apiObject.credit);
  quoteObject.setTwitter(apiObject.twitter);
  $(".quotesource").html(quoteObject.getCredit());
  $.getJSON(apiObject.link).done(function(json){
    $.each(json,function(key,value){
        switch(key){
          case apiObject.quotekey:
            quoteObject.setText(value);
            $(".quote").html(value);
            break;
          case apiObject.authorkey:
            quoteObject.setAuthor(value);
            $(".author").html(value);
            break;
        }
      });
  });
};
/*----------------getQuote(apiList,quoteObject)------------------*/

$("document").ready(function(){
  getQuote(apiArray,quoteSingleton);
  $("#tweetbutton").on('click',function(){
                    window.open("https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp"+encodeURIComponent(", author of quotes app challange")+quoteSingleton.twitter+encodeURIComponent(", author of API used")+",tonkllr"+encodeURIComponent(", author of Quotes Machine App")+"&text="+quoteSingleton.getText()+" - "+quoteSingleton.getAuthor())});
  $("#hubbutton").on('click', function(){
                    //get hub and channel name
                    var fullchannel=document.getElementById("channel").value.split("@");
                    var quote= "[quote="+quoteSingleton.getAuthor()+"]"+quoteSingleton.getText()+"[/quote]"+"<br/>[b]Credit: "+quoteSingleton.getCredit()+"[/b]";
                    window.open("https://"+fullchannel[1]+"/rpost?&body="+quote+"&title=News from the Quotes Machine&channel="+fullchannel[0]);
                  });
  $("#newquote").on('click',function(){
                    getQuote(apiArray,quoteSingleton);
  });
});
