'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathology } from '@/contexts/pathology-context';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from '@/components/ui/calendar';
import type { LabTest, BookingDetails } from '@/lib/pathology-types';
const bookingFormSchema = z.object({
  patientName: z.string().min(2, 'Name must be at least 2 characters'),
  patientAge: z.number().min(0).max(150),
  patientGender: z.enum(['Male', 'Female', 'Other']),
  isHomeCollection: z.boolean(),
  purpose: z.string().min(1, 'Please provide the purpose of the test'),
  address: z.string().optional(),
  testId: z.string(),
  appointmentDate: z.date(),
  timeSlot: z.string(),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

export default function BookingPage() {
  const router = useRouter();
  const { selectedLab, addBooking } = usePathology();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const { toast } = useToast();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      isHomeCollection: false,
      patientName: '',
      patientAge: undefined,
      patientGender: undefined,
      purpose: '',
      address: '',
      testId: '',
      appointmentDate: undefined,
      timeSlot: '',
    },
  });

  // Use useEffect for redirection
  useEffect(() => {
    if (!selectedLab) {
      router.push('/dashboard/labs');
    }
  }, [selectedLab, router]);

  // Return early if no lab is selected
  if (!selectedLab) {
    return null;
  }

  const handleTestSelect = (testId: string) => {
    const test = selectedLab.availableTests.find(t => t.id === testId);
    setSelectedTest(test || null);
  };

  const handleSubmit = async (data: BookingFormData) => {
    if (!selectedLab) {
      toast({
        title: "Error",
        description: "Please select a lab first.",
        variant: "destructive",
      });
      return;
    }

    try {
      addBooking({
        ...data,
        labId: selectedLab.id,
      });
      toast({
        title: "Success",
        description: "Your appointment has been booked.",
      });
      router.push('/dashboard/labs');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Book Test Appointment</h1>

        <div className="bg-muted/50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">{selectedLab.name}</h2>
            <Badge variant="outline">{selectedLab.rating} ★</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{selectedLab.address}</p>
          <p className="text-sm text-muted-foreground">{selectedLab.openingHours}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="testId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Test</FormLabel>
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleTestSelect(value);
                    }} 
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a test" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedLab.availableTests.map((test) => (
                        <SelectItem key={test.id} value={test.id}>
                          {test.name} - ₹{test.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTest?.preparation && (
                    <FormDescription>{selectedTest.preparation}</FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter patient name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="patientAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="150"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="patientGender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {selectedLab.homeCollection && (
              <FormField
                control={form.control}
                name="isHomeCollection"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Collection Type</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === 'home')}
                      defaultValue={field.value ? 'home' : 'lab'}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select collection type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lab">Visit Lab</SelectItem>
                        <SelectItem value="home">Home Collection</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    className="rounded-md border"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeSlot"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Slot</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedTest?.collectionTime.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedTest && (
                    <FormDescription>
                      Report will be available in: {selectedTest.reportTime}
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purpose"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purpose of Test</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please provide any relevant details or reasons for the test"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Confirm Booking
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Important Instructions</DialogTitle>
            <DialogDescription>
              Please review the following instructions carefully:
            </DialogDescription>
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Please arrive 10 minutes before your appointment time</li>
              <li>Bring a valid ID proof</li>
              {selectedTest?.preparation && (
                <li className="text-destructive">{selectedTest.preparation}</li>
              )}
              <li>Wear a mask and follow Covid-19 safety protocols</li>
              <li>Payment can be made at the lab</li>
            </ul>
          </DialogHeader>
          <Button onClick={() => setIsDialogOpen(false)}>I Understand</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}