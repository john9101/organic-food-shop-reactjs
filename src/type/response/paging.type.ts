export type Paging<Data> = {
    title: string,
    items: Data[],
    total_pages: number,
    total_items: number,
    current_page: number
}