import {
Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import FormBuilder from "@/components/loginform/FormBuilder";
import {cn} from "@/lib/utils";
import {className} from "postcss-selector-parser";
export type FormFieldType = {
    checked: boolean,
    description: string,
    disabled: boolean,
    label: string,
    name: string,
    placeholder: string,
    required: boolean,
    rowIndex: number,
    type: string,
    value: string,
    variant: string,
    min: number,
    max: number
}

type FormButtons = {
    checked: boolean,
    description: string,
    disabled: boolean,
    label: string,
    name: string,
    placeholder: string,
    required: boolean,
    rowIndex: number,
    type: string,
    value: string,
    variant: string
}

export type FormType = {
    title: string,
    description: string,
    fields: FormFieldType[],
    buttons: FormButtons[],
}

type FormCardProps = {
    form: FormType
    className?: string
}

export default function FormCard({form, className}: FormCardProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center mt-[10rem]", className)}>
            <Card className={"w-[350px]"}>
                <CardHeader>
                    <CardTitle>{form.title}</CardTitle>
                    <CardDescription>{form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <FormBuilder form={form}/>
                </CardContent>
            </Card>
        </div>
    )
}