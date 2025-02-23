export type GotAllBrandsResponse = {
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

export type GotBrandDetailResponse = {
    id: number
    name: string
    description: string
}

export type AddedBrandResponse = {
    id: number
    name: string
    description: string
    is_visible: boolean
    is_deleted: boolean
}

export type EditedBrandResponse = {
    id: number
    name: string
    description: string
}

export type DeletedBrandResponse = {
    id: number
    is_deleted: boolean
}

export type RecoveredBrandResponse = {
    id: number
    is_deleted: boolean
}

export type DisplayedBrandResponse = {
    id: number
    is_visible: boolean
}