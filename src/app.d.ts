// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      token?: string;
      user?: UserData;
    }
		interface PageData {
      
    }
		// interface PageState {}
		// interface Platform {}
	}

  interface UserData {
    id: number;
    username: string;
    displayName: string;
    role: string;
    profilePicture?: string;
  }

  interface CategoryData {
    id: number;
    name: string,
    section: string;
    description?: string;
    isLocked: boolean;
  }

  interface ThreadData {
    id: number;
    title: string;
    tags: string[];
    categoryId: number;
    authorId: number;
    createdAt: string;
    isLocked: boolean;
    author: UserData;
  }

  interface PostData {
    id: number;
    content: string;
    replyPostId?: number;
    threadId: number;
    thread: ThreadData;
    authorId: number;
    author: UserData;
    createdAt: string;
    isEdited: boolean;
    isDeleted: boolean;
  }

  type Option<T, N = undefined> = T | N;
}

export {};
