import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import SideBarWithHeader  from '../components/SideBarWithHeader'

const Home: NextPage = () => {
  return (
    <SideBarWithHeader><div>main contents</div></SideBarWithHeader>
  )
}

export default Home
