import { Elysia } from "elysia";

export const plugin = new Elysia()
  .state("plugin-version", 1)
  .get("/form-plugin", () => "Hi");
