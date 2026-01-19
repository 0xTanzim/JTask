import React from 'react';
import { Button } from '@/components/ui/button';

export function SocialAuth() {
  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground font-medium">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="w-full gap-2">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzYDJ24Ht8Sfc2gxINqjb2qA24PP8Z0dbEDPcVNd95NQa0x-CGwvUaVKic1K2xB8oDTEdyc3cosCWkoB5D_dIGu6eRER9EAodc7ITt5ZnsDdUzzSRum7s3N2-tFgF1q_r7yQ1IAa7x-JYr62AmS9yWMHCvKCP45Za6588sO_0itN2j-BEakbs9LSy3oviqDOlqdQaIi68wQRvJqJQ8NufQ_3oQPhlcYFtxSWZhRO3PB2dSRFH6bNWmUSm6H7QOpoDIyF5kqRqQLcs"
            alt="Google"
            className="size-5"
          />
          Google
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </Button>
      </div>
    </div>
  );
}
