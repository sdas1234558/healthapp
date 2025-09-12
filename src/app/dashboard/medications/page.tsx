'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Medication } from '@/lib/types';
import { mockMedications } from '@/lib/data';

export default function MedicationsPage() {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);

  const addMedication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newMed: Medication = {
      id: `med${Date.now()}`,
      name: formData.get('name') as string,
      dosage: formData.get('dosage') as string,
      frequency: formData.get('frequency') as 'Daily' | 'Twice a day' | 'As needed',
      time: formData.get('time') as string,
    };
    setMedications([newMed, ...medications]);
    event.currentTarget.reset();
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };


  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <Card>
          <form onSubmit={addMedication}>
            <CardHeader>
              <CardTitle>Add Medication</CardTitle>
              <CardDescription>
                Create a new medication schedule and reminder.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Medication Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g., Ibuprofen"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  name="dosage"
                  placeholder="e.g., 200mg"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select name="frequency" required defaultValue="Daily">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Twice a day">Twice a day</SelectItem>
                      <SelectItem value="As needed">As needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Schedule
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold tracking-tight mb-4">Your Medications</h2>
        {medications.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {medications.map((med) => (
              <Card key={med.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{med.name}</CardTitle>
                  <CardDescription>{med.dosage}</CardDescription>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>
                    <strong>Frequency:</strong> {med.frequency}
                  </p>
                  <p>
                    <strong>Time:</strong> {med.time}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="w-full text-destructive hover:text-destructive" onClick={() => deleteMedication(med.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed text-center p-8 h-full">
            <Pill className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold mt-4">No medications added</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Use the form to add your medication schedules.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
