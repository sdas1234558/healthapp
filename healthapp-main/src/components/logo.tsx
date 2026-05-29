import { Stethoscope } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-lg font-bold tracking-tighter text-primary-foreground',
        className
      )}
      {...props}
    >
      <div className="bg-primary/80 text-primary-foreground p-2 rounded-lg">
        <Stethoscope className="h-5 w-5" />
      </div>
      <span className="text-foreground font-headline">HealthCheck</span>
    </div>
  );
}
