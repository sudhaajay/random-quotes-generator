import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuoteGenerator.css';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes');
      const randomQuote = response.data.quotes[Math.floor(Math.random() * response.data.quotes.length)];
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote(); 
  }, []);

  return (
    <div className="quote-container">
      <div className="quote-box">
        <h2>Random Quote Generator</h2>
        <p className="quote-text">"{quote}"</p>
        <p className="quote-author">- {author}</p>
        <button className="new-quote-btn" onClick={fetchQuote}>Get New Quote</button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
