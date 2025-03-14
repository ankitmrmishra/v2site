import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { BASE_URL } from '../utils/apicalls';
const sportIdMap = {
  Soccer: '29',
  Tennis: '33',
  Baseball: '3',
  Basketball: '4',
  Cricket: '8',
  Hockey: '19',
  Rugby: '27',
  Combat: '22',
  Politics: 'politics',
  Cryptocurrency: 'cryptocurrency',
};

const useSports = (id) => {
  const path = usePathname(); 
  const [sports, setSports] = useState({});
  const [sportName, setSportName] = useState('');
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const sportName = path.split('/sports/')[1];
        console.log("Sport Name:", sportIdMap[sportName] , sportName);
        
        const response = await fetch(`${BASE_URL}/events?sport=${sportIdMap[sportName]}`);
        if (!response.ok) {
          throw new Error('Failed to fetch sports');
        }
        const data = await response.json();
        setSports(data);
        const name = Object.keys(data)[0];
        setSportName(name); // Get the sport name dynamically
        setLeagues(data[name] || []); // Extract leagues from the data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, [id]);

  return { sports, sportName, leagues, loading, error };
};

export default useSports;
