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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';
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
      industry: '',
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
    router.push('/enterprise/profile'); // Redirect to the profile page after saving
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Setup Company</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Information Card */}
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">{form.watch('name') || 'Your Company Name'}</h3>
                  <p className="text-sm text-muted-foreground">
                    {form.watch('tagline') || 'Your company tagline'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Location: {form.watch('location') || 'Your company location'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Info Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Company Logo */}
              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Logo URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter logo image URL"
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                    {field.value && (
                      <Avatar className="mt-2">
                        <AvatarImage src={field.value} alt="Company logo" />
                        <AvatarFallback>{form.watch('name')?.[0] || 'C'}</AvatarFallback>
                      </Avatar>
                    )}
                  </FormItem>
                )}
              />

              {/* Company Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter company name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tagline */}
              <FormField
                control={form.control}
                name="tagline"
                render={({ field }) => (
                  <FormItem>
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

              {/* Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
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

              {/* Website */}
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

              {/* Email */}
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

              {/* Phone */}
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

              {/* Country */}
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

              {/* Location */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
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

              {/* Company Size */}
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

              {/* Founding Date */}
              <FormField
                control={form.control}
                name="foundingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Founding Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}>
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
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

              {/* Registration Number */}
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

              {/* Industry */}
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter industry" {...field} value={field.value ?? ''} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Specialties */}
              <div>
                <h3 className="text-lg font-semibold">Specialties</h3>
                {fields.map((item, index) => (
                  <div key={item.id} className="flex items-center space-x-2 mt-2">
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

                    {/* Icon Selection */}
                    <FormField
                      control={form.control}
                      name={`specialties.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <select {...field} className="p-2 border rounded">
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

                    <Button type="button" variant="destructive" onClick={() => remove(index)}>
                      Remove
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => append({ name: '', icon: '' })}
                  className="mt-2">
                  Add Specialty
                </Button>
              </div>

              {/* Is Active */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormLabel>Is Active</FormLabel>
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="cursor-pointer"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full mt-4 bg-blue-500 hover:bg-blue-600">
                Continue
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
