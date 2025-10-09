'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { rooms as mockRooms, students, roomChangeRequests as mockRequests, type Bed, type Room, type RoomChangeRequest } from '@/lib/data';
import { Armchair, Users, DollarSign, Repeat, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Screen = () => (
    <div className="w-full h-1 bg-primary/50 rounded-full shadow-lg shadow-primary/30 mb-2"></div>
);

const currentUser = students[0];

export default function ChangeRoomRequestPage() {
    const [rooms, setRooms] = useState<Room[]>(mockRooms.map(r => ({
        ...r,
        beds: r.beds.map(b => (b.studentId === currentUser.id ? { ...b, status: 'occupied' } : b))
    })));
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
    const [reason, setReason] = useState('');
    const [requests, setRequests] = useState<RoomChangeRequest[]>(mockRequests.filter(r => r.studentId === currentUser.id));
    const { toast } = useToast();

    const handleBedSelect = (bed: Bed, room: Room) => {
        if (bed.status === 'occupied') return;

        setSelectedBed(prevBed => {
            const isSameBed = prevBed?.id === bed.id;
            
            setRooms(currentRooms => currentRooms.map(r => {
                const newBeds = r.beds.map(b => {
                    if (b.status === 'selected') return { ...b, status: 'available' as const };
                    if (!isSameBed && b.id === bed.id) return { ...b, status: 'selected' as const };
                    return b;
                });
                return { ...r, beds: newBeds };
            }));

            if(isSameBed) {
                setSelectedRoom(null);
                return null;
            } else {
                setSelectedRoom(room);
                return bed;
            }
        });
    };

    const handleConfirmRequest = () => {
        if (selectedBed && selectedRoom && reason) {
             const newRequest: RoomChangeRequest = {
                id: `change${requests.length + 1}`,
                studentId: currentUser.id,
                studentName: currentUser.name,
                currentRoom: currentUser.roomNumber || 'N/A',
                requestedRoom: selectedRoom.roomNumber,
                requestedBed: selectedBed.bedNumber,
                reason,
                date: new Date().toISOString().split('T')[0],
                status: 'Pending',
            };
            setRequests(prev => [newRequest, ...prev]);
            toast({
                title: "Room Change Request Sent!",
                description: `Your request for bed ${selectedBed.bedNumber} in room ${selectedRoom.roomNumber} is pending approval.`,
            });
            // Reset state
            setSelectedBed(null);
            setSelectedRoom(null);
            setReason('');
             setRooms(mockRooms.map(r => ({
                ...r,
                beds: r.beds.map(b => (b.studentId === currentUser.id ? { ...b, status: 'occupied' } : b))
            })));
        } else if (!reason) {
            toast({
                variant: 'destructive',
                title: "Reason Required",
                description: "Please provide a reason for your room change request.",
            });
        }
    };
    
    const availableRooms = rooms.map(room => ({
        ...room,
        availableBeds: room.beds.filter(b => b.status === 'available').length
    })).filter(room => room.availableBeds > 0 && room.roomNumber !== currentUser.roomNumber);

    const fourSharingRooms = availableRooms.filter(r => r.capacity === 4);
    const sixSharingRooms = availableRooms.filter(r => r.capacity === 6);


    return (
        <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold flex items-center gap-2"><Repeat className="h-8 w-8"/>Change Room Request</CardTitle>
                    <CardDescription>Browse available rooms and submit a request to change your room.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <Card>
                             <CardHeader>
                                <CardTitle>Current Room</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-lg"><strong>Room:</strong> {currentUser.roomNumber}</p>
                                <p className="text-lg"><strong>Bed:</strong> {currentUser.bedNumber}</p>
                            </CardContent>
                        </Card>
                        <Card>
                           <CardHeader>
                                <CardTitle>Request Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {selectedRoom && selectedBed ? (
                                    <div>
                                        <p><strong>Selected Room:</strong> {selectedRoom.roomNumber}</p>
                                        <p><strong>Selected Bed:</strong> {selectedBed.bedNumber}</p>
                                    </div>
                                ) : (
                                    <p className="text-muted-foreground">Select a bed from an available room.</p>
                                )}
                                <div className="space-y-2">
                                    <Label htmlFor="reason">Reason for Change</Label>
                                    <Textarea 
                                        id="reason" 
                                        placeholder="Explain why you want to change your room..." 
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        disabled={!selectedBed}
                                    />
                                </div>
                                <Button onClick={handleConfirmRequest} disabled={!selectedBed || !reason} className="w-full">
                                    Submit Request
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                     <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Available 4-Sharing Rooms</h2>
                            {fourSharingRooms.length > 0 ? (
                                <div className="p-4 bg-card rounded-xl shadow-inner-lg space-y-4">
                                    <Screen />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {fourSharingRooms.map(room => (
                                            <RoomCard key={room.id} room={room} onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
                                        ))}
                                    </div>
                                </div>
                            ) : <p className="text-muted-foreground">No 4-sharing rooms available.</p>}
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Available 6-Sharing Rooms</h2>
                            {sixSharingRooms.length > 0 ? (
                            <div className="p-4 bg-card rounded-xl shadow-inner-lg space-y-4">
                                <Screen />
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {sixSharingRooms.map(room => (
                                        <RoomCard key={room.id} room={room} onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />
                                    ))}
                                </div>
                            </div>
                             ) : <p className="text-muted-foreground">No 6-sharing rooms available.</p>}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Request History</CardTitle>
                </CardHeader>
                <CardContent>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Requested Room</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {requests.map(req => (
                                <TableRow key={req.id}>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell>Room {req.requestedRoom}, Bed {req.requestedBed}</TableCell>
                                    <TableCell className="max-w-xs truncate">{req.reason}</TableCell>
                                    <TableCell>
                                        <Badge variant={req.status === 'Approved' ? 'default' : req.status === 'Pending' ? 'secondary' : 'destructive'}>
                                            {req.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>


            {selectedRoom && (
                <Dialog open={!!selectedRoom} onOpenChange={(isOpen) => { if (!isOpen) setSelectedRoom(null); }}>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Select a Bed in Room {selectedRoom.roomNumber}</DialogTitle>
                            <DialogDescription>
                                Click on an available bed to make your selection. Your current selection is highlighted in blue.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="p-6 bg-secondary rounded-lg">
                            <div className={`grid ${selectedRoom.capacity === 4 ? 'grid-cols-2' : 'grid-cols-3'} gap-4`}>
                                {selectedRoom.beds.map(bed => (
                                    <Button
                                        key={bed.id}
                                        variant="outline"
                                        className={cn(
                                            "h-20 flex-col",
                                            bed.status === 'available' && 'bg-green-100 border-green-400 hover:bg-green-200 text-green-800',
                                            bed.status === 'occupied' && 'bg-muted border-muted-foreground cursor-not-allowed text-muted-foreground',
                                            bed.id === selectedBed?.id ? 'bg-blue-200 border-blue-500 ring-2 ring-blue-500 text-blue-800' : ''
                                        )}
                                        onClick={() => handleBedSelect(bed, selectedRoom)}
                                        disabled={bed.status === 'occupied'}
                                    >
                                        <Armchair className="h-6 w-6 mb-1" />
                                        <span className="font-semibold">Bed {bed.bedNumber}</span>
                                    </Button>
                                ))}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                               <Button variant="outline">Done</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

function RoomCard({ room, onSelectRoom, selectedRoom }: { room: Room, onSelectRoom: (room: Room) => void, selectedRoom: Room | null }) {
    const isSelected = selectedRoom?.id === room.id;
    return (
        <Card 
            className={cn(
                "cursor-pointer hover:shadow-primary/20 hover:shadow-lg transition-all",
                isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20"
            )}
            onClick={() => onSelectRoom(room)}
        >
            <CardHeader className="p-4">
                <CardTitle className="text-center">
                    <span className="font-bold text-xl text-primary">{room.roomNumber}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 text-sm text-center text-muted-foreground space-y-1">
                <div className="flex items-center justify-center gap-1"><Users className="h-4 w-4" /><span>{room.capacity}-Sharing</span></div>
                <div className="flex items-center justify-center gap-1"><DollarSign className="h-4 w-4" /><span>{room.cost}/month</span></div>
                <Badge variant="outline" className="mt-2 w-full justify-center">{room.availableBeds} beds available</Badge>
            </CardContent>
        </Card>
    );
}
