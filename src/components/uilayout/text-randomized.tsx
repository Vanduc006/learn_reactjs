'use client';

import React, { useEffect, useState, useCallback } from 'react';

const lettersAndSymbols = 'abcdefghijklmnopqrstuvwxyz!@#$%^&*-_+=;:<>,'; // Define random characters.

interface AnimatedTextProps {
  text: string;
  loopDelay?: number; // Optional delay between loops (in milliseconds).
}

export function RandomizedTextEffect({ text, loopDelay = 1000 }: AnimatedTextProps) {
  const [animatedText, setAnimatedText] = useState('');

  // Generate a random character from `lettersAndSymbols`.
  const getRandomChar = useCallback(
    () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)],
    []
  );

  // Animate the text with random characters.
  const animateText = useCallback(async () => {
    const duration = 50; // Duration for random updates.
    const revealDuration = 80; // Duration to reveal each character.
    const initialRandomDuration = 300; // Time to show random characters.

    const generateRandomText = () =>
      text
        .split('')
        .map(() => getRandomChar())
        .join('');

    // Initial phase: randomize the entire text.
    setAnimatedText(generateRandomText());
    const endTime = Date.now() + initialRandomDuration;
    while (Date.now() < endTime) {
      await new Promise((resolve) => setTimeout(resolve, duration));
      setAnimatedText(generateRandomText());
    }

    // Reveal each character one by one.
    for (let i = 0; i < text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, revealDuration));
      setAnimatedText(
        (prevText) =>
          text.slice(0, i + 1) +
          prevText
            .slice(i + 1)
            .split('')
            .map(() => getRandomChar())
            .join('')
      );
    }
  }, [text, getRandomChar]);

  useEffect(() => {
    let isMounted = true;

    // Loop the animation with delay.
    const loopAnimation = async () => {
      while (isMounted) {
        await animateText();
        await new Promise((resolve) => setTimeout(resolve, loopDelay)); // Delay between loops.
      }
    };

    loopAnimation();

    return () => {
      isMounted = false; // Cleanup to stop the loop if component unmounts.
    };
  }, [animateText, loopDelay]);

  return <div className='relative inline-block'>{animatedText}</div>;
}
