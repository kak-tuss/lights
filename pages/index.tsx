import Head from 'next/head';
import styles from '../styles/Home.module.css';
import TrafficLightsPage from './lights/page';

export default function Home() {
  return (
    <div>
      <TrafficLightsPage />
    </div>);
}
