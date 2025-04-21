import { Entertainer } from "./Entertainer";

// Engagement interface representing an engagement record
export interface Engagement {
    engagementNumber: number;
    startDate?: string;    // ISO date string
    endDate?: string;      // ISO date string
    startTime?: string;    // e.g. "14:00:00"
    stopTime?: string;     // e.g. "18:30:00"
    contractPrice?: number;
    customerID: number;
    agentID: number;
    entertainerID: number;
    entertainer?: Entertainer; // Optional, to include entertainer details
}