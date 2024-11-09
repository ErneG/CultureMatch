'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { createJobListing } from '@/actions/jobActions';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { JobListing } from '@/types/entities';
import { Plus } from 'lucide-react';

const jobListingSchema = z.object({
  title: z.string().min(2, { message: 'Title must be at least 2 characters.' }),
  description: z.string().optional().nullable(),
  salaryMin: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().nonnegative().optional(),
  ),
  salaryMax: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number().nonnegative().optional(),
  ),
  location: z.string().optional().nullable(),
  hoursRequirement: z.string().optional().nullable(),
  contactInfo: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  closingDate: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
});

type JobListingFormValues = z.infer<typeof jobListingSchema>;

interface CreateJobListingDialogProps {
  companyId: number;
  onJobCreated: () => void;
}

export const CreateJobListingDialog: React.FC<CreateJobListingDialogProps> = ({
  companyId,
  onJobCreated,
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<JobListingFormValues>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      title: '',
      description: '',
      salaryMin: undefined,
      salaryMax: undefined,
      location: '',
      hoursRequirement: '',
      contactInfo: '',
      isActive: true,
      closingDate: '',
      skills: '',
      benefits: '',
    },
  });

  const onSubmit = async (data: JobListingFormValues) => {
    const jobData: JobListing = {
      ...data,
      entityId: companyId,
      skills: data.skills ? data.skills.split(',').map((s) => s.trim()) : [],
      benefits: data.benefits ? data.benefits.split(',').map((b) => b.trim()) : [],
    };
    await createJobListing(jobData);
    setOpen(false);
    onJobCreated();
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className=" h-4 w-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Job Listing</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Grid Container */}
            <div className="grid grid-cols-2 gap-4">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter job title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter job description"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary Min */}
              <FormField
                control={form.control}
                name="salaryMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter minimum salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Salary Max */}
              <FormField
                control={form.control}
                name="salaryMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Salary</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter maximum salary" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter location" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Hours Requirement */}
              <FormField
                control={form.control}
                name="hoursRequirement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Requirement</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter hours requirement"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Info */}
              <FormField
                control={form.control}
                name="contactInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Info</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter contact information"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Closing Date */}
              <FormField
                control={form.control}
                name="closingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Closing Date</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Enter closing date"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Skills */}
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Skills (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., JavaScript, React, Node.js"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Benefits */}
              <FormField
                control={form.control}
                name="benefits"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel>Benefits (comma-separated)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Health insurance, 401k"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button type="submit">Create Job Listing</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
