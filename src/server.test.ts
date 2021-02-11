import supertest from "supertest";
import app from "./server";

test("GET / gives two options", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
    scenery: "Cave (exterior)",
    speech: {
      speaker: {
        description: "A robed figure holding a long, crooked staff",
        name: "???",
      },
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/adventure-start",
      no: "/adventure-end",
      help: "/help",
    },
  });
});
