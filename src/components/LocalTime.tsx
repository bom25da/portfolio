import { useEffect, useState } from 'react';

export function SeoulTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return <time id="seoul-time">{time}</time>;
}

export function CopyrightYear() {
  const [year, setYear] = useState('2026');
  useEffect(() => {
    setYear(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Seoul', year: 'numeric' }).format(new Date()));
  }, []);
  return <span id="copyright-year">{year}</span>;
}
