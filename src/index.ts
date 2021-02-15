import dotenv from "dotenv";
import app from "./server";

// load .env file contents into process.env
dotenv.config();

// use either specified port number in .env or 4000
// using nullish coalescing:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
const PORT = process.env.PORT_NUMBER ?? 4000;

app.listen(PORT, () => {
  console.log(
    `If you can see this message in the console, this means that you successfully started the server! \n\nYou can see what comes back by visiting localhost:${PORT} in your browser. \n\nChanges will not be processed unless you restart your server (close and restart). \n\nThe server is currently listening for requests - press Ctrl + C to quit.`
  );
});
