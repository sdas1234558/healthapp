import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';
import { cn } from '@/lib/utils';

export function DashboardHeader({ className, ...props }: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6',
        className
      )}
      {...props}
    >
      <SidebarTrigger className="sm:hidden" />
      <div className="flex-1" />
      <UserNav />
    </header>
  );
}
