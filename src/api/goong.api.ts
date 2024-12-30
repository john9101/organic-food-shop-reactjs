import axios from "axios";
import {SearchedPlaceResponse} from "@/type/response/goong.response.ts";

const goong_api_key = "0zclefhViLk9n5umsLN4MyJaWHMr93ll7PpOdYAz"
const goongApi = {
    searchPlace: (keyword: string) => {
        return axios.get<SearchedPlaceResponse>(`https://rsapi.goong.io/Place/AutoComplete`, {params: {api_key: goong_api_key, input: keyword, more_compound: true}});
    }
}

export default goongApi