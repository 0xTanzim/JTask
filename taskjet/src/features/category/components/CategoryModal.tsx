'use client';

import {
  createCategory,
  updateCategory as updateCategoryAction,
} from '@/actions/category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Category } from '../types';
import { CategoryFormValues, categorySchema } from '../validators';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category?: Category;
}

const COLORS = [
  { text: 'text-blue-500', bg: 'bg-blue-500', bgLight: 'bg-blue-500/10' },
  { text: 'text-purple-500', bg: 'bg-purple-500', bgLight: 'bg-purple-500/10' },
  { text: 'text-green-500', bg: 'bg-green-500', bgLight: 'bg-green-500/10' },
  { text: 'text-orange-500', bg: 'bg-orange-500', bgLight: 'bg-orange-500/10' },
  { text: 'text-red-500', bg: 'bg-red-500', bgLight: 'bg-red-500/10' },
  { text: 'text-pink-500', bg: 'bg-pink-500', bgLight: 'bg-pink-500/10' },
  { text: 'text-cyan-500', bg: 'bg-cyan-500', bgLight: 'bg-cyan-500/10' },
  { text: 'text-yellow-500', bg: 'bg-yellow-500', bgLight: 'bg-yellow-500/10' },
];

export function CategoryModal({
  isOpen,
  onClose,
  category,
}: CategoryModalProps) {
  const router = useRouter();
  const [isPending, setIsPending] = React.useState(false);

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      color: 'text-blue-500',
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      if (category) {
        form.reset({
          name: category.name,
          color: category.color,
        });
      } else {
        form.reset({
          name: '',
          color: 'text-blue-500',
        });
      }
    }
  }, [isOpen, category, form]);

  const onSubmit = async (values: CategoryFormValues) => {
    setIsPending(true);
    try {
      const result = category
        ? await updateCategoryAction(category.id, values)
        : await createCategory(values);

      if (!result.success) {
        toast.error(result.error || 'Operation failed');
        return;
      }

      toast.success(category ? 'Category updated' : 'Category created');
      onClose();
      form.reset();
      // Force page reload to show new category in sidebar
      window.location.reload();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] bg-[#101822] border-[#223145] text-white p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-[#223145]">
          <DialogTitle className="text-xl font-bold">
            {category ? 'Edit Category' : 'Create New Category'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Work, Personal, etc."
                      className="bg-[#16212e] border-[#223145] text-white placeholder:text-slate-600 h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    Pick A Color
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-4 gap-3">
                      {COLORS.map((color) => (
                        <button
                          key={color.text}
                          type="button"
                          onClick={() => field.onChange(color.text)}
                          className={cn(
                            'group relative size-12 rounded-xl flex items-center justify-center transition-all',
                            color.bgLight,
                            field.value === color.text
                              ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#101822]'
                              : 'hover:scale-105'
                          )}
                        >
                          <div
                            className={cn('size-4 rounded-full', color.bg)}
                          />
                          {field.value === color.text && (
                            <Check className="absolute size-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-6 flex items-center justify-end gap-3 border-t border-[#223145] mt-6 -mx-6 px-6">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="text-slate-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button type="submit" className="font-bold px-6">
                {category ? 'Save Changes' : 'Create Category'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
