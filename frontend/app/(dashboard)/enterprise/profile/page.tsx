'use client';
import { Entity } from '@/types/entities';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CalendarDays,
  Globe,
  Mail,
  Phone,
  Building2,
  MapPin,
  Database,
  Flower2,
  PiggyBank,
  Stethoscope,
  Brain,
  Monitor,
  Heart,
  Activity,
  Users,
} from 'lucide-react';
import { ENTERPRISE_COMPANY_NAME } from '@/config/constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

// Keep your existing data structures
const entity: Entity = {
  id: 1,
  name: ENTERPRISE_COMPANY_NAME,
  type: 0,
  email: 'contact@healthnet-solutions.com',
  phone: '+1 (888) 555-0123',
  country: 'USA',
  registrationNumber: 'HC789456123',
  isActive: true,
};
// TODO: transfer to entities
interface EntityProfile {
  entityId: number;
  tagline: string;
  description: string;
  website: string;
  size: string;
  foundingDate: Date;
  location: string;
  industry: number;
  specialties: string[];
  logoUrl: string;
  // socialMediaLinks: string;
}
const entityProfile: EntityProfile = {
  entityId: entity.id,
  tagline:
    'Transforming healthcare delivery through integrated care networks and innovative health plans.',
  description: `HealthNet Solutions is a leading integrated healthcare provider specializing in connecting patients with quality care through our extensive network of private practices. We combine traditional healthcare delivery with modern technology and innovative payment solutions to make healthcare more accessible and affordable.

Our network includes over 2,000 healthcare providers across multiple specialties, serving both individual patients and corporate clients. We pride ourselves on our ability to offer comprehensive healthcare solutions, from primary care to specialized treatments, while maintaining high standards of patient care and satisfaction.

Through our innovative health plans, we work directly with employers to create customized healthcare solutions that meet their employees' needs while managing costs effectively. Our individual plans provide flexible options for families and individuals seeking quality healthcare coverage.`,
  website: 'https://www.healthnet-solutions.com',
  size: '1000-5000 employees',
  foundingDate: new Date('2010-01-01'),
  location: 'Helsinki, Finland',
  industry: 1,
  specialties: [
    'Integrated Healthcare Network Management',
    'Corporate Health Plan Solutions',
    'Individual & Family Health Coverage',
    'Preventive Care Programs',
    'Telemedicine Services',
    'Mental Health Services',
    'Specialty Care Coordination',
    'Healthcare Cost Management',
    'Wellness Program Implementation',
    'Electronic Health Records Integration',
  ],
  logoUrl: 'https://picsum.photos/200/300',
};

const ProfilePage = () => {
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
                  <AvatarImage src={entityProfile.logoUrl} alt="Company logo" />
                  <AvatarFallback>{entity.name[0]}</AvatarFallback>
                </Avatar>

                <div className="space-y-4 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{entity.name}</h2>
                        <Badge variant="secondary">Active</Badge>
                      </div>
                      <p className="text-muted-foreground">{entityProfile.tagline}</p>
                    </div>
                    <Button className="w-fit" variant="outline" disabled>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{entity.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{entity.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <a href={entityProfile.website} className="text-primary hover:underline">
                        {entityProfile.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{entityProfile.location}</span>
                    </div>
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
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Company Size</p>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{entityProfile.size}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Founded</p>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-muted-foreground" />
                      <span>{entityProfile.foundingDate.getFullYear()}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Registration Number</p>
                    <span>{entity.registrationNumber}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Country</p>
                    <span>{entity.country}</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info">
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold">Additional Information</h3>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">About Us</p>
                      <p className="leading-relaxed">{entityProfile.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Our Specialties</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4 flex items-start space-x-4">
                        <Activity className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Network Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Integrated Healthcare Network Management
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Building2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Corporate Solutions</h4>
                          <p className="text-sm text-muted-foreground">
                            Corporate Health Plan Solutions
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Users className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Family Coverage</h4>
                          <p className="text-sm text-muted-foreground">
                            Individual & Family Health Coverage
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Heart className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Preventive Care</h4>
                          <p className="text-sm text-muted-foreground">Preventive Care Programs</p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Monitor className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Telemedicine</h4>
                          <p className="text-sm text-muted-foreground">Telemedicine Services</p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Brain className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Mental Health</h4>
                          <p className="text-sm text-muted-foreground">Mental Health Services</p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Stethoscope className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Specialty Care</h4>
                          <p className="text-sm text-muted-foreground">
                            Specialty Care Coordination
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <PiggyBank className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Cost Management</h4>
                          <p className="text-sm text-muted-foreground">
                            Healthcare Cost Management
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Flower2 className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">Wellness Programs</h4>
                          <p className="text-sm text-muted-foreground">
                            Wellness Program Implementation
                          </p>
                        </div>
                      </Card>
                      <Card className="p-4 flex items-start space-x-4">
                        <Database className="w-5 h-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">EHR Integration</h4>
                          <p className="text-sm text-muted-foreground">
                            Electronic Health Records Integration
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
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
