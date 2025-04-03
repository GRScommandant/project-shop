import react from 'react'
import FormCard , {FormType} from "@/components/loginform/FormCard";
import login_data from "@/form/login.json";
const login_config = login_data

export default function Page() {
    return (
        <>
            <FormCard form={login_config}/>
            </>
    )
}