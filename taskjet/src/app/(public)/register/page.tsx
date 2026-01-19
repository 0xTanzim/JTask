import React from 'react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import { AuthTabs } from '@/features/auth/components/AuthTabs';
import { SocialAuth } from '@/features/auth/components/SocialAuth';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold mb-2">Create an account</h2>
        <p className="text-muted-foreground">Join TaskMaster and start organizing your tasks today.</p>
      </div>

      <AuthTabs />
      
      <RegisterForm />

      <SocialAuth />

      <div className="mt-12 text-center">
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
          <Link href="#" className="underline hover:text-foreground">Terms of Service</Link>{' '}
          and{' '}
          <Link href="#" className="underline hover:text-foreground">Privacy Policy</Link>.
        </p>
      </div>
    </>
  );
}
