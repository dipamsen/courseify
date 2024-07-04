import { YouTube } from "./youtubeTypes";
import dotenv from "dotenv";
dotenv.config();

const browserKey = process.env.API_KEY;

export async function getAllVideos(playlistId: string) {
  let res: YouTube.Playlist.Response | { error: { message: string } } =
    await request(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&maxResults=50&key=${browserKey}`
    );
  if ("error" in res) {
    throw new Error(res.error.message);
  }
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

async function request(url: string) {
  const res = await fetch(url);
  return res.json();
}
