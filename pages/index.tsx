import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/header/Header";
import LotteryEntrance from "../components/lottery-entrance/LotteryEntrance";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Decentralised lottery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <LotteryEntrance />
      <p>Smart contract lottery</p>
    </div>
  );
};

export default Home;
