import { useEffect, useState } from "react"
import { validator } from "../utils/validatePassword";

const handleOnChange=({e, form, setForm})=>{
    let {name, value} = e.target;
     
    setForm({
        ...form, 
        [name]: value
    })
}

const useForm = (initialState) =>{
    const [form , setForm] = useState(initialState);
    const [passwordErrors, setPasswordErrors] = useState([]);

    useEffect(()=>{
        const errArg = validator(form.password , form.confirmPassword);
        setPasswordErrors(errArg);
    }, [form.password, form.confirmPassword])

     return {
        form, 
        setForm,
        passwordErrors, 
        handleOnChange:(e)=> handleOnChange({e, form, setForm}),
     }
}

export default useForm