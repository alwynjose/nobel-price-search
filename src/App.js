import React from 'react';
import { useEffect, useState } from 'react';
import './App.css';
import SearchAwards from "./components/SearchAwards";
import Header from './components/Header';

function App() {

  const [awardsData, setAwardsData] = useState([]); // set initial state to be empty

  const fetchNobelPrizes = async () => { // fetch nobel prize data
    const data = await fetch("https://api.nobelprize.org/v1/prize.json");
    const awardsList = await data.json();
    setAwardsData(awardsList.prizes); // set awardsData
  }

  useEffect(() => {
    fetchNobelPrizes();
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <SearchAwards placeholder="Search Nobel Prizes..." data={awardsData}></SearchAwards>
      </div>
    </div>
  );
}

export default App;
