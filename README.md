---
module: mark-nodejs

level: 1

methods:
  - team
  - pair
  - solo

tags:
  - wip
---

# My Little Server

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

We're now going to run your first server and play around with a few existing **endpoints** that it has.

## Learning Outcomes

- Run an Express server locally
- Send back a JSON response in an Express route handler
- Identify when a route handler function is executed
- Test HTTP GET requests in the browser
- Test HTTP GET requests in Postman

## Exercise 1: Installing and running

**Success criterion:** you can view evidence your server is running at `localhost:4000`

Firstly, clone this repository to your local machine in some sensible place, for example:

```bash
cd ~/Development/Academy # or wherever you're organising everything
git clone https://github.com/WeAreAcademy/my-little-server.git my-little-server
```

Then, change into the new directory and install the files:

```bash
cd my-little-server
yarn
```

Finally, run your first Express server!

```bash
yarn start
```

The `start` script is configured such that the Express server will run by default on your local machine at `localhost:4000`.

You will need to manually confirm this through visiting `localhost:4000` in your browser. You can also visit some different endpoints which are defined, e.g. `localhost:4000/current-time`.

(If the server is not running - either because you have not yet started it or you have closed it - then trying to access `localhost:4000` will give you a connection failure.)

## Exercise 1b: Stopping and restarting the server

Close the server with `Ctrl + C` in the terminal where it is running.

Restart it using the same command as before:

```bash
yarn start
```

## Exercise 2: Reading, understanding and documenting

**Success criterion:** a document which outlines how you think this Express server works. You don't have to achieve a theory which explains 100%, but you should strive to explain as much as possible.

(N.B.: The _correctness_ of your theory is **much less important** than the _process_ of forming this document. [Forming a prediction, and then discovering it was wrong, is an effective way to learn](https://www.sciencedirect.com/science/article/abs/pii/S0959475217303468)!)

1. Take some time to read and digest the code
2. Google things that you don't understand
3. Experiment with changing things
4. Produce a narrative document

A good narrative document for this program would explain what code gets executed when the server is started, and what code gets executed when different endpoints are hit - and how what you see in your browser (as the server response) either changes / does not change on subsequent requests depending on the route.

(Some routes will give you back the same response each time, and others won't. Why is that?)

## Exercise 3: Viewing in Postman

> 🎯 **Success criterion:** you can make GET requests to all endpoints in `server.ts` via Postman

[Postman](https://www.postman.com/) is a commonly-used tool for supporting server endpoint development (sometimes referred to as API development).

### Downloading Postman

If you are on Windows or MacOS, you can [download the desktop app straightforwardly from the Postman website](https://www.postman.com/downloads/).

If you are on Amazon Linux (the Linux distribution used by Amazon Workspaces), you will need to:

1. Install `snap` with [a (long) one-liner](https://www.bonusbits.com/wiki/HowTo:Install_Snap_on_Amazon_Linux_Workspace#One_Liner)
2. Run `sudo snap install postman`

### Sending requests with Postman

Read and follow [this guide from Postman](https://learning.postman.com/docs/getting-started/sending-the-first-request/) on sending requests.

Don't worry too much right now about the different types of requests - we're focusing on `GET` requests (which is why there is `app.get` all over the place in `server.ts`, to handle GET requests). (If you want to read ahead, [MDN has some good docs on HTTP request types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).)

Once you've made your first `GET` request as per the Postman docs, try making `GET` requests to some of the following:

- `localhost:4000`
- `localhost:4000/hits`
- `localhost:4000/hits-stealth`

etc

## Exercise 4: Writing your own Express route

> 🎯 **Success criterion:** you can visit `localhost:5050/hello-world`, `localhost:5050/ponies/random` and `localhost:5050/history` in the browser, with the expected behaviour below.

Now, you're going to try making changes to the server - in particular, you're going to try adding some endpoints of your own.

> ⚠️ Restart your server for changes to come into effect. Once you have started your server, any changes you make to its source code are not taken into consideration until the next time you (re)start the server. Alternatively, instead of running the server with `yarn start` (which uses `ts-node`), you can run the server with the `start:dev` script which we've added - it uses `ts-node-dev` to watch the source code and automatically restart it when there are changes.

### `/hello-world`

Should respond with the following JSON data:

```json
{
  "english": "Hello world!",
  "esperanto": "Saluton mondo!",
  "hawaiian": "Aloha Honua",
  "turkish": "Merhaba Dünya!"
}
```

### `/ponies/random`

Shows a _single_ random pony from `ponies.json`. It should be possible to hit the route twice and get back two different ponies.

### `/history`

Shows a list of which (active) routes have been hit in chronological order.

For example, if you visited the following routes after starting your server:

- `/ponies`
- `/hits`
- `/history`
- `/um-what-is-this`
- `/`
- `/history`

Then the response should be something like:

```js
{
  "routes": [
    "/ponies",
    "/hits",
    "/history",
    "/",
    "/history"
  ]
}
```

(where `/um-what-is-this` is ignored, because it isn't a defined server endpoint)

## Exercise 5: Check your understanding

> 🎯 **Success criterion:** a conversation with a Faculty member and amended comments.

Talk to a member of Faculty about your understanding of the server and of TypeScript.

Amend your notes for any important points that come out of the conversation.

## Exercise 6: Commentary and reflection

**Success criterion:** documented reflections.
