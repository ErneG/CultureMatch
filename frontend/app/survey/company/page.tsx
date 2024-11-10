'use client';

import { useEffect } from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Building2, Plus, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Icons } from '@/components/icons/Icons';
import { Calendar } from '@/components/ui/calendar';

// Define the list of available icons for specialties
const specialtyIcons = [
  { label: 'Network Management', value: 'network', icon: Icons.Network },
  { label: 'Corporate Solutions', value: 'corporate', icon: Icons.Corporate },
  { label: 'Family Coverage', value: 'family', icon: Icons.Family },
  { label: 'Healthcare', value: 'health', icon: Icons.Health },
  { label: 'Technology', value: 'tech', icon: Icons.Network },
  { label: 'Science', value: 'science', icon: Icons.Science },
  { label: 'Finance', value: 'finance', icon: Icons.Finance },
];

const companySchema = z.object({
  name: z.string().min(2, { message: 'Company name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }).optional().nullable(),
  phone: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  registrationNumber: z.string().optional().nullable(),
  isActive: z.boolean().optional().default(true),
  tagline: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  website: z.string().url({ message: 'Invalid URL.' }).optional().nullable(),
  size: z.string().optional().nullable(),
  foundingDate: z.date().optional().nullable(),
  location: z.string().optional().nullable(),
  industry: z.string().optional().nullable(),
  specialties: z
    .array(
      z.object({
        name: z.string(),
        icon: z.string(),
      }),
    )
    .optional(),
  logoUrl: z.string().url({ message: 'Invalid URL.' }).optional().nullable(),
});

type CompanyFormValues = z.infer<typeof companySchema>;

export default function SetupCompanyPage() {
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      country: '',
      registrationNumber: '',
      isActive: true,
      tagline: '',
      description: '',
      website: '',
      size: '',
      foundingDate: undefined,
      location: '',
      industry: 'Medicine',
      specialties: [],
      logoUrl: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'specialties',
  });

  useEffect(() => {
    const storedData = localStorage.getItem('companyData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);

      form.reset(parsedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: CompanyFormValues) => {
    localStorage.setItem('companyData', JSON.stringify(data));
    router.push('/enterprise/metrics'); // Redirect to the profile page after saving
  };

  return (
    <div className="container mx-auto py-6 md:py-8 px-2 md:px-4 max-w-4xl">
      <Card className="border-none shadow-none px-1! ">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Company Profile</CardTitle>
          <CardDescription>Tell us about your organization</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Preview Card */}
          <Card className="bg-muted/50 mb-8 px-1!">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                {form.watch('logoUrl') ? (
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={form.watch('logoUrl') ?? ''} alt="Company logo" />
                    <AvatarFallback>{form.watch('name')?.[0] || 'C'}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Building2 className="h-6 w-6 text-primary" />
                  </div>
                )}
                <div className="space-y-1">
                  <h3 className="font-semibold text-xl">
                    {form.watch('name') || 'Your Company Name'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {form.watch('tagline') || 'Your company tagline'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.watch('location') && `📍 ${form.watch('location')}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Company Logo URL</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter logo image URL"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tagline"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Tagline</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter company tagline"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="col-span-2">
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter company description"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Contact Information Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="https://yourcompany.com"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Location Information Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Location</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter country" {...field} value={field.value ?? ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City/Region</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter company location"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Company Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company Details</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Size</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., 100-500 employees"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="foundingDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Founding Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  'w-full pl-3 text-left font-normal',
                                  !field.value && 'text-muted-foreground',
                                )}>
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value ?? undefined}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter registration number"
                            {...field}
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter industry"
                            {...field}
                            value={field.value ?? ''}
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Specialties Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Specialties</CardTitle>
                  <CardDescription>Add your company&apos;s areas of expertise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <FormField
                        control={form.control}
                        name={`specialties.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Specialty Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`specialties.${index}.icon`}
                        render={({ field }) => (
                          <FormItem className="w-[200px]">
                            <FormControl>
                              <select
                                {...field}
                                className="w-full h-10 px-3 rounded-md border border-input bg-background">
                                <option value="">Select Icon</option>
                                {specialtyIcons.map((iconOption) => (
                                  <option key={iconOption.value} value={iconOption.value}>
                                    {iconOption.label}
                                  </option>
                                ))}
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => remove(index)}>
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => append({ name: '', icon: '' })}
                    className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Specialty
                  </Button>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
