import fs from "fs-extra";
import axios from "axios";
import { getImageSize } from "./getImageSize.js";
import { log, time } from "./log.js";

const INITIAL_ID_XKCD_COMICS = 2500;
const MAX_ID_XKCD_COMICS = 2588;

for (let id = INITIAL_ID_XKCD_COMICS; id <= MAX_ID_XKCD_COMICS; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching ${url}`);
  const { data } = await axios.get(url);
  const { num, news, transcript, img, ...restOfComic } = data;
  log(`Fetched comic n${num}`);
  const { height, width } = await getImageSize({ url: img });
  log(`Got dimmensions height ${height} and width ${width}`);
  const comicToStore = {
    id,
    img,
    height,
    width,
    ...restOfComic,
  };
  const jsonFile = `./comics/${id}.json`;
  fs.writeJSON(jsonFile, comicToStore);
  log(`Wrote ${jsonFile}`);
}

// END TIME
time();
