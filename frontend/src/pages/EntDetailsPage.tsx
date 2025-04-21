// src/pages/EntDetailsPage.tsx
import React, { useState, useEffect, ChangeEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Entertainer } from '../types/Entertainer';
import {
  fetchEntertainerDetails,
  updateEntertainer,
  deleteEntertainer
} from '../api/EntertainmentAgencyAPI';
import BackButton from '../components/BackButton';

// This page is used to display and edit the details of a specific entertainer.
// It fetches the entertainer's details from the API and allows the user to edit them.
const EntDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [ent, setEnt] = useState<Entertainer | null>(null);
  const [formState, setFormState] = useState<Partial<Entertainer>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchEntertainerDetails(Number(id))
      .then(data => {
        setEnt(data);
        setFormState(data);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  // This function is called when the user clicks the "Save" button.
  // It updates the entertainer's details in the database and refreshes the page.
  const handleSave = async () => {
    if (!ent) return;
    try {
      const saved = await updateEntertainer(
        ent.entertainerID,
        formState as Entertainer
      );
      setEnt(saved);
      setFormState(saved);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // This function is called when the user clicks the "Cancel" button.
  // It resets the form to the original entertainer's details and exits edit mode.
  const handleCancel = () => {
    if (ent) setFormState(ent);
    setError(null);
    setIsEditing(false);
  };

  // This function is called when the user clicks the "Delete" button.
  // It deletes the entertainer from the database and navigates back to the entertainers list.
  // It also prompts the user for confirmation before deleting.
  const handleDelete = async () => {
    if (!ent) return;
    if (window.confirm('Are you sure you want to delete this entertainer?')) {
      try {
        await deleteEntertainer(ent.entertainerID);
        navigate('/entertainers');
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="container mt-5">Loading...</div>;
  if (error) return (
    <div className="container mt-5">
      <div className="alert alert-danger">{error}</div>
    </div>
  );
  if (!ent) return <div className="container mt-5">Entertainer not found.</div>;

  // Exclude the ID from display inputs
  return (
    <>
    <BackButton />
    <div className="container mt-5">
      <h2 className="mb-4">Entertainer Details</h2>

      {/* Hidden entertainerID */}
      <input
        type="hidden"
        name="entertainerID"
        value={formState.entertainerID ?? ''}
      />

<div className="row">
  {/* Stage Name */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entStageName" className="form-label">Stage Name</label>
    <input
      type="text"
      id="entStageName"
      name="entStageName"
      className="form-control"
      value={formState.entStageName || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Social Security Number */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entSSN" className="form-label">Social Security Number</label>
    <input
      type="text"
      id="entSSN"
      name="entSSN"
      className="form-control"
      value={formState.entSSN || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Street Address */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entStreetAddress" className="form-label">Street Address</label>
    <input
      type="text"
      id="entStreetAddress"
      name="entStreetAddress"
      className="form-control"
      value={formState.entStreetAddress || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* City */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entCity" className="form-label">City</label>
    <input
      type="text"
      id="entCity"
      name="entCity"
      className="form-control"
      value={formState.entCity || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* State */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entState" className="form-label">State</label>
    <input
      type="text"
      id="entState"
      name="entState"
      className="form-control"
      value={formState.entState || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Zip Code */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entZipCode" className="form-label">Zip Code</label>
    <input
      type="text"
      id="entZipCode"
      name="entZipCode"
      className="form-control"
      value={formState.entZipCode || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Phone Number */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entPhoneNumber" className="form-label">Phone Number</label>
    <input
      type="tel"
      id="entPhoneNumber"
      name="entPhoneNumber"
      className="form-control"
      value={formState.entPhoneNumber || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Website */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entWebPage" className="form-label">Website</label>
    <input
      type="url"
      id="entWebPage"
      name="entWebPage"
      className="form-control"
      value={formState.entWebPage || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Email Address */}
  <div className="col-md-6 mb-3">
    <label htmlFor="entEMailAddress" className="form-label">Email Address</label>
    <input
      type="email"
      id="entEMailAddress"
      name="entEMailAddress"
      className="form-control"
      value={formState.entEMailAddress || ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>

  {/* Date Entered */}
  <div className="col-md-6 mb-3">
    <label htmlFor="dateEntered" className="form-label">Date Entered</label>
    <input
      type="date"
      id="dateEntered"
      name="dateEntered"
      className="form-control"
      value={formState.dateEntered ? formState.dateEntered.split('T')[0] : ''}
      onChange={handleChange}
      disabled={!isEditing}
    />
  </div>
</div>

    
    
        {/* Buttons for handling actions and navigation */}
      <div className="d-flex justify-content-between mt-4">

        <div>
          {!isEditing ? (
            <button
              className="btn btn-primary me-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="btn btn-success me-2"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-warning me-2"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </>
          )}

          <button
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>

        </div>
      </div>
    </div>
    </>
  );
};

export default EntDetailsPage;
