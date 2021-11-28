import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dashboard from "../components/Dashboard"

const Home: NextPage = () => {
  return (
    <Dashboard/>
  )
}

export default Home
