import React, { useState, useEffect,useRef } from "react";
import './App.css';

function App() {
  const [quotesList, setQuotesList] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [author, setAuthor] = useState([]);
  const [developer, setDeveloper] = useState([]);

    useEffect(()=>{
      fetch('https://quote-garden.herokuapp.com/api/v3/quotes', { method: 'GET' })
      .then(data => data.json()) // Parsing the data into a JavaScript object
      .then(json =>  setQuotesList(json.data)/*setA(json)*/ ) // Displaying the stringified data in an alert popup
      setDeveloper('ivanhadzi-cenic@DevChallenges.io')
    },[])

    function getRandom(){
      setQuotes(null)
      console.log(quotesList)
      const rand= Math.floor(Math.random() * quotesList.length);
      const randomQuote = quotesList[rand];
      console.log(randomQuote)
      setRandomQuote(randomQuote);
      setAuthor(randomQuote.quoteAuthor)
     }

     useEffect(()=>{
      if(quotesList[0]){
      getRandom()
      }
     },[quotesList])

     function callApi(rand){
      setRandomQuote(null);
      setQuotes(quotesList.filter(quote=> quote.quoteAuthor === rand))
     }
     
    return (
    <div className="App">
      <div  onClick={getRandom}  className='Random' >
        <div id="loop">
        <div><span style={{fontSize:"16px"}}>random</span> </div>
        <div> <span  id="icon"  className="material-icons" >loop</span></div>
        </div>
      </div>
      <header className="App-body">
              { randomQuote &&  <div >
              <div className="card">{randomQuote.quoteText}</div>
                <div className="dash" onClick={() => callApi(randomQuote.quoteAuthor)}>
                  <div className="item">
                    <div className="layout">
                      <div className="top" >
                        {randomQuote.quoteAuthor}
                      </div>
                      <div className="bottom">
                        <span className="small" style={{color: "grey "}}>{randomQuote.quoteGenre}</span>
                      </div>
                      </div>
                      <div className="arrow" style={{color: "white"}}>
                        <span style={{color:"white"}} className="material-icons" >arrow_right_alt</span> 
                      </div>
                  </div>
                </div>
              </div>
              }
              {quotes && <div className="author">{author}</div>  }
              {quotes && quotes.map((item)=>{
                return ( 
                  <div  key={item.quoteAuthor} >
                      <div  onClick={() =>callApi(item.quoteAuthor)} className="card"> {item.quoteText} </div>  
                  </div>)
               })}
      </header>
        <div>
        {developer &&   <div className="developer">  {developer}  </div>  }
        </div>
    </div>
    )
 
}  

export default App;
