import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [showQuote, setShowQuote] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quote, setQuote] = useState({});
  const refDiv = useRef(null);

  const getQuote = () => {
    let randomQuote = Math.floor(Math.random() * (quotes.length - 0) + 0);
    setQuote(quotes[randomQuote]);
    setShowQuote(true);
  };

  useEffect(() => {
    const getData = async () => {
      const url = 'https://type.fit/api/quotes';
      const response = await fetch(url);
      let quoteResponse = await response.json();
      setQuotes(quoteResponse);
    };
    getData();
  }, []);

  useEffect(() => {
    if (refDiv.current) {
      refDiv.current.focus();
    }
  }, [quote]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Let's get Motivated</h1>

        <p className={styles.description}>Get a daily dose of motivation</p>

        <div className={styles.grid}>
          {showQuote && (
            <a ref={refDiv} href={'#'} className={styles.card}>
              <h2>{quote.text}</h2>
              <p className={styles.author}> {quote.author} </p>
            </a>
          )}
        </div>
        <button onClick={getQuote} className={styles.btnMo}>
          Motivate me
        </button>
      </main>

      <footer className={styles.footer}>
        <a href="https://next.new" target="_blank" rel="noopener noreferrer">
          Created with&nbsp;<b>next.new</b>&nbsp;⚡️
        </a>
      </footer>
    </div>
  );
}
