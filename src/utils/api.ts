const API_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

export async function createCourse(
  title: string,
  description: string,
  playlistId: string
) {
  const res = await fetch(`${API_URL}/api/playlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      playlistId: playlistId,
    }),
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(data.error);
  } else {
    return data;
  }
}
