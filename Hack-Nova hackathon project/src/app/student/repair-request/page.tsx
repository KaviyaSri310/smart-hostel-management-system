'use client';

import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { repairRequests as mockRequests } from '@/lib/data';
import { RepairRequest } from '@/lib/definitions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, Lightbulb, Loader2 } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';
import { getImageGuidance, ImageGuidanceOutput } from '@/ai/flows/repair-request-image-guidance';
import { cn } from '@/lib/utils';

const repairSchema = z.object({
  repairType: z.string({ required_error: 'Please select a repair type.' }),
  description: z.string().min(10, { message: 'Please describe the issue in at least 10 characters.' }),
  image: z.any().optional(),
});

type RepairFormValues = z.infer<typeof repairSchema>;

export default function RepairRequestPage() {
  const [requests, setRequests] = useState<RepairRequest[]>(mockRequests);
  const { toast } = useToast();
  const [aiGuidance, setAiGuidance] = useState<ImageGuidanceOutput | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const form = useForm<RepairFormValues>({
    resolver: zodResolver(repairSchema),
    defaultValues: { repairType: '', description: '' },
  });

  const descriptionValue = form.watch('description');
  const repairTypeValue = form.watch('repairType');
  const debouncedDescription = useDebounce(descriptionValue, 500);

  useEffect(() => {
    if (debouncedDescription.length > 10 && repairTypeValue) {
      setIsAiLoading(true);
      getImageGuidance({ issueDescription: debouncedDescription, repairType: repairTypeValue })
        .then(setAiGuidance)
        .catch(console.error)
        .finally(() => setIsAiLoading(false));
    } else {
        setAiGuidance(null);
    }
  }, [debouncedDescription, repairTypeValue]);

  const onSubmit: SubmitHandler<RepairFormValues> = (data) => {
    const newRequest: RepairRequest = {
      id: `rep${requests.length + 1}`,
      studentName: 'Alex Johnson',
      roomNumber: '101',
      repairType: data.repairType as RepairRequest['repairType'],
      description: data.description,
      date: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    setRequests(prev => [newRequest, ...prev]);
    toast({
      title: 'Request Submitted!',
      description: 'Your repair request has been sent to the admin.',
    });
    form.reset();
    setAiGuidance(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Submit a Repair Request</CardTitle>
            <CardDescription>Fill out the form below to report a maintenance issue in your room.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="repairType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Repair Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Fan">Fan</SelectItem>
                          <SelectItem value="Light">Light</SelectItem>
                          <SelectItem value="Bathroom">Bathroom</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Describe the Issue</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., The ceiling fan is not working." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {(isAiLoading || aiGuidance) && (
                    <Alert variant={aiGuidance?.isImageHelpful ? "default" : "destructive"} className="bg-primary/10 border-primary/50">
                        <Lightbulb className="h-4 w-4 text-primary" />
                        <AlertTitle className="text-primary font-semibold flex items-center">
                            AI Assistant
                            {isAiLoading && <Loader2 className="h-4 w-4 ml-2 animate-spin" />}
                        </AlertTitle>
                        <AlertDescription>
                            {aiGuidance ? aiGuidance.reasoning : "Analyzing your description..."}
                        </AlertDescription>
                    </Alert>
                )}

                {aiGuidance?.isImageHelpful && (
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Image (Recommended)</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-2">
                             <Camera className="h-5 w-5 text-muted-foreground" />
                             <Input type="file" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
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
            <CardTitle>Request History</CardTitle>
            <CardDescription>Track the status of your past requests.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests.map(req => (
                  <TableRow key={req.id}>
                    <TableCell className="font-medium">{req.repairType}</TableCell>
                    <TableCell>
                      <Badge
                        variant={req.status === 'Completed' ? 'default' : req.status === 'In-Progress' ? 'secondary' : 'destructive'}
                        className={cn(
                            req.status === 'Completed' && 'bg-green-600',
                            req.status === 'In-Progress' && 'bg-blue-600 text-white',
                            req.status === 'Pending' && 'bg-yellow-500'
                        )}
                      >
                        {req.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
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
