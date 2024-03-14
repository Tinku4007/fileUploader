import axios from "axios";

const url = "https://v2.convertapi.com"

export const UploadImage = async (data)=>{
    const res = await axios.post(`${url} + /upload` , data);
    console.log(res)
}