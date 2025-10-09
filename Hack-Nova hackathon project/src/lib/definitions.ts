export type Room = {
  id: string;
  roomNumber: string;
  capacity: 4 | 6;
  cost: number;
  availability: 'Available' | 'Occupied';
  beds: Bed[];
};

export type Bed = {
  id: string;
  bedNumber: number;
  status: 'available' | 'occupied' | 'selected';
  studentId?: string;
};

export type Student = {
  id: string;
  name: string;
  department: string;
  roomNumber?: string;
  bedNumber?: number;
};

export type RepairRequest = {
  id: string;
  studentName: string;
  roomNumber: string;
  repairType: 'Fan' | 'Light' | 'Bathroom' | 'Furniture' | 'Other';
  description: string;
  date: string;
  status: 'Pending' | 'In-Progress' | 'Completed';
};

export type LeaveRequest = {
  id: string;
  studentName: string;
  roomNumber: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  rejectionReason?: string;
};

export type RoomBookingRequest = {
  id: string;
  studentName: string;
  studentId: string;
  roomNumber: string;
  bedNumber: number;
  date: string;
};

export type RoomChangeRequest = {
  id: string;
  studentName: string;
  studentId: string;
  currentRoom: string;
  requestedRoom: string;
  requestedBed: number;
  reason: string;
  date: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};
