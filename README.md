# fastify-task

# how to run

clone codebase

have postgres running. use .env.example to configure

run pnpm install && pnpm build && pnpm start

# To get shifts
GET http://localhost:3000/shifts

# To compare shifts
POST http://localhost:3000/shifts/compare
Content-Type: application/json
{
  "shiftAId": 1,
  "shiftBId": 2
}
