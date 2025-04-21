
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchBookingSummaries } from '../api/EntertainmentAgencyAPI';
import { BookingSummary } from '../api/EntertainmentAgencyAPI';

// This page is used to display a summary of all entertainers in the database.
// It fetches the booking summaries from the API and displays them in a table format.
const EntertainersPage: React.FC = () => {
  const [summaries, setSummaries] = useState<BookingSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookingSummaries()
      .then(data => {
        setSummaries(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to load summaries');
        setLoading(false);
      });
  }, []);

  // This function is called when the user clicks the "Add Entertainer" button.
  // It navigates the user to the Add Entertainer page.
  const handleAdd = () => {
    navigate('/entertainers/add');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Entertainer Booking Summary</h2>

      {loading && <div>Loading...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Stage Name</th>
              <th>Times Booked</th>
              <th>Last Booked</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {/* This maps out the information needed for our summaries table */}
            {summaries.map((s) => (
              <tr key={s.entertainerID}>
                <td>{s.entStageName}</td>
                <td>{s.bookingCount}</td>
                <td>{s.lastBookedDate ?? '—'}</td>
                <td>
                    {/* This link navigates to the details page for the entertainer. It pulls this using the entertainer's id*/}
                  <Link
                    to={`/entertainers/${s.entertainerID}`}
                    className="btn btn-sm btn-primary"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="d-flex justify-content-end mt-4">
        <button className="btn btn-success" onClick={handleAdd}>
          Add Entertainer
        </button>
      </div>
    </div>
  );
};

export default EntertainersPage;
