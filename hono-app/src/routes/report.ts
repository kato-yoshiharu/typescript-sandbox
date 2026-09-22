import { sleep } from "@hono-app/utils/sleep";
import { Hono } from "hono";
import { endTime, startTime } from "hono/timing";

// I/O待ちの代用。実際のDBクエリ・外部API呼び出しに相当する
const fetchUser = async () => {
  await sleep(120);

  return { id: 1, name: "taro" };
};

const fetchRecommendations = async () => {
  await sleep(80);

  return ["a", "b", "c"];
};

// CPU処理の代用。プロファイラで検出できるよう実際に計算させる
const render = (user: { name: string }, items: string[]) => {
  let hash = 0;
  for (let i = 0; i < 300_000; i++) {
    hash = (hash + i) % 2147483647;
  }

  return { user: user.name, items, hash };
};

export const report = new Hono();

report.get("/report", async (c) => {
  startTime(c, "db");
  const user = await fetchUser();
  endTime(c, "db");

  startTime(c, "api");
  const items = await fetchRecommendations();
  endTime(c, "api");

  startTime(c, "render");
  const body = render(user, items);
  endTime(c, "render");

  return c.json(body);
});
