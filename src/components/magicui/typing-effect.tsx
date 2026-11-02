"use client";

import { useEffect, useRef, useState } from "react";

interface TypingEffectProps {
  phrases: string[];
  /** delay sebelum mulai mengetik (ms) */
  startDelay?: number;
  /** kecepatan mengetik per karakter (ms) */
  typingSpeed?: number;
  /** kecepatan menghapus per karakter (ms) */
  deletingSpeed?: number;
  /** jeda setelah teks selesai diketik (ms) */
  pauseAfterTyping?: number;
  /** jeda setelah teks selesai dihapus (ms) */
  pauseAfterDeleting?: number;
  className?: string;
}

export function TypingEffect({
  phrases,
  startDelay = 600,
  typingSpeed = 65,
  deletingSpeed = 35,
  pauseAfterTyping = 1600,
  pauseAfterDeleting = 300,
  className,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Initial delay before starting
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || phrases.length === 0) return;

    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (isTyping) {
      if (charIndex <= currentPhrase.length) {
        timerRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex));
          setCharIndex((c) => c + 1);
        }, typingSpeed);
      } else {
        timerRef.current = setTimeout(() => {
          setIsTyping(false);
        }, pauseAfterTyping);
      }
    } else {
      if (charIndex > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deletingSpeed);
      } else {
        timerRef.current = setTimeout(() => {
          setPhraseIndex((i) => i + 1);
          setIsTyping(true);
        }, pauseAfterDeleting);
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [
    started,
    isTyping,
    charIndex,
    phraseIndex,
    phrases,
    typingSpeed,
    deletingSpeed,
    pauseAfterTyping,
    pauseAfterDeleting,
  ]);

  return (
    <span className={className}>
      {displayText}
      <span
        aria-hidden="true"
        className="inline-block w-[2px] h-[0.9em] bg-current align-middle ml-[1px] animate-[typing-blink_1s_step-end_infinite]"
      />
    </span>
  );
}
