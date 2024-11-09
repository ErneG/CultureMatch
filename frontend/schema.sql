-- public."Entity" definition

-- Drop table

-- DROP TABLE public."Entity";

CREATE TABLE public."Entity" (
	id serial4 NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" int2 NOT NULL,
	email varchar(255) NULL,
	phone varchar(50) NULL,
	country bpchar(3) NULL,
	"registrationNumber" varchar(255) NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	"isActive" bool DEFAULT true NULL,
	CONSTRAINT "Entity_pkey" PRIMARY KEY (id),
	CONSTRAINT "Entity_registrationNumber_key" UNIQUE ("registrationNumber")
);


-- public."User" definition

-- Drop table

-- DROP TABLE public."User";

CREATE TABLE public."User" (
	id serial4 NOT NULL,
	"otherFields" varchar(255) NULL,
	CONSTRAINT "User_pkey" PRIMARY KEY (id)
);


-- public."EntityTrait" definition

-- Drop table

-- DROP TABLE public."EntityTrait";

CREATE TABLE public."EntityTrait" (
	id int4 DEFAULT nextval('"EntityIndicator_id_seq"'::regclass) NOT NULL,
	"entityId" int4 NOT NULL,
	"indicator" int2 NOT NULL,
	value numeric(3, 2) NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "EntityIndicator_pkey" PRIMARY KEY (id),
	CONSTRAINT "EntityIndicator_value_check" CHECK (((value >= (0)::numeric) AND (value <= (1)::numeric))),
	CONSTRAINT "EntityIndicator_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."Entity"(id)
);


-- public."EntityProfile" definition

-- Drop table

-- DROP TABLE public."EntityProfile";

CREATE TABLE public."EntityProfile" (
	"entityId" serial4 NOT NULL,
	tagline varchar(255) NULL,
	description text NULL,
	website varchar(255) NULL,
	"size" varchar(50) NULL,
	"foundingDate" date NULL,
	"location" varchar(255) NULL,
	industry int2 NULL,
	specialties text NULL,
	"logoUrl" varchar(255) NULL,
	"socialMediaLinks" jsonb NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "EntityProfile_pkey" PRIMARY KEY ("entityId"),
	CONSTRAINT "EntityProfile_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."Entity"(id)
);


-- public."JobListing" definition

-- Drop table

-- DROP TABLE public."JobListing";

CREATE TABLE public."JobListing" (
	id serial4 NOT NULL,
	"entityId" int4 NOT NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	"salaryMin" numeric(10, 2) NULL,
	"salaryMax" numeric(10, 2) NULL,
	"salaryType" int2 NULL,
	"location" varchar(255) NULL,
	"hoursRequirement" varchar(50) NULL,
	"contactInfo" varchar(255) NULL,
	"jobForm" int2 NULL,
	"jobType" int2 DEFAULT 0 NULL,
	"isActive" bool DEFAULT true NULL,
	"postedAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	"closingDate" timestamptz NULL,
	skills text NULL,
	benefits text NULL,
	CONSTRAINT "JobListing_pkey" PRIMARY KEY (id),
	CONSTRAINT "JobListing_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."Entity"(id)
);


-- public."Survey" definition

-- Drop table

-- DROP TABLE public."Survey";

CREATE TABLE public."Survey" (
	id serial4 NOT NULL,
	"entityId" int4 NULL,
	title varchar(255) NOT NULL,
	description text NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	"isActive" bool DEFAULT true NULL,
	"userId" int4 NULL,
	"type" int2 NULL,
	CONSTRAINT "Survey_pkey" PRIMARY KEY (id),
	CONSTRAINT "Survey_entityId_fkey" FOREIGN KEY ("entityId") REFERENCES public."Entity"(id),
	CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id)
);


-- public."SurveyQuestion" definition

-- Drop table

-- DROP TABLE public."SurveyQuestion";

CREATE TABLE public."SurveyQuestion" (
	id serial4 NOT NULL,
	"surveyId" int4 NOT NULL,
	title varchar(255) NULL,
	description text NULL,
	"type" varchar(50) NOT NULL,
	"isRequired" bool DEFAULT false NULL,
	"position" int4 NOT NULL,
	settings jsonb NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "SurveyQuestion_pkey" PRIMARY KEY (id),
	CONSTRAINT "SurveyQuestion_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES public."Survey"(id) ON DELETE CASCADE
);


-- public."SurveyResponse" definition

-- Drop table

-- DROP TABLE public."SurveyResponse";

CREATE TABLE public."SurveyResponse" (
	id serial4 NOT NULL,
	"surveyId" int4 NOT NULL,
	"respondentId" uuid NOT NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "SurveyResponse_pkey" PRIMARY KEY (id),
	CONSTRAINT "SurveyResponse_surveyId_fkey" FOREIGN KEY ("surveyId") REFERENCES public."Survey"(id) ON DELETE CASCADE
);


-- public."SurveyResponseItem" definition

-- Drop table

-- DROP TABLE public."SurveyResponseItem";

CREATE TABLE public."SurveyResponseItem" (
	id serial4 NOT NULL,
	"surveyResponseId" int4 NOT NULL,
	"surveyQuestionId" int4 NOT NULL,
	"responseData" jsonb NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "SurveyResponseItem_pkey" PRIMARY KEY (id),
	CONSTRAINT "SurveyResponseItem_surveyQuestionId_fkey" FOREIGN KEY ("surveyQuestionId") REFERENCES public."SurveyQuestion"(id) ON DELETE CASCADE,
	CONSTRAINT "SurveyResponseItem_surveyResponseId_fkey" FOREIGN KEY ("surveyResponseId") REFERENCES public."SurveyResponse"(id) ON DELETE CASCADE
);


-- public."SurveyResponseItemReport" definition

-- Drop table

-- DROP TABLE public."SurveyResponseItemReport";

CREATE TABLE public."SurveyResponseItemReport" (
	id int4 DEFAULT nextval('"ResponseItemReport_id_seq"'::regclass) NOT NULL,
	"responseItemId" int4 NOT NULL,
	weight numeric(5, 2) NULL,
	keywords _text NULL,
	"isDeleted" bool DEFAULT false NULL,
	"createdAt" timestamptz DEFAULT now() NULL,
	"updatedAt" timestamptz DEFAULT now() NULL,
	CONSTRAINT "ResponseItemReport_pkey" PRIMARY KEY (id),
	CONSTRAINT "ResponseItemReport_responseItemId_fkey" FOREIGN KEY ("responseItemId") REFERENCES public."SurveyResponseItem"(id)
);
