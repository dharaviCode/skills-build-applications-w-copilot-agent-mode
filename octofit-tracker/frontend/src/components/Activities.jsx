import { useEffect, useState } from 'react';
import { getApiUrl, normalizeRecords } from '../utils/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadActivities() {
      try {
        const response = await fetch(getApiUrl('activities'));

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        const records = normalizeRecords(payload);

        if (active) {
          setActivities(records);
          setError('');
        }
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load activities');
          setActivities([]);
        }
      }
    }

    loadActivities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="card-title h4 mb-3">Activities</h2>
        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Minutes</th>
                  <th>Calories</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length > 0 ? (
                  activities.map((activity) => (
                    <tr key={activity._id || activity.id || activity.type}>
                      <td>{activity.type}</td>
                      <td>{activity.durationMinutes}</td>
                      <td>{activity.caloriesBurned}</td>
                      <td>{new Date(activity.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-muted text-center py-4">
                      No activities found.
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

export default Activities;
