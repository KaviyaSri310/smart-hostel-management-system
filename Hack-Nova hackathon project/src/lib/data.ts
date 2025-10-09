import { Room, Student, RepairRequest, LeaveRequest, RoomBookingRequest, RoomChangeRequest } from './definitions';

export const rooms: Room[] = [
  { id: '101', roomNumber: '101', capacity: 4, cost: 8000, availability: 'Available', beds: [
    { id: '101-1', bedNumber: 1, status: 'available' },
    { id: '101-2', bedNumber: 2, status: 'occupied', studentId: '2' },
    { id: '101-3', bedNumber: 3, status: 'available' },
    { id: '101-4', bedNumber: 4, status: 'occupied', studentId: '3' },
  ]},
  { id: '102', roomNumber: '102', capacity: 4, cost: 8000, availability: 'Available', beds: [
    { id: '102-1', bedNumber: 1, status: 'available' },
    { id: '102-2', bedNumber: 2, status: 'available' },
    { id: '102-3', bedNumber: 3, status: 'available' },
    { id: '102-4', bedNumber: 4, status: 'available' },
  ]},
  { id: '201', roomNumber: '201', capacity: 6, cost: 6000, availability: 'Available', beds: [
    { id: '201-1', bedNumber: 1, status: 'available' },
    { id: '201-2', bedNumber: 2, status: 'occupied', studentId: '4' },
    { id: '201-3', bedNumber: 3, status: 'occupied', studentId: '5' },
    { id: '201-4', bedNumber: 4, status: 'available' },
    { id: '201-5', bedNumber: 5, status: 'available' },
    { id: '201-6', bedNumber: 6, status: 'occupied', studentId: '6' },
  ]},
  { id: '202', roomNumber: '202', capacity: 6, cost: 6000, availability: 'Occupied', beds: [
    { id: '202-1', bedNumber: 1, status: 'occupied' },
    { id: '202-2', bedNumber: 2, status: 'occupied' },
    { id: '202-3', bedNumber: 3, status: 'occupied' },
    { id: '202-4', bedNumber: 4, status: 'occupied' },
    { id: '202-5', bedNumber: 5, status: 'occupied' },
    { id: '202-6', bedNumber: 6, status: 'occupied' },
  ]},
];

export const students: Student[] = [
  { id: '1', name: 'Alex Johnson', department: 'Computer Science', roomNumber: '101', bedNumber: 1 },
  { id: '2', name: 'Maria Garcia', department: 'Electrical Engineering', roomNumber: '101', bedNumber: 2 },
  { id: '3', name: 'Chen Wei', department: 'Mechanical Engineering', roomNumber: '101', bedNumber: 4 },
  { id: '4', name: 'Fatima Al-Fassi', department: 'Civil Engineering', roomNumber: '201', bedNumber: 2 },
  { id: '5', name: 'David Smith', department: 'Physics', roomNumber: '201', bedNumber: 3 },
  { id: '6', name: 'Yuki Tanaka', department: 'Chemistry', roomNumber: '201', bedNumber: 6 },
];

export const repairRequests: RepairRequest[] = [
  { id: 'rep1', studentName: 'Maria Garcia', roomNumber: '101', repairType: 'Fan', description: 'Fan is making a loud rattling noise.', date: '2024-07-20', status: 'Completed' },
  { id: 'rep2', studentName: 'Chen Wei', roomNumber: '101', repairType: 'Light', description: 'Tube light in the room is flickering constantly.', date: '2024-07-22', status: 'In-Progress' },
  { id: 'rep3', studentName: 'David Smith', roomNumber: '201', repairType: 'Furniture', description: 'The study chair leg is broken.', date: '2024-07-23', status: 'Pending' },
];

export const leaveRequests: LeaveRequest[] = [
  { id: 'leave1', studentName: 'Fatima Al-Fassi', roomNumber: '201', fromDate: '2024-07-25', toDate: '2024-07-28', reason: 'Family function.', status: 'Approved' },
  { id: 'leave2', studentName: 'Yuki Tanaka', roomNumber: '201', fromDate: '2024-08-01', toDate: '2024-08-05', reason: 'Attending a conference.', status: 'Pending' },
  { id: 'leave3', studentName: 'Maria Garcia', roomNumber: '101', fromDate: '2024-07-30', toDate: '2024-08-02', reason: 'Personal reasons.', status: 'Rejected', rejectionReason: 'Insufficient notice period.' },
];

export const roomBookingRequests: RoomBookingRequest[] = [
    { id: 'book1', studentName: 'Priya Sharma', studentId: 'S7', roomNumber: '102', bedNumber: 1, date: '2024-07-22' },
    { id: 'book2', studentName: 'John Doe', studentId: 'S8', roomNumber: '102', bedNumber: 2, date: '2024-07-23' },
    { id: 'book3', studentName: 'Jane Smith', studentId: 'S9', roomNumber: '201', bedNumber: 1, date: '2024-07-24' },
];

export const roomChangeRequests: RoomChangeRequest[] = [
    { id: 'change1', studentName: 'Chen Wei', studentId: '3', currentRoom: '101', requestedRoom: '102', requestedBed: 3, reason: 'Wants to be with friends.', date: '2024-07-25', status: 'Pending' },
    { id: 'change2', studentName: 'Yuki Tanaka', studentId: '6', currentRoom: '201', requestedRoom: '102', requestedBed: 4, reason: 'Prefers a 4-sharing room.', date: '2024-07-26', status: 'Approved' },
];

export const adminStats = {
    totalRooms: 50,
    occupiedBeds: 180,
    activeLeaves: 5,
    ongoingRepairs: 2,
};
