import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Showcase</title>
        <meta name="description" content="A generic showcase app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        This is your definitive
        <h1 className={styles.title}>Boardgamer APP</h1>
        <p className={styles.description}>... discover,list and plan ...</p>
        <code className={styles.code}>GO AND PLAY WITH IT!</code>
        <div className={styles.grid}>
          <Link href="/showcase">
            <a className={styles.card}>
              <h2>Discover &rarr;</h2>
              <p>Find games you didn't know yet</p>
              <p>Tip: put some in your wishlist</p>
            </a>
          </Link>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>List &rarr;</h2>
            <p>An unvaluable list of the games you own and you would like to</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h2>Plan &rarr;</h2>
            <p>Schedule game, invite and share tutorials with your playmates</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Secret area &rarr;</h2>
            <p>Join us to get a lot more!</p>
            <p>sssssh... don't tell anybody what you'll find here</p>
          </a>
        </div>
      </main>
    </div>
  );
}
