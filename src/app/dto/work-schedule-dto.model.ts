export class WorkScheduleDTO {
    workScheduleId !: number;
    startTime : string;
    endTime : string; 

    constructor(startTime : string, endTime: string) {
      this.startTime = startTime;
      this.endTime = endTime;
    }
  }