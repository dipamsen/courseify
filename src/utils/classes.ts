export class Course {
  constructor(public title: string, public description: string, public chapters: Chapter[]) {}
  static fromFirestore(doc: any) {
    const data = doc.data();
    return new Course(data.title, data.description, data.chapters.map(Chapter.fromFirestore));
  }
  static toFirestore(course: Course) {
    return {
      title: course.title,
      description: course.description,
      chapters: course.chapters.map(Chapter.toFirestore),
    };
  }
}

export class Chapter {
  constructor(public title: string, public resources: Resource[]) {}
  static fromFirestore(data: any) {
    return new Chapter(data.title, data.resources.map(Resource.fromFirestore));
  }
  static toFirestore(chapter: Chapter) {
    return {
      title: chapter.title,
      resources: chapter.resources.map(Resource.toFirestore),
    };
  }
}

export abstract class Resource {
  videoId?: string;
  driveId?: string;
  abstract actionText: string;
  abstract url: string;
  constructor(public title: string) {}
  static fromFirestore(data: any) {
    if (data.videoId) {
      return new Video(data.title, data.videoId);
    } else {
      return new File(data.title, data.driveId);
    }
  }
  static toFirestore(res: Resource) {
    if (res.videoId) {
      return {
        title: res.title,
        videoId: res.videoId,
      };
    } else {
      return {
        title: res.title,
        driveId: res.driveId,
      };
    }
  }
}

export class Video extends Resource {
  actionText = "Watch";
  constructor(public title: string, public videoId: string) {
    super(title);
  }
  get url() {
    return `https://youtu.be/${this.videoId}`;
  }
}

export class File extends Resource {
  actionText = "Open";
  constructor(public title: string, public driveId: string) {
    super(title);
  }
  get url() {
    return `https://drive.google.com/file/d/${this.driveId}/view`;
  }
}

export type WithID<T> = T & { id: string };
