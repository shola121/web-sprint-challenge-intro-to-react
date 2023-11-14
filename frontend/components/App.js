import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Character from './Character';

const urlPlanets = 'http://localhost:9009/api/planets';
const urlPeople = 'http://localhost:9009/api/people';

function App() {
  // ❗ Create state to hold the data from the API
  const [characters, setCharacters] = useState([]);

  // ❗ Create effects to fetch the data and put it in state
  useEffect(() => {
    // Fetch data from endpoint A
    const fetchCharacters = async () => {
      try {
        const responseA = await axios.get(urlPeople);
        const peoplesData = responseA.data;

        // Fetch data from Endpoint B
        const responseB = await axios.get(urlPlanets);
        const planetsData = responseB.data;

        // combine data from both endpoints
        const combinedData = peoplesData.map((character) => {
          const homeworld = planetsData.find(
            (planet) => planet.id === character.homeworld
          );

          return {
            ...character,
            homeworld,
          };
        });

        // Set the combined data in state
        setCharacters(combinedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    // Call the function to fetch data
    fetchCharacters();
  }, []);
  return (
    <div>
      <h2>Star Wars Characters</h2>
      <p>
        See the README of the project for instructions on completing this
        challenge
      </p>
      {/* ❗ Map over the data in state, rendering a Character at each iteration */}
      <div>
        {characters.map((character) => (
          <Character key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default App;

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = App;
