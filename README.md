# Courseify

Ability to create and manage courses, based on YouTube videos.

## Database Structures

- Course

  - name: string
  - id: string
  - chapters: Chapter[]

- Resource = VideoResource | FileResource

- VideoResource

  - name: string
  - videoId: string

- FileResource
  - name: string
  - driveId: string
