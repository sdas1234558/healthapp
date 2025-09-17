import type { PathologyLab, LabTest } from './pathology-types';

const commonTests: LabTest[] = [
  {
    id: 'cbc',
    name: 'Complete Blood Count (CBC)',
    description: 'Measures different components of your blood including red cells, white cells, and platelets.',
    price: 500,
    reportTime: '24 hours',
    collectionTime: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
    preparation: 'Fasting for 8-12 hours may be required',
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile',
    description: 'Measures thyroid hormones to check thyroid gland function.',
    price: 800,
    reportTime: '24 hours',
    collectionTime: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM'],
    preparation: 'No special preparation needed',
  },
  {
    id: 'diabetes',
    name: 'Diabetes Screening',
    description: 'Measures blood glucose levels to check for diabetes.',
    price: 400,
    reportTime: '12 hours',
    collectionTime: ['07:00 AM', '08:00 AM', '09:00 AM'],
    preparation: 'Fasting for 8-12 hours required',
  },
  {
    id: 'lipid',
    name: 'Lipid Profile',
    description: 'Measures cholesterol and triglycerides.',
    price: 600,
    reportTime: '24 hours',
    collectionTime: ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM'],
    preparation: 'Fasting for 12-14 hours required',
  },
];

export const mockPathologyLabs: PathologyLab[] = [
  {
    id: 'lab1',
    name: 'HealthFirst Diagnostics',
    address: '123 Medical Avenue, Central District',
    coordinates: {
      lat: 22.5726,
      lng: 88.3639,
    },
    rating: 4.5,
    availableTests: commonTests,
    openingHours: '7:00 AM - 8:00 PM',
    contactNumber: '+91-9876543210',
    homeCollection: true,
    accreditation: ['NABL', 'ISO 15189:2012'],
  },
  {
    id: 'lab2',
    name: 'City Central Labs',
    address: '456 Healthcare Street, North District',
    coordinates: {
      lat: 22.5826,
      lng: 88.3739,
    },
    rating: 4.3,
    availableTests: commonTests,
    openingHours: '6:00 AM - 9:00 PM',
    contactNumber: '+91-9876543211',
    homeCollection: true,
    accreditation: ['NABL'],
  },
  {
    id: 'lab3',
    name: 'Premium Diagnostics',
    address: '789 Wellness Road, South District',
    coordinates: {
      lat: 22.5626,
      lng: 88.3539,
    },
    rating: 4.7,
    availableTests: commonTests,
    openingHours: '7:00 AM - 7:00 PM',
    contactNumber: '+91-9876543212',
    homeCollection: false,
    accreditation: ['NABL', 'CAP'],
  },
];