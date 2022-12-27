export default interface PaginatedList<T> {
    items: Array<T>,
    pageNumber: number,
    totalPages: number,
    totalCount: number,
    hasPreviousPage: boolean,
    hasNextPage: boolean
}