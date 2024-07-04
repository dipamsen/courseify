import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  IconButton,
  Toolbar,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { WithID, Course } from "../utils/classes";
import { db } from "../utils/FirebaseConfig";
import BookIcon from "@mui/icons-material/Book";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function ViewCourse() {
  const [course, setCourse] = React.useState<WithID<Course>>();
  const [error, setError] = React.useState<boolean>(false);
  const { courseId } = useParams<{ courseId: string }>();
  // const coursesRef = collection(db, "courses").withConverter(Course);

  useEffect(() => {
    async function getCourseData() {
      const snap = await getDoc(
        doc(db, "courses", courseId!).withConverter(Course)
      );
      if (snap.exists()) {
        setCourse({ ...snap.data(), id: snap.id });
      } else {
        setError(true);
      }
    }
    getCourseData();
  }, []);

  useEffect(() => {
    if (course && course.title) document.title = course?.title;
  }, [course]);

  return course ? (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <BookIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {course?.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={{ height: "1rem" }}></div>
      <Container maxWidth="sm">
        <Typography variant="h4">{course.title}</Typography>
        {course.chapters.length > 0 ? (
          course.chapters.map((chapter, index) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="body1" sx={{ fontWeight: 800 }}>
                  {index + 1}: {chapter.title}
                </Typography>
              </AccordionSummary>
              <div style={{ height: "1rem" }}></div>
              <AccordionDetails>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="simple table">
                    <TableBody>
                      {chapter.resources.map((res, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {res.title}
                          </TableCell>
                          <TableCell align="right">
                            <Button component={"a"} href={res.url}>
                              {res.actionText}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body1">No chapters available.</Typography>
        )}
      </Container>
    </>
  ) : error ? (
    <Typography variant="body1">Course not found.</Typography>
  ) : (
    <Typography variant="h4">Loading...</Typography>
  );
}
