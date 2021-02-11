# Endpoint testing

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>

> This is part of Academy's [technical curriculum for **The Mark**](https://github.com/WeAreAcademy/curriculum-mark). All parts of that curriculum, including this project, are licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

We're now going to run your first server and play around with a few existing **endpoints** that it has.

## Learning Outcomes

- Compare the brittleness of different tests
- Write endpoint tests for an express server with `supertest`
- Use Jest's documentation on matchers
- Use Jest's `toMatch` matcher with a regular expression
- Load an environment variable from a `.env` file into Node

## Exercise 1: Installing, running and testing

**Success criterion:** you can view evidence your server is running at `localhost:4000` and run its tests (which should all pass)

Clone/fork the repo so that you have it locally, then view the `scripts` available in `package.json`. This should give you an idea of what you can run to get the server started, run its tests, and make queries via Postman.

(The server doesn't need to be running for you to run tests - [`supertest`](https://github.com/visionmedia/supertest) is a testing library that lets us test HTTP requests.)

## Exercise 2: Reading, understanding and documenting

**Success criterion:** a document which outlines how you think this Express server works. You don't have to achieve a theory which explains 100%, but you should strive to explain as much as possible.

(N.B.: The _correctness_ of your theory is **much less important** than the _process_ of forming this document. [Forming a prediction, and then discovering it was wrong, is an effective way to learn](https://www.sciencedirect.com/science/article/abs/pii/S0959475217303468)!)

1. Take some time to read and digest the code
2. Google things that you don't understand
3. Experiment with changing things
4. Produce a narrative document

### A note on the tests

The tests have been written using a few different [Jest matchers](https://jestjs.io/docs/en/using-matchers).

We'll look at three different strategies for testing the content of `response.body.speech.text`.

**`GET /`**

By using `.toStrictEqual` on the response body, our test for `GET /` is the most _britle_. It's specific, prescriptive and rigid - it's easy for a non-meaningful change to break it.

A small punctuation change (e.g. "Hmm, I reckon we should have an exclamation mark rather than a full stop after 'ENDPOINT ADVENTURE'") requires a change in _two_ places: the test file _and_ the server file.

Additionally, the assertion (which checks the whole of `response.body`) will fail if we make a change to a different part of the body (e.g. `response.body.options`).

**`GET /quest/accept`**

In this test, we're using the below assertion:

```ts
expect(typeof response.body.speech.text).toBe("string");
```

we are only asserting that `response.body.speech.text` is a string - but it could be any string, e.g. the empty string `''` or a total non-sequitur like `"You have no authority here, Jackie Weaver!"`

This is far less brittle, but it also may be insufficiently stringent as a test.

**`GET /quest/decline`**

In this test, we're using the below assertions:

```ts
expect(response.body.speech.text).toMatch("FOOL");
expect(response.body.speech.text).toMatch(/mistake/i);
```

The first of these checks that `"FOOL"` appears somewhere in the string (but doesn't care where).

The second is using a [regular expression](https://eloquentjavascript.net/09_regexp.html), looking for the pattern `mistake` (enclosed within `/` to declare a [regular expression literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#creating_a_regular_expression)), with the `i` [flag](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags) added at the end to indicate a case-insensitive search: so `"MISTAKE"` and `"miSTakE"` both match.

(The equivalent `_RegExp_` for `"FOOL"` in our first assertion would have been `/FOOL/`, with no case insensitive flag - since the string `"FOOL"` is not a case insensitive matcher.)

These assertions are less brittle than testing for an exact stringl and also more stringent _and informative_ than simply checking it is a string. They communicate something about _intent_ by giving clues as to what sort of message should be represented in the string, without being prescriptive down to punctuation and phrases.

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
