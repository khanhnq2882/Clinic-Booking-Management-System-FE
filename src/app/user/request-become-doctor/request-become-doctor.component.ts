import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { UserService } from '../../service/user.service';
import { ExperienceRequest } from '../../request/experience-request.model';
import { SkillDTO } from 'src/app/dto/skill-dto.model';

@Component({
  selector: 'app-request-become-doctor',
  templateUrl: './request-become-doctor.component.html',
  styleUrls: ['./request-become-doctor.component.css']
})
export class RequestBecomeDoctorComponent implements OnInit{
  @ViewChild('requestBecomeDoctorForm', {static: false}) requestBecomeDoctorForm !: NgForm;

  skills : SkillDTO[] = [];
  skillIds : number[] = [];
  experiences : ExperienceRequest[] = [];
  isSuccessful = false;
  isFailed = false;
  successMessage = '';
  errorMessage = '';
  selectedFiles?: FileList;
  currentFile?: File;
  message = '';
  preview = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getSkills().subscribe((result: SkillDTO[]) => {
      this.skills = result;
    });
  }

  getSkills(): Observable<SkillDTO[]>  {
    return this.userService.getAllSkills()
    .pipe(
      map((response) => {
        if (response) {
          return Object.values(response);
        }
        return [];
      })
    );
  }

  onSubmit() {
    const addRoleDoctorRequest = {
      universityName : this.requestBecomeDoctorForm.value.universityName,
      experiences : this.addExperienceRequest({
        clinicName : this.requestBecomeDoctorForm.value.clinicName,
        position : this.requestBecomeDoctorForm.value.position,
        startWork : this.requestBecomeDoctorForm.value.startWork,
        endWork : this.requestBecomeDoctorForm.value.endWork,
        specialization : this.requestBecomeDoctorForm.value.specialization,
        skillIds : this.skillIds,
        jobDescription : this.requestBecomeDoctorForm.value.jobDescription
      })
    }
    this.userService.requestBecomeDoctor(addRoleDoctorRequest).subscribe({
      next: (data) => {
        this.isSuccessful = true;
        this.successMessage = data.message;
      },
      error: (err) => {
        this.isFailed = true;
        this.errorMessage = err.error.message;
      },
    })
  }

  addExperienceRequest(experienceRequest : ExperienceRequest) : ExperienceRequest[] {
    this.experiences.push(experienceRequest);
    return this.experiences;
  }

  addSkillId(skillId : number) : number[] {
    this.skillIds.push(skillId);
    return this.skillIds;
  }

  onChange(value : number) {
    if (this.skillIds.includes(value)) {
      this.skillIds = this.skillIds.filter((item) => item !== value);
    } else {
      this.skillIds.push(value);
    }
    console.log(this.skillIds);
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    this.selectedFiles = event.target.files;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  uploadMedicalLicense() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.userService.uploadMedicalLicense(this.currentFile).subscribe({
          next: (event: any) => {
            this.reloadPage();
          },
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Could not upload the image!';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  uploadMedicalDegree() {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.userService.uploadMedicalDegree(this.currentFile).subscribe({
          next: (event: any) => {
            this.reloadPage();
          },
          error: (err: any) => {
            console.log(err);
            if (err.error && err.error.message) {
              this.errorMessage = err.error.message;
            } else {
              this.errorMessage = 'Could not upload the image!';
            }
            this.currentFile = undefined;
          },
        });
      }
      this.selectedFiles = undefined;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

}
