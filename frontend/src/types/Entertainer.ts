
// This file defines the Entertainer interface, which represents an entertainer's information.
export interface Entertainer {
    entertainerID: number;
    entStageName?: string;
    entSSN?: string;
    entStreetAddress?: string;
    entCity?: string;
    entState?: string;
    entZipCode?: string;
    entPhoneNumber?: string;
    entWebPage?: string;
    entEMailAddress?: string;
    dateEntered?: string;  // ISO date string
  }