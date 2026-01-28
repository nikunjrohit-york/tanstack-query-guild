export type User = {
    name: string;
    avatar: string;
};

export type Comment = {
    id: number | string;
    clientId?: number | string;
    user: User;
    text: string;
    createdAt: string;
};

export type CommentsResponse = {
    comments: Comment[];
    nextCursor: number | null;
    totalComments: number;
};

export type Post = {
    id: number;
    title: string;
    body: string;
    userId?: number;
    tags?: string[];
    reactions?: {
        likes: number;
        dislikes: number;
    };
    views?: number;
};
