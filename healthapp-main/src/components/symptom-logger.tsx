'use client';

import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  AlertCircle,
  HeartPulse,
  Info,
  Lightbulb,
  Loader2,
  ShieldCheck,
  Stethoscope,
  LucideProps
} from 'lucide-react';

import { getAITriage } from '@/lib/actions';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';
import type { PersonalizedHealthTipsOutput } from '@/ai/flows/personalized-health-tips';

// ==========================================
// TYPES & INITIAL STATE
// ==========================================

type TriageFormState = {
  data?: any; 
  tips?: PersonalizedHealthTipsOutput | null;
  error?: string | { symptoms?: string[] } | null;
};

const initialState: TriageFormState = {
  data: undefined,
  tips: null,
  error: null,
};

type CareItem = {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  variant: 'default' | 'secondary' | 'destructive';
  label: string;
};

// Object containing our dynamic configuration mapped to categories
const careConfig: Record<string, CareItem> = {
  'self-care': { icon: ShieldCheck, variant: 'default', label: 'Self Care' },
  'consult nurse': { icon: Stethoscope, variant: 'secondary', label: 'Consult Nurse' },
  'urgent care': { icon: AlertCircle, variant: 'destructive', label: 'Urgent Care' }
};


// ==========================================
// COMPONENTS
// ==========================================

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Getting Triage...
        </>
      ) : (
        <>
          <Stethoscope className="mr-2 h-4 w-4" />
          Get AI Triage
        </>
      )}
    </Button>
  );
}

const TriageResult = ({
  data,
  tips,
}: {
  data: any;
  tips: PersonalizedHealthTipsOutput | null;
}) => {
  const riskScorePercentage = data.riskScore * 100;
  let riskColor = 'bg-green-500';
  
  if (riskScorePercentage > 33 && riskScorePercentage <= 66) {
    riskColor = 'bg-yellow-500';
  } else if (riskScorePercentage > 66) {
    riskColor = 'bg-red-500';
  }

  // Safely grab the category from data, falling back to 'self-care' if undefined
  const categoryKey = (data.category || 'self-care').toLowerCase();
  const currentConfig = careConfig[categoryKey] || careConfig['self-care'];
  const NextStepIcon = currentConfig.icon;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            AI Triage Results
          </CardTitle>
          <CardDescription>
            This is an AI-powered assessment and not a medical diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Risk Score</Label>
            <Progress value={riskScorePercentage} className={riskColor} />
            <p className="text-sm text-muted-foreground mt-1">
              Your risk score is {riskScorePercentage.toFixed(0)}/100.
            </p>
          </div>
          <div>
            <Label>Suggested Next Step</Label>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={currentConfig.variant}>
                <NextStepIcon className="h-4 w-4 mr-1" />
                {currentConfig.label}
              </Badge>
            </div>
          </div>
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Rationale</AlertTitle>
            <AlertDescription>{data.rationale}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tips ? (
            <p className="text-sm">{tips.tips}</p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Personalized tips are unavailable right now.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export function SymptomLogger() {
  const [state, formAction] = useFormState<TriageFormState, FormData>(getAITriage, initialState);

  // Type-safety helpers to cleanly handle string vs object errors
  const errorObj = typeof state?.error === 'object' && state?.error !== null ? state.error : null;
  const errorStr = typeof state?.error === 'string' ? state.error : null;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Log Your Symptoms</CardTitle>
            <CardDescription>
              Provide details about your symptoms to get an AI-powered triage.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="symptoms">Describe your symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., I have a sharp headache, slight fever, and a runny nose..."
                rows={5}
              />
              {errorObj?.symptoms && (
                <p className="text-sm text-destructive">
                  {errorObj.symptoms}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="severity">Severity</Label>
              <Select name="severity" defaultValue="Mild">
                <SelectTrigger id="severity">
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mild">Mild</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Severe">Severe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <div>
        {state?.data ? (
          <TriageResult data={state.data} tips={state.tips ?? null} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center rounded-lg border border-dashed text-center p-8">
            <HeartPulse className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold mt-4">
              Your AI triage results will appear here.
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              Fill out the form to get started.
            </p>
          </div>
        )}
        {errorStr && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorStr}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}