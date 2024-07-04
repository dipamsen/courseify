import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { collection, getDocs, doc } from "firebase/firestore";
import { db } from "../utils/FirebaseConfig";
import { Course, WithID } from "../utils/classes";

export default function Home() {
  const [courses, setCourses] = React.useState<WithID<Course>[]>([]);
  const coursesRef = collection(db, "courses").withConverter(Course);

  // useEffect(() => {
  //   async function getCourseData() {
  //     const snap = await getDocs(coursesRef);
  //     setCourses(snap.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   }
  //   getCourseData();
  // }, []);

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Courses</Typography>
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.id}>
            <CardContent>
              <Typography variant="h5">{course.title}</Typography>
              <Typography variant="body1">{course.description}</Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to={`/c/${course.id}`}>
                Open
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant="body1">No courses available.</Typography>
      )}
    </Container>
  );
}
