'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { SymptomLogger } from '@/components/symptom-logger';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useSymptoms } from '@/contexts/symptoms-context';

export default function SymptomsPage() {
  const nextStepVariant = (
    step: 'self-care' | 'consult nurse' | 'urgent care'
  ): 'secondary' | 'default' | 'destructive' => {
    switch (step) {
      case 'self-care':
        return 'secondary';
      case 'consult nurse':
        return 'default';
      case 'urgent care':
        return 'destructive';
    }
  };

  const { symptoms } = useSymptoms();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Symptom Log</h1>
      <Tabs defaultValue="log">
        <TabsList>
          <TabsTrigger value="log">Log Symptom</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="log" className="mt-4">
          <SymptomLogger />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Symptom History</CardTitle>
              <CardDescription>
                A record of your previously logged symptoms and triage results.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Symptoms</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>AI Suggestion</TableHead>
                    <TableHead className="text-right">Risk</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {symptoms.map((symptom) => (
                    <TableRow key={symptom.id}>
                      <TableCell>
                        {format(symptom.onset, 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {symptom.symptoms}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{symptom.severity}</Badge>
                      </TableCell>
                      <TableCell>
                        {symptom.triage && (
                          <Badge variant={nextStepVariant(symptom.triage.suggestedNextStep)}>
                            {symptom.triage.suggestedNextStep}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {symptom.triage
                          ? `${(symptom.triage.riskScore * 100).toFixed(0)}%`
                          : 'N/A'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
