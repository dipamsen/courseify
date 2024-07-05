import { VercelRequest, VercelResponse } from "@vercel/node";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./utils/_firebaseConfig.ts";
import { getAllVideos } from "./utils/_youtube.ts";
import { allowCors } from "./utils/_cors.ts";

async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== "POST") {
    return response.status(405).send({
      error: "Method not allowed",
    });
  }
  try {
    request.body;
  } catch (error) {
    return response.status(400).send({
      error: "Malformed request body",
    });
  }
  const requiredFields = ["playlistId", "title", "description"];
  if (
    !request.body ||
    requiredFields.some((field) => !(field in request.body))
  ) {
    return response.status(400).send({
      error:
        "Missing one or more required fields: " + requiredFields.join(", "),
    });
  }
  const { playlistId } = request.body;

  let videos;
  try {
    videos = await getAllVideos(playlistId);
  } catch (error) {
    return response.status(404).send({
      error: error.message,
    });
  }

  // create a new "course" document in the database
  try {
    const courseRef = collection(db, "courses");
    const courseDoc = await addDoc(courseRef, {
      title: request.body.title,
      description: request.body.description,
      chapters: [
        {
          title: request.body.title,
          resources: videos.map((video) => ({
            title: video.snippet.title,
            videoId: video.contentDetails.videoId,
          })),
        },
      ],
    });
  } catch (error) {
    return response.status(400).send({
      error: "Something went wrong: " + error.message,
    });
  }

  return response.send({
    success: true,
  });
}

export default allowCors(handler);
