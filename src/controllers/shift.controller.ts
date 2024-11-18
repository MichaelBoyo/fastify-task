import { FastifyReply, FastifyRequest } from "fastify";
import { ShiftService } from "../services/shifts.service";

export class ShiftController {
  private shiftService = new ShiftService();

  async getAllShifts(req: FastifyRequest, reply: FastifyReply) {
    try {
      const shifts = await this.shiftService.getAllShifts();
      reply.send(shifts);
    } catch (err: any) {
      reply.status(500).send({ error: err.message });
    }
  }

  async compareShifts(
    req: FastifyRequest<{ Body: { shiftAId: number; shiftBId: number } }>,
    reply: FastifyReply
  ) {
    try {
      const { shiftAId, shiftBId } = req.body;
      const result = await this.shiftService.compareShifts(shiftAId, shiftBId);
      reply.send(result);
    } catch (err: any) {
      reply.status(400).send({ error: err.message });
    }
  }
}
