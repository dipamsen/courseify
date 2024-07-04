# Courseify

Ability to create and manage courses, based on YouTube videos.

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
