import { PrismaClient, Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // Import the uuid library

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

  interface EmployeeSurveyQuestionInterface {
    title: string;
    position: number;
    type: string;
  }

  // Define survey questions using the interface
  const surveyQuestions: EmployeeSurveyQuestionInterface[] = [
    {
      title:
        'My current workspace setup (collaborative or private) supports my productivity and comfort.',
      position: 1,
      type: 'happiness',
    },
    {
      title: 'I feel a strong sense of connection with my team.',
      position: 2,
      type: 'belonging',
    },
    {
      title:
        'My company is genuinely committed to sustainability and social responsibility initiatives.',
      position: 3,
      type: 'purpose',
    },
    {
      title: 'There are opportunities in the company for community involvement and volunteering.',
      position: 4,
      type: 'purpose',
    },
    {
      title: 'The company has clear policies supporting diversity, equity, and inclusion.',
      position: 5,
      type: 'inclusion',
    },
    {
      title: 'There are regular opportunities for learning and development within the company.',
      position: 6,
      type: 'learning',
    },
    {
      title: 'I receive mentorship and guidance from managers that support my growth.',
      position: 7,
      type: 'support',
    },
    {
      title: 'My role includes regular opportunities for skills development and training.',
      position: 8,
      type: 'learning',
    },
    {
      title: 'I have flexibility in my work hours and/or remote work options.',
      position: 9,
      type: 'flexibility',
    },
    {
      title: 'I am able to maintain a healthy work-life balance at my current job.',
      position: 10,
      type: 'satisfaction',
    },
    {
      title: 'My work aligns with a sense of personal passion or purpose.',
      position: 11,
      type: 'purpose',
    },
    {
      title: 'I am encouraged to take on new challenges and experience a variety of tasks.',
      position: 12,
      type: 'achievement',
    },
    {
      title: 'I receive frequent feedback and recognition for my work.',
      position: 13,
      type: 'appreciation',
    },
    {
      title: 'I feel valued and acknowledged for my individual contributions.',
      position: 14,
      type: 'appreciation',
    },
    {
      title:
        'There are clear communication channels and regular check-ins with my team and manager.',
      position: 15,
      type: 'management',
    },
    {
      title: 'There is open and transparent communication from both team members and leadership.',
      position: 16,
      type: 'pressure',
    },
    {
      title:
        'The work environment encourages creativity and innovation through brainstorming sessions and collaborative spaces.',
      position: 17,
      type: 'energy',
    },
    {
      title: 'The dress code at my workplace allows me to feel comfortable and productive.',
      position: 18,
      type: 'happiness',
    },
    {
      title: 'I feel safe and respected by my coworkers.',
      position: 19,
      type: 'trust',
    },
    {
      title: 'I feel fairly compensated for the work I do.',
      position: 20,
      type: 'compensation',
    },
  ];

  // Create survey using typed survey questions
  const survey = await prisma.survey.create({
    data: {
      title: 'Employee Questionnaire',
      isActive: true,
      SurveyQuestions: {
        create: surveyQuestions.map((question) => ({
          title: question.title,
          position: question.position,
          type: question.type,
        })),
      },
    },
  });

  // Fetch the survey questions to use their IDs
  const questions = await prisma.surveyQuestion.findMany({
    where: { surveyId: survey.id },
    orderBy: { position: 'asc' },
  });

  // List of sample comments with alternatives
  const sampleCommentAlternatives = [
    [
      'The setup supports my productivity well.',
      'My workspace is optimal for getting work done.',
      'I feel at ease and productive in my current workspace.',
      'The current work setup enhances my comfort and productivity.',
      'I am very satisfied with the workspace environment.',
    ],
    [
      'I feel connected to my team.',
      'My team bonds are strong and supportive.',
      "There's a great sense of unity in my team.",
      'I am closely connected with my coworkers.',
      'The team dynamics here are excellent.',
    ],
    [
      'The company is committed to sustainability.',
      'Sustainability efforts by the company are commendable.',
      'The company prioritizes eco-friendly practices.',
      'There is a strong focus on sustainability here.',
      'Our company takes sustainability seriously.',
    ],
    [
      'There are volunteering opportunities available.',
      'The company encourages community involvement.',
      'Many chances for volunteering are present.',
      'Community service opportunities are plentiful.',
      'Engagement in volunteering activities is promoted.',
    ],
    [
      'Company policies support diversity.',
      'Diversity policies here are well-implemented.',
      'The company fosters a diverse work environment.',
      'Equity and inclusion are part of the culture.',
      'Diversity is a key focus at our workplace.',
    ],
    [
      'Learning resources are accessible.',
      'The company provides ample learning opportunities.',
      'I have access to great learning programs.',
      'Professional development is easily accessible.',
      'Learning and development resources are excellent.',
    ],
    [
      'Mentorship supports my growth.',
      'Guidance from mentors is invaluable.',
      'Mentorship is integral to my career growth.',
      'I receive great guidance from my managers.',
      'Mentorship here has greatly benefited me.',
    ],
    [
      'Training opportunities are relevant.',
      'I gain a lot from the training sessions.',
      'Training programs here are insightful.',
      'Training is specifically tailored to my needs.',
      'The training offered is comprehensive and useful.',
    ],
    [
      'I enjoy flexible work hours.',
      'The flexibility in hours is beneficial.',
      'Remote working is a convenient option.',
      'Work hour flexibility supports my lifestyle.',
      'My work hours here are very flexible.',
    ],
    [
      'I maintain a healthy work-life balance.',
      'Balancing work and life is easier here.',
      'The job allows for a great personal life balance.',
      'Work-life integration is possible in this role.',
      'The company culture supports my personal balance.',
    ],
    [
      'My work aligns with my passion.',
      "I'm happy in a role that matches my interests.",
      'This job fulfills a personal passion of mine.',
      'My role is strongly tied to what I enjoy.',
      "I find purpose in the work I'm doing.",
    ],
    [
      "I'm encouraged to take on new challenges.",
      "I'm given opportunities to explore new areas.",
      "There's frequent encouragement to tackle new tasks.",
      'Challenging tasks are part of my growth here.',
      'Opportunities to stretch my skills are abundant.',
    ],
    [
      'I receive feedback regularly.',
      "There's a consistent flow of feedback in my role.",
      'Feedback is a regular part of team communication.',
      'Constructive feedback is regularly provided.',
      'I am often acknowledged for my contributions.',
    ],
    [
      'I feel valued by my contributions.',
      'My work is appreciated and valued here.',
      "There's a culture of acknowledging individual efforts.",
      'I feel recognized for the work I do.',
      'Contributions from individuals are widely respected.',
    ],
    [
      'Communication is clear and regular.',
      "There's consistent, open communication in my team.",
      'Regular check-ins foster effective communication.',
      'Team communication is structured and effective.',
      'We engage in regular and thorough communication.',
    ],
    [
      'Communication is open and transparent.',
      "There's a lot of openness in communication here.",
      'Leadership is clear and transparent with the team.',
      'Transparency in communication is a norm here.',
      'Team and leadership communication is straightforward.',
    ],
    [
      'Creativity is encouraged.',
      'Innovation is highly valued in the workspace.',
      "There's a culture of creativity and new ideas.",
      'The company supports creative thinking.',
      'Brainstorming sessions boost innovative ideas.',
    ],
    [
      'The dress code is comfortable.',
      'I find the dress code very relaxed and flexible.',
      "There's no pressure regarding what to wear.",
      'The dress code allows for personal comfort.',
      'I feel free to dress comfortably every day.',
    ],
    [
      'I feel safe and respected by coworkers.',
      "There's a culture of safety and mutual respect.",
      'My teammates and I maintain trust and respect.',
      'Respect and security are core aspects of our culture.',
      'I trust my coworkers and feel at ease.',
    ],
    [
      'Compensation is fair.',
      'I feel fairly compensated for my work.',
      'The pay is commensurate with my efforts.',
      'My compensation reflects my job responsibilities.',
      'Benefits and salary are satisfactory here.',
    ],
  ];

  // Seed with 30 responses
  for (let i = 0; i < 30; i++) {
    await prisma.surveyResponse.create({
      data: {
        surveyId: survey.id,
        respondentId: uuidv4(),
        SurveyResponseItems: {
          create: questions.map((question, index) => ({
            responseData: {
              response: Math.floor(Math.random() * 6) + 1, // Random rating from 1 to 6
              comment: sampleCommentAlternatives[index][Math.floor(Math.random() * 5)], // Random comment from the list
            },
            surveyQuestionId: question.id, // Use the correct question ID
            // surveyResponseId: survey.id, // Use the correct survey ID
          })),
        },
      },
    });
  }

  console.log('Database seeded with 30 survey responses');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
