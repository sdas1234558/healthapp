
'use client';

import Link from 'next/link';
import {
  ArrowUpRight,
  Bell,
  HeartPulse,
  Lightbulb,
  Pill,
} from 'lucide-react';
import { useUser } from '@/contexts/user-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockMedications } from '@/lib/data';
import { Badge } from '@/components/ui/badge';

export default function DashboardPage() {
  const { firstName } = useUser();
  const nextMedication = mockMedications[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Good morning, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s your health summary for today.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Upcoming Reminder
            </CardTitle>
            <Pill className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {nextMedication.name} ({nextMedication.dosage})
            </div>
            <p className="text-xs text-muted-foreground">
              at {nextMedication.time}
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Log New Symptoms
            </CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Feeling unwell? Get an AI-powered triage.
            </p>
            <Button asChild size="sm">
              <Link href="/dashboard/symptoms">
                Log Symptoms
                <ArrowUpRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reminders</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMedications.length} Active
            </div>
            <p className="text-xs text-muted-foreground">medication schedules</p>
          </CardContent>
        </Card>
      </div>

      <Card className="lg:col-span-3 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-yellow-400" />
            Personalized Health Tip
          </CardTitle>
          <CardDescription>
            Based on your recent activity and symptoms.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Staying hydrated is key to managing headaches. Try to drink at least
            8 glasses of water today. Gentle neck stretches can also help
            alleviate tension.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
