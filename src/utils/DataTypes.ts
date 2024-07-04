export interface Course {
  title: string;
  description: string;
  imageUrl: string;
  chapters: Chapter[];
}

export interface Chapter {
  title: string;
  resources: Resource[];
}

export type Resource = Video | File;

export interface Video {
  title: string;
  videoId: string;
}

export interface File {
  title: string;
  driveId: string;
}
