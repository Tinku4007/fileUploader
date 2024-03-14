import axios from "axios";

const url = "https://v2.convertapi.com"

export const UploadImage = async (data)=>{
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const res = await axios.post(`${url}/upload` , data , config);
    } catch (error) {
        console.log(error)
    }
 
}