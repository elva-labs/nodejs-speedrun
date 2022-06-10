import express from "express";
import fetch from "node-fetch";
import { createReadStream, writeFile } from "fs";
import { readFile } from "fs/promises";

const app = express();
const port = 3000;
const FILE_STORAGE = "./cache-locs.json";

app.use(express.json());

app.post("/loc", async (req, res) => {
  const { loc, name } = req.body;

  if (!loc) {
    return res.sendStatus(400);
  }

  const locations = JSON.parse(await readFile(FILE_STORAGE));

  locations[name] = loc;

  writeFile(FILE_STORAGE, JSON.stringify(locations), (err) => {
    if (!err) return;

    console.error(err);
  });

  res.sendStatus(201);
});

app.get("/loc", (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  createReadStream(FILE_STORAGE).pipe(res);
});

app.get("/loc/:id", async (req, res) => {
  const locations = JSON.parse(await readFile(FILE_STORAGE));
  const id = req.params.id;

  if (locations.hasOwnProperty(id)) {
    const data = await getWeather(locations[id]);

    res.status(200).send(data);

    return;
  }

  const locData = await getWeather(req.params.loc);

  if (!locData) {
    res.sendStatus(404);

    return;
  }

  res.send(locData);
});

async function getWeather(loc) {
  const res = await fetch(
    `https://www.yr.no/api/v0/locations/${loc}/forecast/currenthour`
  );

  if (res.status != 200) {
    return null;
  }

  const json = await res.json();

  return json;
}

app.listen(port, () => {
  console.log(`running on ${port}`);
});
