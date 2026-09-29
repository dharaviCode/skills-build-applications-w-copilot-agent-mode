import { useEffect, useState } from 'react';
import { normalizeRecords } from '../utils/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadLeaderboard() {
      try {
        const response = await fetch('/api/leaderboard/');

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const records = normalizeRecords(payload);

        if (active) {
          setLeaderboard(records);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load leaderboard');
          setLeaderboard([]);
        }
      }
    }

    loadLeaderboard();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Leaderboard</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.length > 0 ? (
                  leaderboard.map((entry) => (
                    <tr key={entry._id || entry.id || entry.name}>
                      <td>{entry.rank}</td>
                      <td>{entry.name}</td>
                      <td>{entry.score}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-muted text-center py-4">
                      No leaderboard data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
