import { VercelRequest } from "@vercel/node";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../api-utils/firebaseConfig.ts";
import "../api-utils/youtube.ts";

export function POST(request: VercelRequest) {
  console.log(request.body);
  console.log(request.headers["content-type"]);
  if ("playlistId" in request.body === false) {
    return new Response("Missing playlistId in body.", { status: 400 });
  }
  const { playlistId } = request.body;

  const coursesRef = collection(db, "courses");

  return new Response("Hello World!");
}
