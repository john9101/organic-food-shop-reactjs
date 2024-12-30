export type GotAllCategoriesResponse = {
    items: [
        {
            id: number
            name: string
            description: string
        }
    ]
}

export type GotCategoryDetailResponse = {
    id: number
    name: string
    description: string
}

export type AddedCategoryResponse = {
    id: number
    name: string
    description: string
}

export type EditedCategoryResponse = {
    id: number
    name: string
    description: string
}

export type DeletedCategoryResponse = {
    id: number
}