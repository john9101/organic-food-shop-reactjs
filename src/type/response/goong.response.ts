export type SearchedPlaceResponse = {
    predictions: [
        {
            compound: {
                province: string,
                district: string,
                commune: string,
            }
            description: string,
            structured_formatting: {
                main_text: string,
                secondary_text: string
            }
        }
    ]
    status: string
}
