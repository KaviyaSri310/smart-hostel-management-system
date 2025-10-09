import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, LogOut, User, LayoutDashboard, BedDouble, Wrench, CalendarPlus, Repeat } from 'lucide-react';
import { SmartHostelLogo } from '@/components/icons';

function StudentHeader() {
  const navLinks = [
    { href: "/student/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/student/room-selection", label: "Room Selection", icon: BedDouble },
    { href: "/student/change-room-request", label: "Change Room", icon: Repeat },
    { href: "/student/repair-request", label: "Repair Request", icon: Wrench },
    { href: "/student/leave-request", label: "Leave Request", icon: CalendarPlus },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/student/dashboard" className="flex items-center gap-2 font-semibold">
          <SmartHostelLogo className="h-8 w-8" />
          <span className="hidden sm:inline-block text-xl font-bold text-primary">SmartHostel</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-muted-foreground transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium p-6">
                  <Link href="/student/dashboard" className="flex items-center gap-4 text-xl font-semibold mb-4">
                     <SmartHostelLogo className="h-10 w-10" />
                     <span className="font-bold text-primary">SmartHostel</span>
                  </Link>
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="flex items-center gap-4 text-muted-foreground hover:text-foreground">
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src="https://picsum.photos/seed/student_avatar/100/100" alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="font-medium">Alex Johnson</div>
                <div className="text-xs text-muted-foreground">alex.j@example.com</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/student/dashboard"><User className="mr-2 h-4 w-4" /><span>Profile</span></Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/login"><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}


export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StudentHeader />
      <main className="flex-1">
        <div className="container py-8 px-4 md:px-6">
            {children}
        </div>
      </main>
    </div>
  );
}
