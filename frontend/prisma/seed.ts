import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Define industries
  const industries = [
    { type: 0, name: 'Technology' },
    { type: 1, name: 'Healthcare' },
    { type: 2, name: 'Education' },
    { type: 3, name: 'Finance' },
    { type: 4, name: 'Energy' },
    { type: 5, name: 'Retail' },
    { type: 6, name: 'Transportation' },
    { type: 7, name: 'Media' },
    { type: 8, name: 'Agriculture' },
    { type: 9, name: 'Hospitality' },
  ] as const;

  // Define CompanyType as a union of the industry types
  type CompanyType = (typeof industries)[number]['type'];

  // Map company types to specific job titles and descriptions
  const jobMap: Record<CompanyType, { titles: string[]; descriptions: string[] }> = {
    0: {
      // Technology
      titles: [
        'Software Engineer',
        'Data Scientist',
        'DevOps Engineer',
        'UI/UX Designer',
        'Product Manager',
        'Cybersecurity Analyst',
        'Systems Architect',
        'QA Engineer',
        'Mobile Developer',
        'AI Engineer',
        'Cloud Solutions Architect',
        'Backend Developer',
        'Frontend Developer',
        'Technical Writer',
        'Database Administrator',
        'Network Engineer',
        'Full Stack Developer',
        'IT Support Specialist',
        'Machine Learning Engineer',
        'IT Project Manager',
      ],
      descriptions: [
        'Develop and maintain software solutions.',
        'Analyze data for insights and decision-making.',
        'Manage cloud infrastructure and deployment.',
        'Design user interfaces and experiences.',
        'Oversee product development lifecycle.',
        'Protect systems against cyber threats.',
        'Design system architectures for scalability.',
        'Ensure software quality through testing.',
        'Develop applications for mobile devices.',
        'Work on artificial intelligence projects.',
        'Architect cloud-based solutions.',
        'Develop server-side applications.',
        'Develop client-side applications.',
        'Create technical documentation.',
        'Manage databases and optimize queries.',
        'Maintain network systems and security.',
        'Work across the full tech stack.',
        'Provide IT support and troubleshooting.',
        'Develop machine learning models.',
        'Lead IT projects and teams.',
      ],
    },
    1: {
      // Healthcare
      titles: [
        'Registered Nurse',
        'Medical Assistant',
        'Physician',
        'Pharmacist',
        'Physical Therapist',
        'Medical Technologist',
        'Occupational Therapist',
        'Radiologic Technologist',
        'Clinical Laboratory Scientist',
        'Healthcare Administrator',
        'Dietitian',
        'Mental Health Counselor',
        'Dental Hygienist',
        'Health Information Technician',
        'Paramedic',
        'Respiratory Therapist',
        'Anesthesiologist',
        'Surgeon',
        'Pediatrician',
        'Dermatologist',
      ],
      descriptions: [
        'Provide nursing care to patients.',
        'Assist physicians with patient care.',
        'Diagnose and treat illnesses.',
        'Dispense medications and advise patients.',
        'Help patients recover mobility.',
        'Perform lab tests and procedures.',
        'Assist patients with daily activities.',
        'Perform diagnostic imaging examinations.',
        'Conduct complex lab analyses.',
        'Manage healthcare facilities operations.',
        'Provide nutritional guidance.',
        'Offer mental health support.',
        'Clean teeth and examine oral areas.',
        'Manage health data and records.',
        'Provide emergency medical care.',
        'Treat patients with breathing issues.',
        'Administer anesthesia during surgeries.',
        'Perform surgical procedures.',
        'Provide medical care for children.',
        'Treat skin conditions and diseases.',
      ],
    },
    2: {
      // Education
      titles: [
        'Elementary Teacher',
        'High School Teacher',
        'School Counselor',
        'Librarian',
        'Instructional Coordinator',
        'Special Education Teacher',
        'Education Administrator',
        'ESL Teacher',
        'Educational Technologist',
        'Curriculum Developer',
        'Academic Advisor',
        'College Professor',
        'Teacher Assistant',
        'Substitute Teacher',
        'Tutor',
        'Admissions Counselor',
        'Financial Aid Officer',
        'Athletic Coach',
        'School Psychologist',
        'Career Counselor',
      ],
      descriptions: [
        'Teach students at elementary level.',
        'Instruct students in high school subjects.',
        'Provide guidance to students.',
        'Manage library resources and services.',
        'Develop instructional material.',
        'Teach students with special needs.',
        'Oversee school operations.',
        'Teach English as a second language.',
        'Implement educational technology.',
        'Develop educational curricula.',
        'Advise students academically.',
        'Teach at the college level.',
        'Assist teachers in classrooms.',
        'Fill in for absent teachers.',
        'Provide one-on-one instruction.',
        'Assist in student admissions.',
        'Manage financial aid processes.',
        'Coach student athletes.',
        'Assess student psychological needs.',
        'Guide students in career choices.',
      ],
    },
    // Add similar mappings for other company types (3 to 9)
    3: {
      // Finance
      titles: [
        'Financial Analyst',
        'Accountant',
        'Investment Banker',
        'Auditor',
        'Financial Planner',
        'Loan Officer',
        'Compliance Analyst',
        'Risk Manager',
        'Tax Specialist',
        'Credit Analyst',
        'Actuary',
        'Treasury Analyst',
        'Portfolio Manager',
        'Budget Analyst',
        'Finance Manager',
        'Accounts Payable Clerk',
        'Accounts Receivable Clerk',
        'Chief Financial Officer',
        'Billing Specialist',
        'Underwriter',
      ],
      descriptions: [
        'Analyze financial data and trends.',
        'Manage financial records and statements.',
        'Advise on financial investments.',
        'Conduct financial audits.',
        'Plan clients’ financial futures.',
        'Evaluate and approve loan applications.',
        'Ensure compliance with financial regulations.',
        'Assess and manage financial risks.',
        'Prepare and file tax documents.',
        'Evaluate creditworthiness of clients.',
        'Analyze financial risks for insurance.',
        'Manage cash and liquidity.',
        'Manage investment portfolios.',
        'Analyze budget proposals.',
        'Oversee financial operations.',
        'Process accounts payable transactions.',
        'Process accounts receivable transactions.',
        'Lead financial strategy.',
        'Manage billing processes.',
        'Assess risks for insurance policies.',
      ],
    },
    4: {
      // Energy
      titles: [
        'Energy Analyst',
        'Environmental Engineer',
        'Solar Installer',
        'Wind Turbine Technician',
        'Energy Auditor',
        'Geologist',
        'Petroleum Engineer',
        'Chemical Engineer',
        'Electrical Engineer',
        'Project Manager',
        'Power Plant Operator',
        'Environmental Scientist',
        'Hydrologist',
        'Pipeline Engineer',
        'Safety Coordinator',
        'Nuclear Engineer',
        'Drilling Engineer',
        'Renewable Energy Consultant',
        'Quality Control Engineer',
        'Site Supervisor',
      ],
      descriptions: [
        'Analyze energy consumption and costs.',
        'Design eco-friendly engineering solutions.',
        'Install solar panel systems.',
        'Maintain wind turbines.',
        'Conduct energy efficiency audits.',
        'Study earth processes and materials.',
        'Design methods for extracting oil and gas.',
        'Develop chemical manufacturing processes.',
        'Design electrical systems.',
        'Manage energy projects.',
        'Control power-generating equipment.',
        'Research environmental impacts.',
        'Study water cycle and distribution.',
        'Design and maintain pipelines.',
        'Coordinate safety protocols.',
        'Work on nuclear energy projects.',
        'Plan drilling operations.',
        'Advise on renewable energy solutions.',
        'Ensure product quality standards.',
        'Oversee on-site operations.',
      ],
    },
    5: {
      // Retail
      titles: [
        'Store Manager',
        'Sales Associate',
        'Cashier',
        'Inventory Specialist',
        'Customer Service Representative',
        'Visual Merchandiser',
        'Loss Prevention Officer',
        'Retail Buyer',
        'E-commerce Manager',
        'Marketing Coordinator',
        'Supply Chain Analyst',
        'Retail Analyst',
        'Warehouse Manager',
        'Assistant Store Manager',
        'Logistics Coordinator',
        'Product Demonstrator',
        'Department Manager',
        'Pricing Analyst',
        'Stock Clerk',
        'Operations Manager',
      ],
      descriptions: [
        'Manage store operations and staff.',
        'Assist customers with purchases.',
        'Handle cash transactions.',
        'Manage stock levels and inventory.',
        'Provide customer support.',
        'Design store layouts and displays.',
        'Prevent theft and fraud.',
        'Select products for retail sale.',
        'Manage online retail platforms.',
        'Coordinate marketing efforts.',
        'Analyze supply chain processes.',
        'Analyze retail sales data.',
        'Oversee warehouse operations.',
        'Support store manager duties.',
        'Coordinate logistics and shipments.',
        'Demonstrate products to customers.',
        'Manage specific store departments.',
        'Analyze pricing strategies.',
        'Stock shelves and displays.',
        'Oversee daily operations.',
      ],
    },
    6: {
      // Transportation
      titles: [
        'Logistics Manager',
        'Truck Driver',
        'Dispatcher',
        'Supply Chain Manager',
        'Fleet Manager',
        'Transportation Planner',
        'Mechanic',
        'Warehouse Worker',
        'Freight Agent',
        'Customs Broker',
        'Air Traffic Controller',
        'Pilot',
        'Train Operator',
        'Shipping Coordinator',
        'Delivery Driver',
        'Transportation Analyst',
        'Operations Manager',
        'Import/Export Specialist',
        'Maintenance Supervisor',
        'Safety Inspector',
      ],
      descriptions: [
        'Coordinate transportation activities.',
        'Transport goods over land.',
        'Schedule and dispatch drivers.',
        'Manage supply chain operations.',
        'Oversee vehicle fleets.',
        'Plan transportation systems.',
        'Repair and maintain vehicles.',
        'Handle warehouse tasks.',
        'Arrange cargo shipments.',
        'Facilitate customs clearance.',
        'Control air traffic flow.',
        'Operate aircraft.',
        'Operate trains.',
        'Coordinate shipping schedules.',
        'Deliver goods to customers.',
        'Analyze transportation data.',
        'Manage operations teams.',
        'Handle import/export processes.',
        'Supervise maintenance staff.',
        'Inspect transportation safety.',
      ],
    },
    7: {
      // Media
      titles: [
        'Journalist',
        'Editor',
        'Content Writer',
        'Graphic Designer',
        'Videographer',
        'Social Media Manager',
        'Photographer',
        'Broadcast Technician',
        'Producer',
        'Animator',
        'Public Relations Specialist',
        'Copywriter',
        'Media Planner',
        'SEO Specialist',
        'Art Director',
        'Sound Engineer',
        'Web Content Manager',
        'Advertising Manager',
        'Scriptwriter',
        'Creative Director',
      ],
      descriptions: [
        'Report news and stories.',
        'Edit written content.',
        'Write articles and blogs.',
        'Create visual designs.',
        'Produce video content.',
        'Manage social media presence.',
        'Capture photographs.',
        'Operate broadcasting equipment.',
        'Produce media content.',
        'Create animations.',
        'Manage public relations.',
        'Write advertising copy.',
        'Plan media advertising campaigns.',
        'Optimize content for search engines.',
        'Lead artistic projects.',
        'Manage audio recordings.',
        'Oversee website content.',
        'Manage advertising strategies.',
        'Write scripts for media.',
        'Lead creative teams.',
      ],
    },
    8: {
      // Agriculture
      titles: [
        'Farm Manager',
        'Agricultural Engineer',
        'Agronomist',
        'Animal Scientist',
        'Soil Scientist',
        'Farm Worker',
        'Agricultural Technician',
        'Irrigation Specialist',
        'Pest Control Advisor',
        'Food Scientist',
        'Crop Consultant',
        'Veterinarian',
        'Greenhouse Manager',
        'Equipment Operator',
        'Horticulturist',
        'Quality Assurance Manager',
        'Plant Breeder',
        'Agricultural Economist',
        'Supply Chain Manager',
        'Biotechnologist',
      ],
      descriptions: [
        'Manage farm operations.',
        'Design agricultural equipment.',
        'Improve crop production.',
        'Study animal genetics and nutrition.',
        'Analyze soil composition.',
        'Perform farm labor tasks.',
        'Assist in agricultural research.',
        'Design irrigation systems.',
        'Advise on pest management.',
        'Study food processing.',
        'Consult on crop management.',
        'Provide animal medical care.',
        'Manage greenhouse operations.',
        'Operate farming equipment.',
        'Cultivate plants and flowers.',
        'Ensure product quality.',
        'Develop new plant varieties.',
        'Analyze agricultural markets.',
        'Manage supply chains.',
        'Research biological processes.',
      ],
    },
    9: {
      // Hospitality
      titles: [
        'Hotel Manager',
        'Front Desk Agent',
        'Housekeeper',
        'Event Coordinator',
        'Chef',
        'Waiter/Waitress',
        'Bartender',
        'Concierge',
        'Restaurant Manager',
        'Guest Service Representative',
        'Reservation Agent',
        'Spa Therapist',
        'Catering Manager',
        'Banquet Server',
        'Sous Chef',
        'Maintenance Technician',
        'Sales Manager',
        'Sommelier',
        'Kitchen Assistant',
        'Hospitality Trainer',
      ],
      descriptions: [
        'Oversee hotel operations.',
        'Assist guests at the front desk.',
        'Maintain cleanliness of facilities.',
        'Coordinate events and functions.',
        'Prepare meals and menus.',
        'Serve food to customers.',
        'Prepare and serve drinks.',
        'Assist guests with special requests.',
        'Manage restaurant operations.',
        'Provide guest services.',
        'Handle reservations.',
        'Provide spa treatments.',
        'Manage catering services.',
        'Serve at banquets.',
        'Assist head chef.',
        'Perform maintenance tasks.',
        'Promote sales for the hotel.',
        'Recommend wines.',
        'Assist in the kitchen.',
        'Train hospitality staff.',
      ],
    },
  };

  // 1. Seed 10 companies with specific types
  const companiesData: Prisma.EntityCreateInput[] = industries.map((industry, index) => ({
    name: `${industry.name}Corp`,
    type: industry.type,
    email: `contact@${industry.name.toLowerCase()}corp.com`,
    phone: `12345678${index}`,
    country: 'USA',
    registrationNumber: `${industry.name.substring(0, 2).toUpperCase()}${index + 1}00`,
    isActive: true,
  }));

  // Create companies in the database
  const companies = [];
  for (const companyData of companiesData) {
    const company = await prisma.entity.create({ data: companyData });
    companies.push(company);
  }

  // Seed 20 unique job listings per company based on company type
  for (const company of companies) {
    const companyType = company.type as CompanyType;
    const { titles, descriptions } = jobMap[companyType];
    const jobListingsData: Prisma.JobListingCreateInput[] = [];

    for (let i = 0; i < 20; i++) {
      const jobTitleIndex = i % titles.length;
      const jobDescriptionIndex = i % descriptions.length;

      const jobData: Prisma.JobListingCreateInput = {
        title: titles[jobTitleIndex],
        description: descriptions[jobDescriptionIndex],
        salaryMin: new Prisma.Decimal(30000 + i * 1000),
        salaryMax: new Prisma.Decimal(50000 + i * 1500),
        salaryType: 1,
        location: 'Various Locations',
        hoursRequirement: 'Full-time',
        contactInfo: company.email,
        jobForm: 1,
        jobType: 1,
        isActive: true,
        closingDate: new Date(`2024-${((i % 12) + 1).toString().padStart(2, '0')}-28`),
        skills: [`Skill ${i + 1}A`, `Skill ${i + 1}B`, `Skill ${i + 1}C`],
        benefits: ['Health Insurance', 'Retirement Plan', 'Paid Time Off'],
        Entity: {
          connect: { id: company.id },
        },
      };
      jobListingsData.push(jobData);
    }

    // Insert all job listings for the company
    for (const jobData of jobListingsData) {
      await prisma.jobListing.create({ data: jobData });
    }
  }

  console.log('Database has been seeded with 10 companies and 20 unique positions per company.');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
