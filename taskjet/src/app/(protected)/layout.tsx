import { getAuthUser } from '@/actions/auth';
import { ProtectedClientLayout } from '@/components/ProtectedClientLayout';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) {
    redirect('/login');
  }

  return (
    <ProtectedClientLayout userEmail={user.email}>
      {children}
    </ProtectedClientLayout>
  );
}
