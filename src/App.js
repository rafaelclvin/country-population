import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CompareForm from './components/CompareForm';
import NewsComponent from './components/NewsComponent';
import './App.css';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        const countriesData = response.data.map(country => ({
          name: country.name.common,
          population: country.population,
          area: country.area,
          capital: country.capital ? country.capital[0] : 'N/A',
          region: country.region,
          subregion: country.subregion, 
          languages: country.languages ? Object.values(country.languages).join(', ') : 'N/A', 
          cca2: country.cca2, // Menambahkan kode negara (CCA2)
        }));
        setCountries(countriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedCountries = countries.sort((a, b) => b.population - a.population);

  const formatPopulation = (population) => {
    if (population >= 1e9) {
      return (population / 1e9).toFixed(1) + 'B'; // Miliar
    } else if (population >= 1e6) {
      return (population / 1e6).toFixed(1) + 'M'; // Juta
    } else if (population >= 1e3) {
      return (population / 1e3).toFixed(1) + 'K'; // Ribu
    } else {
      return population.toString(); // Angka asli jika kurang dari 1000
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Country Population Ranking</h1>
      <div className="flex-container">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Country</th>
                <th>Population</th>
                <th>Code</th> {}
              </tr>
            </thead>
            <tbody>
              {sortedCountries.map((country, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{country.name}</td>
                  <td>{formatPopulation(country.population)}</td>
                  <td>{country.cca2}</td> {/* Menampilkan CCA2 */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="compare-container">
          <CompareForm countries={sortedCountries} />
        </div>
      </div>
      <div className="news-container">
        <NewsComponent />
      </div>
    </div>
  );
};

export default App;