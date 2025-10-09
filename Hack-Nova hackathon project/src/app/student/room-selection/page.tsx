'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { rooms as mockRooms, type Bed, type Room } from '@/lib/data';
import { Armchair, Users, DollarSign, CheckCircle, XCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const Screen = () => (
    <div className="w-full h-1 bg-primary/50 rounded-full shadow-lg shadow-primary/30 mb-2"></div>
);

export default function RoomSelectionPage() {
    const [rooms, setRooms] = useState<Room[]>(mockRooms);
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
    const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'idle' | 'pending' | 'approved' | 'rejected'>('idle');
    const { toast } = useToast();

    const handleBedSelect = (bed: Bed) => {
        if (bed.status === 'occupied') return;
        
        setSelectedBed(prevBed => prevBed?.id === bed.id ? null : bed);

        if (selectedRoom) {
             const updatedRooms = rooms.map(r => {
                if (r.id === selectedRoom.id) {
                    const updatedBeds = r.beds.map(b => {
                        if (b.status === 'selected') return { ...b, status: 'available' as 'available' };
                        if (b.id === bed.id) return { ...b, status: 'selected' as 'selected' };
                        return b;
                    });
                    return { ...r, beds: updatedBeds };
                }
                return r;
            });
            setRooms(updatedRooms);
        }
    };

    const handleConfirmBooking = () => {
        if (selectedBed) {
            setBookingStatus('pending');
            toast({
                title: "Booking Request Sent!",
                description: `Your request for bed ${selectedBed.bedNumber} in room ${selectedRoom?.roomNumber} is pending approval.`,
            });
        }
    };

    const fourSharingRooms = rooms.filter(r => r.capacity === 4);
    const sixSharingRooms = rooms.filter(r => r.capacity === 6);

    return (
        <Dialog onOpenChange={(isOpen) => { if (!isOpen) { setSelectedRoom(null); setSelectedBed(null); } }}>
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold">Room Selection</CardTitle>
                        <CardDescription>Select your desired room and bed. Green is available, gray is occupied, and blue is your selection.</CardDescription>
                    </CardHeader>
                    {bookingStatus !== 'idle' && (
                        <CardContent>
                            <div className="p-4 rounded-lg bg-secondary border">
                                <h3 className="font-semibold text-lg mb-2">Booking Status</h3>
                                {bookingStatus === 'pending' && <Badge variant="default" className="bg-yellow-500 hover:bg-yellow-600"><Clock className="mr-2 h-4 w-4"/>Pending Approval</Badge>}
                                {bookingStatus === 'approved' && <Badge variant="default" className="bg-green-500 hover:bg-green-600"><CheckCircle className="mr-2 h-4 w-4"/>Approved</Badge>}
                                {bookingStatus === 'rejected' && <Badge variant="destructive"><XCircle className="mr-2 h-4 w-4"/>Rejected</Badge>}
                                <p className="text-sm text-muted-foreground mt-2">Your request for Bed {selectedBed?.bedNumber} in Room {selectedRoom?.roomNumber} is currently {bookingStatus}.</p>
                            </div>
                        </CardContent>
                    )}
                </Card>

                <div className="space-y-8">
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">4-Sharing Rooms</h2>
                        <div className="p-4 bg-card rounded-xl shadow-inner-lg space-y-4">
                            <Screen />
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {fourSharingRooms.map(room => (
                                    <RoomCard key={room.id} room={room} onSelectRoom={setSelectedRoom} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold mb-4">6-Sharing Rooms</h2>
                        <div className="p-4 bg-card rounded-xl shadow-inner-lg space-y-4">
                            <Screen />
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {sixSharingRooms.map(room => (
                                    <RoomCard key={room.id} room={room} onSelectRoom={setSelectedRoom} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedRoom && (
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Select a Bed in Room {selectedRoom.roomNumber}</DialogTitle>
                            <DialogDescription>
                                Click on an available bed to make your selection.
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
                                            bed.status === 'selected' && 'bg-blue-200 border-blue-500 ring-2 ring-blue-500 text-blue-800'
                                        )}
                                        onClick={() => handleBedSelect(bed)}
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
                               <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button onClick={handleConfirmBooking} disabled={!selectedBed}>
                                    Confirm Booking
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                )}
            </div>
        </Dialog>
    );
}

function RoomCard({ room, onSelectRoom }: { room: Room, onSelectRoom: (room: Room) => void }) {
    return (
        <DialogTrigger asChild>
            <Card 
                className="cursor-pointer hover:shadow-primary/20 hover:shadow-lg transition-shadow"
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
                </CardContent>
            </Card>
        </DialogTrigger>
    );
}
