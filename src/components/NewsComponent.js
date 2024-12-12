import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopStories = async () => {
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=q2zAz6uAB3JlkJJhJ4GrmRALen7E7dn7`;

    try {
      const response = await axios.get(url);
      setArticles(response.data.results);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error fetching top stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopStories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>News / Articles Page</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.url}>
            <h3>{article.title}</h3>
            <p>{article.abstract}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsComponent;