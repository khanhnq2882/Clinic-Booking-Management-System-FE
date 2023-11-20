import { FileResponse } from "./file-response.model";

export class RequestDoctorResponse {
    userId !: string;
    userCode !: string;
    email !: string;
    universityName !: string;
    clinicName !: string;
    position !: string;
    specialization !: string;
    startWork !: string;
    endWork !: string;
    jobDescription !: string;
    skillNames : string[] = [];
    fileResponses : FileResponse[] = [];
  }