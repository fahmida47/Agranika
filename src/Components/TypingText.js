import React, { useState, useEffect } from 'react';

const TypingText = ({ text, speed = 100, className }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className={className}>{displayed}</p>;
};

export default TypingText;