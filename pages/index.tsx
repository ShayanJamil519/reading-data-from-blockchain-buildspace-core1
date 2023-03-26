import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import AddressForm from "../components/AddressForm";
import * as web3 from "@solana/web3.js";

const Home: NextPage = () => {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  const addressSubmittedHandler = (address: string) => {
    try {
      const key = new web3.PublicKey(address); // 0x29aA75fC58c4d4a2a7bC3DfAa7CB707aA1fD5b5c  => generates a public key from the address
      setAddress(key.toBase58()); // converts public key to Base58-encoded string like this =>  G41J7VamhW78xpr99Fst9qtquKj7V2EqUzW6UQof5AM5

      const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

      connection.getBalance(key).then((balance) => {
        setBalance(balance / web3.LAMPORTS_PER_SOL);
      });
    } catch (error) {
      setAddress("");
      setBalance(0);
      alert(error);
    }
  };

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <p>Start Your Solana Journey</p>
        <AddressForm handler={addressSubmittedHandler} />
        <p>{`Address: ${address}`}</p>
        <p>{`Balance: ${balance} SOL`}</p>
      </header>
    </div>
  );
};

export default Home;
