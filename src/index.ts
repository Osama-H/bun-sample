import { Elysia, t } from "elysia";
import { plugin } from "./plugin";
import { signInDto } from "./models";

const app = new Elysia()
  .use(plugin)
  .state("version", 1)
  .decorate("getDate", () => Date.now())
  .get(
    "/post/:id",
    ({ params: { id } }) => {
      return id;
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .post("/post", ({ body, set }) => {
    set.status = 201;
    return body;
  })
  .get("/track/*", () => {
    return "Track Route!";
  })
  .get("/tracks", ({ store, getDate }) => {
    const track = ["Science", "Math", "Music"];
    console.log(getDate());
    console.log(store["plugin-version"]);
    return new Response(JSON.stringify({ track }));
  });

// Group
app.group("/user", (app) =>
  app
    .post("/sign-in", ({ body }) => body, {
      body: signInDto,
      response: signInDto,
    })
    .post("/signup", () => "Sign-up Route")
    .get("/profile", () => "Profile Route")
);

app.listen(3000);

console.log(`
  🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}
`);
