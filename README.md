# Courseify

Ability to create and manage courses, based on YouTube videos.

## Tech Stack

- Frontend: React (TypeScript) + Material UI + React Router
- Backend: Vercel Serverless Functions (Node.js) + Firebase Firestore

## Database Structures

- Course

  - title: string
  - description: string
  - chapters: Chapter[]

- Chapter

  - title: string
  - resources: Resource[]

- Resource = VideoResource | FileResource

- VideoResource

  - title: string
  - videoId: string

- FileResource

  - title: string
  - driveId: string
