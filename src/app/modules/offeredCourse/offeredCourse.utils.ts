import { TSchedule } from "./offeredCourse.interface";

export const hasTimeConflict = (
  assignedSchedules: TSchedule[],
  newSchedule: TSchedule
) => {
  for (let schedule of assignedSchedules) {
    const existingStartTime = new Date(`1970-01-01T${schedule.startTime}`);
    const existingEndTime = new Date(`1970-01-01T${schedule.endTime}`);
    const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}`);
    const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}`);
    //10:00 - 12:00
    //11:00 - 13:00
    if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
      return true;
    }
    return false;
  }
};
