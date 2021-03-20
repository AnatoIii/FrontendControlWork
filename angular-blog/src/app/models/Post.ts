export interface Post {
    id?: string;
    createdAt: Date;
    title: string;
    description: string;
    likes?: number;
}