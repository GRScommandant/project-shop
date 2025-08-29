import react from 'react'
import FormCard , {FormType} from "@/components/registerform/RFormCard";
import register_data from "@/form/register.json";
const register_config = register_data

export default function Page() {
    return (
        <>
            <FormCard form={register_config}/>
            </>
    )
}