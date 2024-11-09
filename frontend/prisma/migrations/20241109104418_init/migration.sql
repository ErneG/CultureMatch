-- CreateTable
CREATE TABLE "Entity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "email" VARCHAR(255),
    "phone" VARCHAR(50),
    "country" CHAR(3),
    "registrationNumber" VARCHAR(255),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "Entity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityTrait" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "indicator" INTEGER NOT NULL,
    "value" DECIMAL(3,2),
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityTrait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntityProfile" (
    "entityId" SERIAL NOT NULL,
    "tagline" VARCHAR(255),
    "description" TEXT,
    "website" VARCHAR(255),
    "size" VARCHAR(50),
    "foundingDate" TIMESTAMP(3),
    "location" VARCHAR(255),
    "industry" INTEGER,
    "specialties" TEXT,
    "logoUrl" VARCHAR(255),
    "socialMediaLinks" JSONB,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntityProfile_pkey" PRIMARY KEY ("entityId")
);

-- CreateTable
CREATE TABLE "JobListing" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "salaryMin" DECIMAL(10,2),
    "salaryMax" DECIMAL(10,2),
    "salaryType" INTEGER,
    "location" VARCHAR(255),
    "hoursRequirement" VARCHAR(50),
    "contactInfo" VARCHAR(255),
    "jobForm" INTEGER,
    "jobType" INTEGER DEFAULT 0,
    "isActive" BOOLEAN DEFAULT true,
    "postedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "closingDate" TIMESTAMP(3),
    "skills" TEXT[],
    "benefits" TEXT[],

    CONSTRAINT "JobListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Survey" (
    "id" SERIAL NOT NULL,
    "entityId" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isActive" BOOLEAN DEFAULT true,
    "userId" INTEGER,
    "type" INTEGER,

    CONSTRAINT "Survey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyQuestion" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "title" VARCHAR(255),
    "description" TEXT,
    "type" VARCHAR(50) NOT NULL,
    "isRequired" BOOLEAN DEFAULT false,
    "position" INTEGER NOT NULL,
    "settings" JSONB,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponse" (
    "id" SERIAL NOT NULL,
    "surveyId" INTEGER NOT NULL,
    "respondentId" UUID NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponseItem" (
    "id" SERIAL NOT NULL,
    "surveyResponseId" INTEGER NOT NULL,
    "surveyQuestionId" INTEGER NOT NULL,
    "responseData" JSONB,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyResponseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyResponseItemReport" (
    "id" SERIAL NOT NULL,
    "responseItemId" INTEGER NOT NULL,
    "weight" DECIMAL(5,2),
    "keywords" TEXT[],
    "isDeleted" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SurveyResponseItemReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "otherFields" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Entity_registrationNumber_key" ON "Entity"("registrationNumber");

-- AddForeignKey
ALTER TABLE "EntityTrait" ADD CONSTRAINT "EntityTrait_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntityProfile" ADD CONSTRAINT "EntityProfile_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobListing" ADD CONSTRAINT "JobListing_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES "Entity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponse" ADD CONSTRAINT "SurveyResponse_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES "Survey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponseItem" ADD CONSTRAINT "SurveyResponseItem_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES "SurveyResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponseItem" ADD CONSTRAINT "SurveyResponseItem_surveyQuestionId_fkey" FOREIGN KEY ("surveyQuestionId") REFERENCES "SurveyQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyResponseItemReport" ADD CONSTRAINT "SurveyResponseItemReport_responseItemId_fkey" FOREIGN KEY ("responseItemId") REFERENCES "SurveyResponseItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
