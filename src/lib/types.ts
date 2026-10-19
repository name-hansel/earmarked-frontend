export type PageResponse<T> = {
    content: T[];
    number: number;
    last: boolean;
    totalElements: number;
};