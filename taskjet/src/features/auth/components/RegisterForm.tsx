'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User as UserIcon, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { registerSchema, RegisterFormValues } from '../validators';
import { useAuthStore } from '../store/auth.store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from 'sonner';

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      // Simulate API call
      console.log('Register values:', values);
      
      // Simulate success
      const mockUser = { id: '1', email: values.email, name: values.name };
      const mockToken = 'mock-jwt-token';
      
      login(mockUser, mockToken);
      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                    <UserIcon className="size-5" />
                  </span>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    className="pl-11"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                    <Mail className="size-5" />
                  </span>
                  <Input
                    {...field}
                    type="email"
                    placeholder="name@company.com"
                    className="pl-11"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                    <Lock className="size-5" />
                  </span>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-11 pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-muted-foreground">
                    <Lock className="size-5" />
                  </span>
                  <Input
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-11"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full py-6 font-bold" size="lg">
          Create account
        </Button>
      </form>
    </Form>
  );
}
