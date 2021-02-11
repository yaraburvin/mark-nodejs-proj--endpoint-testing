import supertest from "supertest";
import app from "./server";

test("GET / responds with a welcome message", async () => {
  const response = await supertest(app).get("/");

  expect(response.body).toStrictEqual({
    location: "Cave (exterior)",
    speech: {
      speaker: {
        description: "A robed figure holding a long, crooked staff",
        name: "???",
      },
      text:
        "Welcome, young adventurer, to the ENDPOINT ADVENTURE. Are you ready for this quest?",
    },
    options: {
      yes: "/quest/accept",
      no: "/quest/decline",
      help: "/help",
    },
  });
});

test("GET /quest/decline responds with an apocalyptic message", async () => {
  const response = await supertest(app).get("/quest/decline");

  // located in the apocalypse
  expect(response.body.location).toBe("Apocalypse");

  // aggro speaker
  expect(response.body.speech.speaker.name).toBe("Titan, Destroyer of Worlds");

  // some aggro message
  expect(response.body.speech.text).toMatch("FOOL");
  expect(response.body.speech.text).toMatch(/mistake/i);

  // includes the option to restart
  expect(response.body.options).toMatchObject({ restart: "/" });
});
