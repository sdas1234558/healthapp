export type LabTest = {
  id: string;
  name: string;
  description: string;
  price: number;
  reportTime: string; // e.g., "24 hours", "48 hours"
  collectionTime: string[]; // Available time slots
  preparation?: string; // Any special preparation needed
};

export type PathologyLab = {
  id: string;
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: number; // Will be calculated based on user location
  rating: number;
  availableTests: LabTest[];
  openingHours: string;
  contactNumber: string;
  homeCollection: boolean;
  accreditation: string[];
};

export type BookingDetails = {
  labId: string;
  testId: string;
  appointmentDate: Date;
  timeSlot: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  isHomeCollection: boolean;
  address?: string;
};