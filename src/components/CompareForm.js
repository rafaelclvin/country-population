import React, { useState } from 'react';

const CompareForm = ({ countries }) => {
  const [country1, setCountry1] = useState('');
  const [country2, setCountry2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleCompare = () => {
    const countryData1 = countries.find(country => country.name === country1);
    const countryData2 = countries.find(country => country.name === country2);
    
    if (countryData1 && countryData2) {
      setComparisonResult({
        country1: countryData1,
        country2: countryData2,
      });
    }
  };

  const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <h2>Compare Countries</h2>
      <div>
        <select value={country1} onChange={(e) => setCountry1(e.target.value)}>
          <option value="">Select Country 1</option>
          {sortedCountries.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
        <select value={country2} onChange={(e) => setCountry2(e.target.value)}>
          <option value="">Select Country 2</option>
          {sortedCountries.map((country, index) => (
            <option key={index} value={country.name}>{country.name}</option>
          ))}
        </select>
        <button onClick={handleCompare}>Submit</button>
      </div>

      {comparisonResult && (
        <div className="comparison-result">
          <h3>Comparison Result</h3>
          <table>
            <thead>
              <tr>
                <th>Attribute</th>
                <th>{comparisonResult.country1.name}</th>
                <th>{comparisonResult.country2.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Population</td>
                <td>{comparisonResult.country1.population.toLocaleString()}</td>
                <td>{comparisonResult.country2.population.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>{comparisonResult.country1.area} km²</td>
                <td>{comparisonResult.country2.area} km²</td>
              </tr>
              <tr>
                <td>Capital</td>
                <td>{comparisonResult.country1.capital}</td>
                <td>{comparisonResult.country2.capital}</td>
              </tr>
              <tr>
                <td>Region</td>
                <td>{comparisonResult.country1.region}</td>
                <td>{comparisonResult.country2.region}</td>
              </tr>
              <tr>
                <td>Subregion</td>
                <td>{comparisonResult.country1.subregion}</td>
                <td>{comparisonResult.country2.subregion}</td>
              </tr>
              <tr>
                <td>Languages</td>
                <td>{comparisonResult.country1.languages}</td>
                <td>{comparisonResult.country2.languages}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompareForm;