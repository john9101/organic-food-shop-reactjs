import instance from "@/util/http.ts";
import {SuccessApiResponse} from "@/type/response/api.type.ts";
import {GotAllBrandsResponse} from "@/type/response/brand.response.ts";

export const brandApi = {
    getAllBrands: (thunkAPI: {signal :AbortSignal}) => {
        return instance.get<SuccessApiResponse<GotAllBrandsResponse>>(`/brands`, {
            signal: thunkAPI.signal
        });
    },
}