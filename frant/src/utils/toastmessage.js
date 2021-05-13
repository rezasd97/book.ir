import { toast } from 'react-toastify';


export const seccess=message=>{

    toast.success(message, {
        position: "top-right",
        closeOnClick: true})
};

export const error=message=>{

    toast.error(message, {
        position: "top-right",
        closeOnClick: true})
};