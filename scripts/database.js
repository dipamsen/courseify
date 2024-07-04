const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6vl3ZICJw7WcpYTFQBaMC7h60aEBxMtQ",
  authDomain: "yt-courses-9a615.firebaseapp.com",
  projectId: "yt-courses-9a615",
  storageBucket: "yt-courses-9a615.appspot.com",
  messagingSenderId: "286632954156",
  appId: "1:286632954156:web:4a7c14a78de733f4e14489",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const coursesDB = collection(db, "courses");

const course = {
  title: "Test Course",
  description: "Test Course Description",
  chapters: [
    {
      title: "Test Course",
      resources: [
        { title: "Video 1", videoId: "yS0EMhzdYfo" },
        { title: "Video 2", videoId: "gP8m_7knPF4" },
      ],
    },
  ],
};

addDoc(coursesDB, course);
