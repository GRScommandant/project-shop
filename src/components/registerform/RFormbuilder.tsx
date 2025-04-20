"use client"
import { Input } from "@/components/ui/input";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { FormFieldType, FormType } from "@/components/registerform/RFormCard";
import {Alert} from '@/components/ui/Alert'
import {useState} from "react";
import { useRouter } from 'next/navigation'

type FormBuilderProps = {
    form: FormType,
    onsubmit?: (data: any) => void,
    onreset?: () => void
}

export default function RFormbuilder({ form: form_config }: FormBuilderProps) {
    const router = useRouter()
    const Rform_schema = z.object(
        form_config.fields.reduce((acc, field) => {
            let schema: z.ZodType<any>;

            switch (field.type) {
                case "number":
                    schema = z.number();
                    break;
                case "date":
                    schema = z.date();
                    break;
                case "checkbox":
                    schema = z.boolean();
                    break;
                case "text":
                    schema = z.string();
                    break;
                case "email":
                    schema = z.string();
                    break;
                case "password":
                    schema = z.string();
                    break;
                default:
                    schema = z.string();
            }


            if (field.required) {
                if (schema instanceof z.ZodString) {
                    schema = schema.min(1, {
                        message: `${field.label} نیاز است `
                    });
                }
            }
            if (field.min !== undefined) {
                if (schema instanceof z.ZodString) {
                    schema = schema.min(field.min, {
                        message: `${field.label} باید حداقل دارای ${field.min} کاراکتر باشد`
                    });
                } else if (schema instanceof z.ZodNumber) {
                    schema = schema.min(field.min, {
                        message: `${field.label} باید حداقل ${field.min} باشد`
                    });
                }
            }
            if (field.max !== undefined) {
                if (schema instanceof z.ZodString) {
                    schema = schema.max(field.max, {
                        message: `${field.label} باید حداکثر دارای ${field.max} کاراکتر باشد`
                    });
                } else if (schema instanceof z.ZodNumber) {
                    schema = schema.max(field.max, {
                        message: `${field.label} باید حداکثر ${field.max} باشد`
                    });
                }
            }

            acc[field.name] = schema;
            return acc;
        }, {} as Record<string, z.ZodType<any>>)
    );

    console.log(Rform_schema);
    const form = useForm<z.infer<typeof Rform_schema>>({
        resolver: zodResolver(Rform_schema)
    });
    const [AlertV , setAlertV ] = useState(false)
    function onSubmit(values: z.infer<typeof Rform_schema>) {
        try {
            console.log(values);
            setAlertV(true)
            setTimeout(() => {
                router.push('/');
            }, 1500);

        } catch (error) {
            console.error("دچار اختلال شده است");

        }
    }

    return (

        <Form {...form}>
            {AlertV && <Alert variant={"successful"}>ثبت نام شما با موفیت انجام شد</Alert>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto py-10">
                {(form_config.fields as FormFieldType[]).map((f, key) => {
                    let Field;
                    switch (f.type) {
                        case "password":
                            Field = PasswordInput;
                            break;
                        default:
                            Field = Input;
                    }
                    return (
                        <FormField
                            key={key}
                            control={form.control}
                            name={f.name}
                            render={({ field }) => (
                                <FormItem className="space-y-0">
                                    <FormLabel className="space-y-0">{f.label}</FormLabel>
                                    <FormControl className="space-y-0">
                                        <Field
                                            placeholder={f.placeholder}
                                            type={f.type}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="space-y-0">{f.description}</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    );
                })}
                {form_config.buttons.map((btn, key) => (
                    <div key={key} className="flex justify-center gap-2">
                        <Button type="submit" className="w-[50%]">
                            {btn.label}
                        </Button>
                    </div>
                ))}

            </form>
        </Form>
    );
}
