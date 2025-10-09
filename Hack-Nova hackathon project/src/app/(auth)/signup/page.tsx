'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SmartHostelLogo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Copy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const [groupCode, setGroupCode] = useState('');
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const generateGroupCode = () => {
    if (isClient) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGroupCode(code);
    }
  };

  const copyGroupCode = () => {
    if (groupCode && isClient) {
      navigator.clipboard.writeText(groupCode);
      toast({
        title: "Copied!",
        description: "Group code has been copied to clipboard.",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-2xl my-8">
      <CardHeader className="text-center">
        <Link href="/" className="flex justify-center mb-4">
          <SmartHostelLogo className="w-20 h-20" />
        </Link>
        <CardTitle className="text-3xl font-bold">Student Registration</CardTitle>
        <CardDescription>Fill out the form to create your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="Computer Science" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="motherTongue">Mother Tongue</Label>
              <Input id="motherTongue" placeholder="English" required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="place">Place (City/Town)</Label>
              <Input id="place" placeholder="New York" required />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Room Type</Label>
                <RadioGroup defaultValue="non-ac" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ac" id="ac" />
                    <Label htmlFor="ac">AC</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="non-ac" id="non-ac" />
                    <Label htmlFor="non-ac">Non-AC</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label>Bathroom Type</Label>
                <RadioGroup defaultValue="common" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="attached" id="attached" />
                    <Label htmlFor="attached">Attached</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="common" id="common" />
                    <Label htmlFor="common">Common</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">Group Booking (Optional)</h3>
             </div>
             <p className="text-sm text-muted-foreground">Want to room with friends? Generate a code and share it with them, or join an existing group.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div>
                <Button type="button" variant="outline" onClick={generateGroupCode} className="w-full">
                  Generate Group Code
                </Button>
                {groupCode && (
                  <div className="mt-2 flex items-center justify-between rounded-md border bg-muted p-2">
                    <span className="font-mono text-lg font-semibold text-primary">{groupCode}</span>
                    <Button type="button" size="icon" variant="ghost" onClick={copyGroupCode}>
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="joinGroup">Join Group</Label>
                <Input id="joinGroup" placeholder="Enter group code" />
              </div>
            </div>
          </div>

          <Link href="/student/room-selection" passHref>
            <Button type="submit" className="w-full text-lg font-semibold">
              Next → Room Selection
            </Button>
          </Link>

          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
