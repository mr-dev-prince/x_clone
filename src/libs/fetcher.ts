import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data).catch((err) => err?.message)

export default fetcher