import { TAcademicSemesterCode, TAcademicSemesterName, TAcademicSemesterNameCodeMapper, TMonth } from "./accademicSemester.interface";

export const months: TMonth[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  export const AcademicSemesterName: TAcademicSemesterName[] = [
    "Automn",
    "Summar",
    "Fail",
  ];
  export const AcademicSemesterCode: TAcademicSemesterCode[] = ["01", "02", "03"];
  
  export    const academicSemesterNameCodeMapper :TAcademicSemesterNameCodeMapper = {
    Automn: '01',
    Summar: '02',
    Fail : '03',
   }
   