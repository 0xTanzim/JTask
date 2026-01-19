import React from 'react';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { AuthTabs } from '@/features/auth/components/AuthTabs';
import { SocialAuth } from '@/features/auth/components/SocialAuth';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
        <p className="text-muted-foreground">Please enter your details to access your dashboard.</p>
      </div>

      <AuthTabs />
      
      <LoginForm />

      <SocialAuth />

      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          By signing in, you agree to our{' '}
          <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </>
  );
}
