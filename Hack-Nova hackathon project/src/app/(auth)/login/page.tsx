'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Key, Mail } from 'lucide-react';
import { SmartHostelLogo } from '@/components/icons';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const router = useRouter();

  const handleRoleChange = (value: string) => {
    setRole(value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formAction = role === 'admin' ? '/admin/dashboard' : '/student/dashboard';
    router.push(formAction);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader className="text-center">
        <Link href="/" className="flex justify-center mb-4">
          <SmartHostelLogo className="w-20 h-20" />
        </Link>
        <CardTitle className="text-3xl font-bold">SmartHostel Login</CardTitle>
        <CardDescription>Select your role and enter your credentials to login.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div className="space-y-2">
            <Label>Login As</Label>
            <RadioGroup defaultValue="student" onValueChange={handleRoleChange} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Admin</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email / ID</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={role === 'student' ? 'student@example.com' : 'admin@example.com'}
                required
                className="pl-10"
                defaultValue={role === 'student' ? 'student@example.com' : 'admin@example.com'}
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" required className="pl-10" defaultValue="password" />
            </div>
          </div>
          <Button type="submit" className="w-full text-lg font-semibold">
            Login
          </Button>
          {role === 'student' && (
            <div className="text-center mt-4">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/signup" className="font-semibold text-primary hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
