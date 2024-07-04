import { Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { createCourse } from "../utils/api";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("unfilled"); // unfilled, loading, success, error

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here, for example, send data to server
    setStatus("loading");
    try {
      await createCourse(title, description, playlistId);
    } catch (error: any) {
      setError(error.message);
      setStatus("error");
      return;
    }

    console.log("Form submitted:", { title, description, playlistId });
    setTitle("");
    setDescription("");
    setPlaylistId("");
  };
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Course
      </Typography>

      <Typography variant="body1" gutterBottom>
        Create a new course
      </Typography>

      {/* form - title, description, playlistId */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          fullWidth
          multiline
          minRows={4}
        />
        <TextField
          label="Playlist ID"
          value={playlistId}
          onChange={(e) => setPlaylistId(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      {status === "loading" && <p>Loading...</p>}

      {status === "success" && <p>Success!</p>}

      {status === "error" && <p>Error: {error}</p>}
    </Container>
  );
}
