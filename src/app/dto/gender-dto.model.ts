export class GenderDTO {
    genderId !: number;
    genderName !: string;

    constructor(genderId: number, genderName: string) {
        this.genderId = genderId;
        this.genderName = genderName;
    }
  }