export type Creator = { id: string; name: string; image: string | null };
export type FeedComment = { id: string; text: string; createdAt: Date; user: Creator };
export type FeedPost = { id: string; text: string; mediaUrl: string | null; mediaType: string | null; isPublic: boolean; likes: number; createdAt: Date; comments: FeedComment[]; likesList: { userId: string }[] };
