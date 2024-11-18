import { Shift, Facility } from "../models";

export class ShiftService {
  async getAllShifts() {
    return await Shift.findAll({
      include: { model: Facility, attributes: ["facility_name"] },
    });
  }

  async compareShifts(shiftAId: number, shiftBId: number) {
    const shiftA = await Shift.findByPk(shiftAId);
    const shiftB = await Shift.findByPk(shiftBId);

    if (!shiftA || !shiftB) {
      throw new Error("One or both shifts not found");
    }

    const overlapMinutes = this.calculateOverlap(shiftA, shiftB);
    const maxOverlap = shiftA.facility_id === shiftB.facility_id ? 30 : 0;

    return {
      overlapMinutes,
      maxOverlap,
      exceedsOverlap: overlapMinutes > maxOverlap,
    };
  }

  private calculateOverlap(shiftA: Shift, shiftB: Shift): number {
    const startA = new Date(
      `${shiftA.shift_date}T${shiftA.start_time}`
    ).getTime();
    const endA = new Date(`${shiftA.shift_date}T${shiftA.end_time}`).getTime();
    const startB = new Date(
      `${shiftB.shift_date}T${shiftB.start_time}`
    ).getTime();
    const endB = new Date(`${shiftB.shift_date}T${shiftB.end_time}`).getTime();

    const overlapStart = Math.max(startA, startB);
    const overlapEnd = Math.min(endA, endB);

    return Math.max(0, (overlapEnd - overlapStart) / (1000 * 60));
  }
}
