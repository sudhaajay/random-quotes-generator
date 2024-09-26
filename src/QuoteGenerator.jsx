import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {WhatsappShareButton, WhatsappIcon} from 'react-share';
import './QuoteGenerator.css';
import defaultImage from './assets/images/default.png';
import defaultImage1 from './assets/images/default1.png';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(defaultImage);
  const [autoFetch, setAutoFetch] = useState(false);

  const toggleBackgroundImage = () => {
    setBackgroundImage(prevImage => prevImage === defaultImage ? defaultImage1 : defaultImage);
  };

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/quotes');
      const randomQuote = response.data.quotes[Math.floor(Math.random() * response.data.quotes.length)];
      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author);
      toggleBackgroundImage();
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
    if (autoFetch) {
      const interval = setInterval(fetchQuote, 5000);
      return () => clearInterval(interval);
    }
  }, [autoFetch]);

  const shareUrl = window.location.href;

  return (
    <div className="quote-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="quote-box">
        <h2>Random Quote Generator</h2>
        <p className="quote-text">"{quote}"</p>
        <p className="quote-author">- {author}</p>
        <div className="button-container">
          <button className="new-quote-btn" onClick={fetchQuote}>Get New Quote</button>
          <WhatsappShareButton url={shareUrl} title={`${quote} - ${author}`}>
            <WhatsappIcon size={50} round={true} className="whatsapp-icon" />
          </WhatsappShareButton>
          <button className="auto-fetch-btn" onClick={() => setAutoFetch(!autoFetch)}>
            {autoFetch ? 'Stop Auto Fetch' : 'Start Auto Fetch'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;
