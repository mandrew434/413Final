// src/pages/AddEntertainerPage.tsx
import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import { addEntertainer } from '../api/EntertainmentAgencyAPI';
import BackButton from '../components/BackButton';

// This page is used to add a new entertainer to the database.
const AddEntertainerPage: React.FC = () => {
  const navigate = useNavigate();
    // The formState is initialized with the required fields for the Entertainer object.
  const [formState, setFormState] = useState<Omit<Entertainer, 'entertainerID'>>({
    entStageName: '',
    entSSN: '',
    entStreetAddress: '',
    entCity: '',
    entState: '',
    entZipCode: '',
    entPhoneNumber: '',
    entWebPage: '',
    entEMailAddress: '',
    dateEntered: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await addEntertainer(formState);
      navigate('/entertainers');
    } catch (err: any) {
      setError(err.message || 'Failed to add entertainer');
      setSubmitting(false);
    }
  };

  // This form is constrructed to match the Entertainer interface in the API.
    // The API will return an error if any of the required fields are missing or invalid.
  return (
    <>
    <BackButton />
    <div className="container mt-5">
      <h2 className="mb-4">Add New Entertainer</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="entStageName" className="form-label">Stage Name</label>
            <input
              type="text"
              id="entStageName"
              name="entStageName"
              className="form-control"
              value={formState.entStageName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="entSSN" className="form-label">SSN</label>
            <input
              type="text"
              id="entSSN"
              name="entSSN"
              className="form-control"
              value={formState.entSSN}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="entStreetAddress" className="form-label">Street Address</label>
            <input
              type="text"
              id="entStreetAddress"
              name="entStreetAddress"
              className="form-control"
              value={formState.entStreetAddress}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="entCity" className="form-label">City</label>
            <input
              type="text"
              id="entCity"
              name="entCity"
              className="form-control"
              value={formState.entCity}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="entState" className="form-label">State</label>
            <input
              type="text"
              id="entState"
              name="entState"
              className="form-control"
              value={formState.entState}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="entZipCode" className="form-label">Zip Code</label>
            <input
              type="text"
              id="entZipCode"
              name="entZipCode"
              className="form-control"
              value={formState.entZipCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="entPhoneNumber" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="entPhoneNumber"
              name="entPhoneNumber"
              className="form-control"
              value={formState.entPhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="entWebPage" className="form-label">Web Page</label>
            <input
              type="string"
              id="entWebPage"
              name="entWebPage"
              className="form-control"
              value={formState.entWebPage}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="entEMailAddress" className="form-label">Email Address</label>
            <input
              type="email"
              id="entEMailAddress"
              name="entEMailAddress"
              className="form-control"
              value={formState.entEMailAddress}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="dateEntered" className="form-label">Date Entered</label>
            <input
              type="date"
              id="dateEntered"
              name="dateEntered"
              className="form-control"
              value={formState.dateEntered}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-success" disabled={submitting}>
            {submitting ? 'Adding...' : 'Add Entertainer'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/entertainers')}>
            Cancel
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default AddEntertainerPage;
