import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminStats, leaveRequests, repairRequests, roomBookingRequests, roomChangeRequests } from '@/lib/data';
import { Bed, CalendarClock, Home, Users, Wrench } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TechnicianHeatmap } from '@/components/admin/technician-heatmap';

function DashboardStats() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{adminStats.totalRooms}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Occupied Beds</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{adminStats.occupiedBeds}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Leaves</CardTitle>
                    <CalendarClock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{adminStats.activeLeaves}</div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Ongoing Repairs</CardTitle>
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{adminStats.ongoingRepairs}</div>
                </CardContent>
            </Card>
        </div>
    );
}

function RoomApprovals() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Room Booking Approvals</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Room/Bed</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roomBookingRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.studentName} ({req.studentId})</TableCell>
                                <TableCell>Room {req.roomNumber}, Bed {req.bedNumber}</TableCell>
                                <TableCell>{req.date}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">Approve</Button>
                                    <Button size="sm" variant="destructive">Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function RoomChangeApprovals() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Room Change Approvals</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {roomChangeRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.studentName}</TableCell>
                                <TableCell>Room {req.currentRoom}</TableCell>
                                <TableCell>Room {req.requestedRoom}, Bed {req.requestedBed}</TableCell>
                                <TableCell className="max-w-xs truncate">{req.reason}</TableCell>
                                <TableCell><Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Pending' ? 'secondary' : 'destructive'}>{req.status}</Badge></TableCell>
                                <TableCell className="text-right space-x-2">
                                    {req.status === 'Pending' && <>
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">Approve</Button>
                                        <Button size="sm" variant="destructive">Reject</Button>
                                    </>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}


function LeaveApprovals() {
    return (
         <Card>
            <CardHeader>
                <CardTitle>Leave Approvals</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Dates</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaveRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell className="font-medium">{req.studentName}</TableCell>
                                <TableCell>{req.roomNumber}</TableCell>
                                <TableCell>{req.fromDate} to {req.toDate}</TableCell>
                                <TableCell className="max-w-xs truncate">{req.reason}</TableCell>
                                <TableCell><Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Pending' ? 'secondary' : 'destructive'}>{req.status}</Badge></TableCell>
                                <TableCell className="text-right space-x-2">
                                    {req.status === 'Pending' && <>
                                        <Button size="sm" variant="outline" className="text-green-600 border-green-600 hover:bg-green-100 hover:text-green-700">Approve</Button>
                                        <Button size="sm" variant="destructive">Reject</Button>
                                    </>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

function RepairRequests() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Repair Requests</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Room</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {repairRequests.map(req => (
                            <TableRow key={req.id}>
                                <TableCell>{req.roomNumber}</TableCell>
                                <TableCell>{req.repairType}</TableCell>
                                <TableCell className="max-w-xs truncate">{req.description}</TableCell>
                                <TableCell><Badge variant={req.status === 'Completed' ? 'default' : req.status === 'In-Progress' ? 'secondary' : 'destructive'}>{req.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button size="sm" variant="outline">Update Status</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export default function AdminDashboardPage({ searchParams }: { searchParams: { tab: string }}) {
  const tab = searchParams.tab || 'dashboard';

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <Tabs defaultValue={tab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Overview</TabsTrigger>
          <TabsTrigger value="approvals">Room Approvals</TabsTrigger>
          <TabsTrigger value="changes">Change Room</TabsTrigger>
          <TabsTrigger value="leaves">Leave Approvals</TabsTrigger>
          <TabsTrigger value="repairs">Repair Requests</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <DashboardStats />
          <TechnicianHeatmap />
        </TabsContent>
        <TabsContent value="approvals">
          <RoomApprovals />
        </TabsContent>
        <TabsContent value="changes">
          <RoomChangeApprovals />
        </TabsContent>
        <TabsContent value="leaves">
          <LeaveApprovals />
        </TabsContent>
        <TabsContent value="repairs">
          <RepairRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
}
