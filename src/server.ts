import fastify from "fastify";
import { initializeDatabase } from "./models";
import { ShiftController } from "./controllers/shift.controller";

const server = fastify({ logger: true });
const shiftController = new ShiftController();

// Routes
server.get("/shifts", shiftController.getAllShifts.bind(shiftController));
server.post(
  "/shifts/compare",
  shiftController.compareShifts.bind(shiftController)
);

// Start Server
const startServer = async () => {
  await initializeDatabase();
  try {
    await server.listen({ port: 3000 });
    console.log("Server running at http://localhost:3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
startServer();
