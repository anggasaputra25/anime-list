import axios from "axios";

const BASE_URL = 'https://api.jikan.moe/v4/'

export const BASE_LOCAL_STORAGE = 'bookmark'

export const getAnime = async(api) => {
    try {
        const response = await axios.get(BASE_URL + api)
        return response.data
    } catch (error) {
        console.log('Error fetching data: ' + error)
    }
}