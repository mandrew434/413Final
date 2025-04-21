import { Entertainer } from "../types/Entertainer";


// Shape of the object returned by EntertainersBookingSummary

export interface BookingSummary {
  entStageName: string;
  bookingCount: number;
  lastBookedDate?: string;
  entertainerID: number;
}

const API_URL = "https://localhost:5000/EntertainmentAgency";


// GET /EntertainmentAgency/EntertainersBookingSummary
export const fetchBookingSummaries = async (): Promise<BookingSummary[]> => {
  try {
    const response = await fetch(`${API_URL}/EntertainersBookingSummary`);
    if (!response.ok) {
      throw new Error("Failed to fetch booking summaries");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching booking summaries:", error);
    throw error;
  }
};

// GET /EntertainmentAgency/EntertainerDetails/{id}

export const fetchEntertainerDetails = async (id: number): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/EntertainerDetails/${id}`);
    if (response.status === 404) {
      throw new Error("Entertainer not found");
    }
    if (!response.ok) {
      throw new Error("Failed to fetch entertainer details");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching entertainer details:", error);
    throw error;
  }
};

// POST /EntertainmentAgency/AddEntertainer
export const addEntertainer = async (
  newEntertainer: Omit<Entertainer, 'entertainerID'>
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/AddEntertainer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEntertainer),
    });
    if (!response.ok) {
      throw new Error("Failed to add entertainer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding entertainer:", error);
    throw error;
  }
};

// PUT /EntertainmentAgency/UpdateEntertainer/{id}
export const updateEntertainer = async (
  id: number,
  updatedEntertainer: Entertainer
): Promise<Entertainer> => {
  try {
    const response = await fetch(`${API_URL}/UpdateEntertainer/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedEntertainer),
    });
    if (!response.ok) {
      throw new Error("Failed to update entertainer");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating entertainer:", error);
    throw error;
  }
};

// DELETE /EntertainmentAgency/DeleteEntertainer/{id}
export const deleteEntertainer = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/DeleteEntertainer/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete entertainer");
      }
    } catch (error) {
      console.error("Error deleting entertainer:", error);
      throw error;
    }
  };
  
