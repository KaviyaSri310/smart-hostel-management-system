import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { students } from "@/lib/data";
import { BedDouble, Bell, CalendarPlus, Repeat, User, Users, Wrench } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const currentUser = students[0];
const roommates = students.filter(s => s.roomNumber === currentUser.roomNumber && s.id !== currentUser.id);

const notifications = [
    { id: 1, text: "Your booking for room 101 has been approved.", time: "2 days ago", read: false },
    { id: 2, text: "Maintenance for the water filter on your floor is scheduled for tomorrow.", time: "1 day ago", read: false },
    { id: 3, text: "Your leave request from 2024-07-15 to 2024-07-18 was approved.", time: "5 days ago", read: true },
];

export default function StudentDashboardPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Welcome, {currentUser.name}!</h1>
                <p className="text-muted-foreground">Here's your hostel life at a glance.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link href="/student/repair-request">
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-secondary transition-colors h-full">
                        <Wrench className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">Repair Request</h3>
                        <p className="text-muted-foreground text-sm">Report a maintenance issue</p>
                    </Card>
                </Link>
                <Link href="/student/leave-request">
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-secondary transition-colors h-full">
                        <CalendarPlus className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">Leave Request</h3>
                        <p className="text-muted-foreground text-sm">Apply for an outing or leave</p>
                    </Card>
                </Link>
                 <Link href="/student/room-selection">
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-secondary transition-colors h-full">
                        <BedDouble className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">Book a Room</h3>
                        <p className="text-muted-foreground text-sm">Find and book your new room</p>
                    </Card>
                </Link>
                 <Link href="/student/change-room-request">
                    <Card className="flex flex-col items-center justify-center p-6 text-center hover:bg-secondary transition-colors h-full">
                        <Repeat className="h-12 w-12 text-primary mb-2" />
                        <h3 className="text-xl font-semibold">Change Room</h3>
                        <p className="text-muted-foreground text-sm">Request to change your room</p>
                    </Card>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BedDouble className="h-6 w-6 text-primary"/>Room Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-lg">
                            <div><strong>Room No:</strong> <span className="text-primary font-semibold">{currentUser.roomNumber}</span></div>
                            <div><strong>Bed No:</strong> <span className="text-primary font-semibold">{currentUser.bedNumber}</span></div>
                        </div>
                        <Separator />
                        <div>
                            <h4 className="font-semibold flex items-center gap-2 mb-2"><Users className="h-5 w-5"/>Roommates</h4>
                            <div className="space-y-3">
                                {roommates.map(mate => (
                                    <div key={mate.id} className="flex items-center gap-3">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={`https://picsum.photos/seed/${mate.name.split(' ')[0]}/100/100`} />
                                            <AvatarFallback>{mate.name.slice(0,2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{mate.name}</p>
                                            <p className="text-sm text-muted-foreground">{mate.department}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="h-6 w-6 text-primary"/>Notifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.map(notif => (
                                <div key={notif.id} className={`flex items-start gap-3 p-2 rounded-lg ${!notif.read ? 'bg-primary/10' : ''}`}>
                                    <div className={`mt-1 h-2 w-2 rounded-full ${!notif.read ? 'bg-primary' : 'bg-transparent'}`}></div>
                                    <div>
                                        <p className="text-sm">{notif.text}</p>
                                        <p className="text-xs text-muted-foreground">{notif.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
