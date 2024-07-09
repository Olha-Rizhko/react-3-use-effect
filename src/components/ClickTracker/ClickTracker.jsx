import { useState, useEffect } from "react";

export default function ClickTracker() {
  // функція, оголошена в useState виконується ще до монтування компонента, це називається ініціалізатор стану. Тут може бути тільки синхронний код. І тому ще до спрацьовування будь-якого ефекту (які спрацьовують після монтування), ми вже ініціалізуємо стан.
  // Цю функцію можна винести поза ClickTracker:
  //const getInitialClicks = () => {const savedClicks = localStorage.getItem("num-of-clicks");
  //if (savedClicks !== null) {
  //return JSON.parse(savedClicks);
  //}
  // return 0;};
  //А потім у useState передати посилання на getInitialClicks: useState(getInitialClicks);

  const [clicks, setClicks] = useState(() => {
    const savedClicks = localStorage.getItem("num-of-clicks");
    if (savedClicks !== null) {
      return JSON.parse(savedClicks);
    }
    return 0;
  });
  const [date, setDate] = useState(Date.now);

  // першим аргументом при виклику useEffect ми передаємо колбек-функцію, яка буде виконуватися кожен раз, коли спрацьовує ефект, а другим - масив залежностей (умова використання ефекта). Якщо масив залежностей не передавати, то такий ефект буде спрацьовувати на монтування, зміну стану і розмонтування, тому в такому ефекті немає сенсу.
  // - якщо масив залежностей порожній [], то такий ефект спрацює тільки на монтування компонента
  useEffect(() => {
    console.log("This is effect");
  }, []);

  // - всі зовнішні змінні, які використовуються всередині колбек-функції, мають бути в масиві залежностей. Такий ефект буде спрацьовувати один раз при монтуванні, а потім кожного разу, коли змінюється date (або будь-яка залежність із вказаних у масиві залежностей)
  useEffect(() => {
    console.log("Current date: ", date);
  }, [date]);

  useEffect(() => {
    localStorage.setItem("num-of-clicks", clicks);
  }, [clicks]);

  return (
    <div>
      <button onClick={() => setClicks(clicks + 1)}>Clicks: {clicks}</button>
      <button onClick={() => setClicks(0)}>Reset</button>
      <button onClick={() => setDate(Date.now())}>Date: {date}</button>
    </div>
  );
}
