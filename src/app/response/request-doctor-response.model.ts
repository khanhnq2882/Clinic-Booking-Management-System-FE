import { ExperienceDTO } from "../dto/experience-dto.model";

export class RequestDoctorResponse {
    userId !: number;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    roleNames: string[] = [];
    universityName !: string;
    status !: string;
    medicalDegreeType !: string;
    medicalDegreeName !: string;
    medicalDegreeUrl !: string;
    medicalLicenseType !: string;
    medicalLicenseName !: string;
    medicalLicenseUrl !: string;
    doctorExperiences : ExperienceDTO[] = [];
  }