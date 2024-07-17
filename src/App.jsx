import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [prevReal, setPrevReal] = useState(true);

  useEffect(() => {
    getQuote();
  }, [])

  const getQuote = async () => {
    const randomNumber = Math.random() * 10;


    if (prevReal && randomNumber > 7) {
      setQuote(`"Sam is the best"`);
      setAuthor("Adrian Sackson");
      setPrevReal(false)
    } else {
      const response = await fetch('https://api.quotable.io/random');
      const quoteData = await response.json();
      setQuote(`"${quoteData.content}"`);
      setAuthor(quoteData.author);
      !prevReal && setPrevReal(true)
    }
  }

  return (
    <>
      <h1>Quote generator</h1>
      <div className="card">
        <p>
          <button onClick={getQuote}>Click me for a quote!</button>
        </p>
      </div>
      <p className="read-the-docs">
        {quote}
      </p>
      <p>
        {author}
      </p>
    </>
  )
}

export default App
