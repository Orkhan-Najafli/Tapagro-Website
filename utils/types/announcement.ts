export interface Announcements {
    createdAt: Date | string;
    id: number
    name: string
    publishedAt: Date | string
    status: { label: string, status: string }
    subcategory: string
    thumbnailName: string
    thumbnailPath: string
    type: string
    vipAt: Date | string
}
export interface QueryParams {
    page: number;
    size: number;
}