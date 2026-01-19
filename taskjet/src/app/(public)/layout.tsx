import React from 'react';
import { ShieldCheck, Zap, Layers } from 'lucide-react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased overflow-hidden">
      {/* Visual Side (Left) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/10 items-center justify-center border-r border-border">
        {/* Abstract Pattern */}
        <div 
          className="absolute inset-0 opacity-50" 
          style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.2) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-background/80" />
        
        <div className="relative z-10 p-12 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <ShieldCheck className="text-primary-foreground size-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground">TaskMaster</span>
          </div>
          
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-6">
            Master your productivity with elegant simplicity.
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            Join thousands of professionals who organize their lives and boost their output with our intuitive task management suite.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-card/40 backdrop-blur-sm p-4 rounded-xl border border-border/50">
              <Layers className="text-primary mb-2 size-6" />
              <h3 className="font-semibold text-card-foreground">Smart Categorization</h3>
              <p className="text-sm text-muted-foreground">Organize tasks by projects, priorities, or tags.</p>
            </div>
            <div className="bg-card/40 backdrop-blur-sm p-4 rounded-xl border border-border/50">
              <Zap className="text-primary mb-2 size-6" />
              <h3 className="font-semibold text-card-foreground">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Quick actions and shortcuts for power users.</p>
            </div>
          </div>
        </div>

        {/* Abstract Graphic */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-20 -mb-20" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full -ml-10 -mt-10" />
      </div>

      {/* Auth Side (Right) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-12 bg-background relative">
        {/* Mobile Header */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="size-8 bg-primary rounded flex items-center justify-center">
            <ShieldCheck className="text-primary-foreground size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">TaskMaster</span>
        </div>
        
        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>
    </div>
  );
}
