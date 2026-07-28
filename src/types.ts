export interface EducationItem {
  id: string;
  degreeEn: string;
  degreeAr: string;
  institutionEn: string;
  institutionAr: string;
  period: string;
  locationEn: string;
  locationAr: string;
}

export interface ExperienceItem {
  id: string;
  titleEn: string;
  titleAr: string;
  companyEn: string;
  companyAr: string;
  period: string;
  responsibilitiesEn: string[];
  responsibilitiesAr: string[];
  isCurrent?: boolean;
}

export interface SkillCategory {
  id: string;
  titleEn: string;
  titleAr: string;
  iconName: string;
  skillsEn: string[];
  skillsAr: string[];
}

export interface PersonalInfo {
  nameEn: string;
  nameAr: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  phone: string;
  email: string;
  profileEn: string;
  profileAr: string;
  languagesEn: string[];
  languagesAr: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
}

export interface AddJobFormData {
  titleEn: string;
  titleAr: string;
  companyEn: string;
  companyAr: string;
  period: string;
  responsibilitiesAr: string;
  responsibilitiesEn: string;
  isCurrent: boolean;
}
