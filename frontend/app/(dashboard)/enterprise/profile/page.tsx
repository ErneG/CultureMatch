'use client';

import { useEffect, useState } from 'react';
import { Entity } from '@/types/entities';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Globe,
  Mail,
  Phone,
  MapPin,
  BadgeCheck,
  Activity,
  Building2,
  Users,
  Heart,
  Monitor,
  Brain,
  Stethoscope,
  PiggyBank,
  Flower2,
  Database,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Specialty {
  name: string;
  icon: string;
}

interface CompanyData {
  name: string;
  email?: string | null;
  phone?: string | null;
  country?: string | null;
  registrationNumber?: string | null;
  isActive?: boolean;
  tagline?: string | null;
  description?: string | null;
  website?: string | null;
  size?: string | null;
  foundingDate?: Date | null;
  location?: string | null;
  industry?: string | null;
  specialties?: Specialty[];
  logoUrl?: string | null;
}

const iconMap: { [key: string]: React.ReactNode } = {
  network: <Activity className="w-5 h-5 text-primary mt-1" />,
  corporate: <Building2 className="w-5 h-5 text-primary mt-1" />,
  family: <Users className="w-5 h-5 text-primary mt-1" />,
  // Add more mappings as needed
};

const ProfilePage = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('companyData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      // Parse the foundingDate back to a Date object
      if (parsedData.foundingDate) {
        parsedData.foundingDate = new Date(parsedData.foundingDate);
      }
      setCompanyData(parsedData);
    } else {
      // If no data is found, redirect to SetupCompanyPage
      router.push('/survey/company');
    }
  }, []);

  if (!companyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:px-8 lg:py-12 space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h2 className="text-2xl text-muted-foreground font-medium">Account</h2>
          <h1 className="text-4xl lg:text-5xl font-semibold">Company Profile</h1>
        </div>

        <div className="grid gap-6">
          {/* Profile Overview Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="w-32 h-32">
                  {companyData.logoUrl ? (
                    <AvatarImage src={companyData.logoUrl} alt="Company logo" />
                  ) : (
                    <AvatarFallback>{companyData.name?.[0] || 'C'}</AvatarFallback>
                  )}
                </Avatar>

                <div className="space-y-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{companyData.name}</h2>
                        {companyData.isActive && <Badge variant="secondary">Active</Badge>}
                      </div>
                      <p className="text-muted-foreground">{companyData.tagline}</p>
                    </div>
                    <Button
                      className="w-fit"
                      variant="outline"
                      onClick={() => router.push('/survey/company')}>
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {companyData.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span>{companyData.email}</span>
                      </div>
                    )}
                    {companyData.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{companyData.phone}</span>
                      </div>
                    )}
                    {companyData.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a href={companyData.website} className="text-primary hover:underline">
                          {companyData.website}
                        </a>
                      </div>
                    )}
                    {companyData.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{companyData.location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="details">Company Details</TabsTrigger>
              <TabsTrigger value="info">Additional Info</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Company Information</h3>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {companyData.size && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Company Size</p>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <span>{companyData.size}</span>
                      </div>
                    </div>
                  )}
                  {companyData.foundingDate && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-muted-foreground" />
                        <span>{companyData.foundingDate.getFullYear()}</span>
                      </div>
                    </div>
                  )}
                  {companyData.registrationNumber && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Registration Number</p>
                      <span>{companyData.registrationNumber}</span>
                    </div>
                  )}
                  {companyData.country && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Country</p>
                      <span>{companyData.country}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  {companyData.description && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">About Us</p>
                        <p className="leading-relaxed">{companyData.description}</p>
                      </div>
                    </div>
                  )}
                  {companyData.specialties && companyData.specialties.length > 0 && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Our Specialties</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {companyData.specialties.map((specialty, index) => (
                          <Card key={index} className="p-4 flex items-start space-x-4">
                            {iconMap[specialty.icon] || (
                              <BadgeCheck className="w-5 h-5 text-primary mt-1" />
                            )}
                            <div>
                              <h4 className="font-medium">{specialty.name}</h4>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
