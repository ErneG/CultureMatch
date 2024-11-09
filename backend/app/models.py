from app import db

# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(80), unique=True, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)

#     def to_dict(self):
#         return {
#             "id": self.id,
#             "username": self.username,
#             "email": self.email
#         }


class Entity(db.Model):
    __tablename__ = 'Entity'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    type = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(50), nullable=True)
    country = db.Column(db.String(3), nullable=True)
    registrationNumber = db.Column(db.String(255), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    isActive = db.Column(db.Boolean, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "type": self.type,
            "email": self.email,
            "phone": self.phone,
            "country": self.country,
            "registrationNumber": self.registrationNumber,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "isActive": self.isActive
        }


class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    otherFields = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "otherFields": self.otherFields
        }


class EntityTrait(db.Model):
    __tablename__ = 'EntityTrait'
    id = db.Column(db.Integer, primary_key=True)
    entityId = db.Column(db.Integer, nullable=False)
    indicator = db.Column(db.Integer, nullable=False)
    value = db.Column(db.Numeric(3, 2), nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "entityId": self.entityId,
            "indicator": self.indicator,
            "value": self.value,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }
    

class EntityProfile(db.Model):
    __tablename__ = 'EntityProfile'
    entityId = db.Column(db.Integer, primary_key=True)
    tagline = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    website = db.Column(db.String(255), nullable=True)
    size = db.Column(db.String(50), nullable=True)
    foundingDate = db.Column(db.Date, nullable=True)
    location = db.Column(db.String(255), nullable=True)
    industry = db.Column(db.Integer, nullable=True)
    specialties = db.Column(db.Text, nullable=True)
    logoUrl = db.Column(db.String(255), nullable=True)
    socialMediaLinks = db.Column(db.JSON, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "entityId": self.entityId,
            "tagline": self.tagline,
            "description": self.description,
            "website": self.website,
            "size": self.size,
            "foundingDate": self.foundingDate,
            "location": self.location,
            "industry": self.industry,
            "specialties": self.specialties,
            "logoUrl": self.logoUrl,
            "socialMediaLinks": self.socialMediaLinks,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }

class JobListing(db.Model):
    __tablename__ = 'JobListing'
    id = db.Column(db.Integer, primary_key=True)
    entityId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    salaryMin = db.Column(db.Numeric(10, 2), nullable=True)
    salaryMax = db.Column(db.Numeric(10, 2), nullable=True)
    salaryType = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(255), nullable=True)
    hoursRequirement = db.Column(db.String(50), nullable=True)
    contactInfo = db.Column(db.String(255), nullable=True)
    jobForm = db.Column(db.Integer, nullable=True)
    jobType = db.Column(db.Integer, nullable=True)
    isActive = db.Column(db.Boolean, nullable=True)
    postedAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    closingDate = db.Column(db.DateTime, nullable=True)
    skills = db.Column(db.Text, nullable=True)
    benefits = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "entityId": self.entityId,
            "title": self.title,
            "description": self.description,
            "salaryMin": self.salaryMin,
            "salaryMax": self.salaryMax,
            "salaryType": self.salaryType,
            "location": self.location,
            "hoursRequirement": self.hoursRequirement,
            "contactInfo": self.contactInfo,
            "jobForm": self.jobForm,
            "jobType": self.jobType,
            "isActive": self.isActive,
            "postedAt": self.postedAt,
            "updatedAt": self.updatedAt,
            "closingDate": self.closingDate,
            "skills": self.skills,
            "benefits": self.benefits
        }
    

class Survey(db.Model):
    __tablename__ = 'Survey'
    id = db.Column(db.Integer, primary_key=True)
    entityId = db.Column(db.Integer, nullable=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)
    isActive = db.Column(db.Boolean, nullable=True)
    userId = db.Column(db.Integer, nullable=True)
    type = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "entityId": self.entityId,
            "title": self.title,
            "description": self.description,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "isActive": self.isActive,
            "userId": self.userId,
            "type": self.type
        }
    

class SurveyQuestion(db.Model):
    __tablename__ = 'SurveyQuestion'
    id = db.Column(db.Integer, primary_key=True)
    surveyId = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(50), nullable=False)
    isRequired = db.Column(db.Boolean, nullable=True)
    position = db.Column(db.Integer, nullable=False)
    settings = db.Column(db.JSON, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "surveyId": self.surveyId,
            "title": self.title,
            "description": self.description,
            "type": self.type,
            "isRequired": self.isRequired,
            "position": self.position,
            "settings": self.settings,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }
        

class SurveyResponse(db.Model):
    __tablename__ = 'SurveyResponse'
    id = db.Column(db.Integer, primary_key=True)
    surveyId = db.Column(db.Integer, nullable=False)
    respondentId = db.Column(db.String(36), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "surveyId": self.surveyId,
            "respondentId": self.respondentId,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }


class SurveyResponseItem(db.Model):
    __tablename__ = 'SurveyResponseItem'
    id = db.Column(db.Integer, primary_key=True)
    surveyResponseId = db.Column(db.Integer, nullable=False)
    surveyQuestionId = db.Column(db.Integer, nullable=False)
    responseData = db.Column(db.JSON, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "surveyResponseId": self.surveyResponseId,
            "surveyQuestionId": self.surveyQuestionId,
            "responseData": self.responseData,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }
    

class SurveyResponseItemReport(db.Model):
    __tablename__ = 'SurveyResponseItemReport'
    id = db.Column(db.Integer, primary_key=True)
    responseItemId = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.Numeric(5, 2), nullable=True)
    keywords = db.Column(db.ARRAY(db.Text), nullable=True)
    isDeleted = db.Column(db.Boolean, nullable=True)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "responseItemId": self.responseItemId,
            "weight": self.weight,
            "keywords": self.keywords,
            "isDeleted": self.isDeleted,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt
        }