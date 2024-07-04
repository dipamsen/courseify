import { YouTube } from "./youtubeTypes";
import dotenv from "dotenv";
dotenv.config();

const playlistId = process.env.PLAYLIST_ID;
const browserKey = process.env.API_KEY;
console.log(playlistId, browserKey);

async function getAllVideos() {
  let res: YouTube.Playlist.Response = await request(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=50&key=${browserKey}`
  );
  // pagination
  while (res.nextPageToken) {
    let oldRes = res;
    res = await request(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${oldRes.nextPageToken}&key=${browserKey}`
    );
    return [...oldRes.items, ...res.items];
  }
  return res.items;
}

async function main() {
  const videos = await getAllVideos();
}
main();

async function request(url: string) {
  const res = await fetch(url);
  return res.json();
}

export {};
