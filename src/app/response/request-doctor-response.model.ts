import { ExperienceResponse } from "./experience-response.model";
import { FileResponse } from "./file-response.model";

export class RequestDoctorResponse {
    userId !: string;
    userCode !: string;
    email !: string;
    firstName !: string;
    lastName !: string;
    dateOfBirth !: string;
    gender !: number;
    phoneNumber !: string;
    universityName !: string;
    status !: string;
    medicalDegreeType !: string;
    medicalDegreeName !: string;
    medicalDegreeUrl !: string;
    medicalLicenseType !: string;
    medicalLicenseName !: string;
    medicalLicenseUrl !: string;
    experiences : ExperienceResponse[] = [];
  }