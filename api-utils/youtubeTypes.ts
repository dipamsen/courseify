export module YouTube {
  export module Playlist {
    export interface Thumbnail {
      url: string;
      width: number;
      height: number;
    }

    export interface Thumbnails {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard: Thumbnail;
      maxres: Thumbnail;
    }

    export interface ResourceId {
      kind: string;
      videoId: string;
    }

    export interface Snippet {
      publishedAt: Date;
      channelId: string;
      title: string;
      description: string;
      thumbnails: Thumbnails;
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: ResourceId;
      videoOwnerChannelTitle: string;
      videoOwnerChannelId: string;
    }

    export interface ContentDetails {
      videoId: string;
      videoPublishedAt: Date;
    }

    export interface Item {
      kind: string;
      etag: string;
      id: string;
      snippet: Snippet;
      contentDetails: ContentDetails;
    }

    export interface PageInfo {
      totalResults: number;
      resultsPerPage: number;
    }

    export interface Response {
      kind: string;
      etag: string;
      nextPageToken: string;
      items: Item[];
      pageInfo: PageInfo;
    }
  }
}
