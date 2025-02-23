export type GotAllCategoriesResponse = {
    items: [
        {
            id: number
            name: string
            description: string
            is_visible: boolean
            is_deleted: boolean
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
    is_visible: boolean
    is_deleted: boolean
}

export type EditedCategoryResponse = {
    id: number
    name: string
    description: string
}

export type DeletedCategoryResponse = {
    id: number
    is_deleted: boolean
}

export type RecoveredCategoryResponse = {
    id: number
    is_deleted: boolean
}

export type DisplayedCategoryResponse = {
    id: number
    is_visible: boolean
}