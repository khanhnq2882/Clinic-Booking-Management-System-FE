import { ExperienceRequest } from "./experience-request.model";

export class AddRoleDoctorRequest {
    universityName !: string;
    experiences : ExperienceRequest[] = [];
  }
  