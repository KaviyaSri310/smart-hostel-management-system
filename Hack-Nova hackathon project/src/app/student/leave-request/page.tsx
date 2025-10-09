'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { leaveRequests as mockRequests } from '@/lib/data';
import { LeaveRequest } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const leaveSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: 'A start date is required.' }),
    to: z.date({ required_error: 'An end date is required.' }),
  }),
  reason: z.string().min(10, { message: 'Please provide a reason of at least 10 characters.' }),
});

type LeaveFormValues = z.infer<typeof leaveSchema>;

export default function LeaveRequestPage() {
  const [requests, setRequests] = useState<LeaveRequest[]>(mockRequests);
  const { toast } = useToast();

  const form = useForm<LeaveFormValues>({
    resolver: zodResolver(leaveSchema),
  });

  const onSubmit: SubmitHandler<LeaveFormValues> = (data) => {
    const newRequest: LeaveRequest = {
      id: `leave${requests.length + 1}`,
      studentName: 'Alex Johnson',
      roomNumber: '101',
      fromDate: format(data.dateRange.from, 'yyyy-MM-dd'),
      toDate: format(data.dateRange.to, 'yyyy-MM-dd'),
      reason: data.reason,
      status: 'Pending',
    };
    setRequests(prev => [newRequest, ...prev]);
    toast({
      title: 'Leave Request Submitted!',
      description: 'Your request has been sent for approval.',
    });
    form.reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Submit a Leave Request</CardTitle>
            <CardDescription>Fill out the form below to apply for leave from the hostel.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="dateRange"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>From - To Dates</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value?.from && "text-muted-foreground"
                              )}
                            >
                              {field.value?.from ? (
                                field.value.to ? (
                                  <>
                                    {format(field.value.from, "LLL dd, y")} -{" "}
                                    {format(field.value.to, "LLL dd, y")}
                                  </>
                                ) : (
                                  format(field.value.from, "LLL dd, y")
                                )
                              ) : (
                                <span>Pick a date range</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="range"
                            selected={{ from: field.value?.from, to: field.value?.to }}
                            onSelect={field.onChange}
                            numberOfMonths={2}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Leave</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Attending a family function." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
            <CardDescription>Track the status of your past leave requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dates</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map(req => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.fromDate} to {req.toDate}</TableCell>
                    <TableCell>
                      <Badge
                         variant={req.status === 'Approved' ? 'default' : req.status === 'Pending' ? 'secondary' : 'destructive'}
                         className={cn(
                             req.status === 'Approved' && 'bg-green-600',
                             req.status === 'Pending' && 'bg-yellow-500',
                             req.status === 'Rejected' && 'bg-red-600'
                         )}
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
