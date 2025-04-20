"use client"
//import {useState} from "react"
// import {toast} form "sonner"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
//import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

////////////////
// import {Checkbox} form "@/components/ui/checkbox"
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList
// } form "@/components/ui/command"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } form "@/components/ui/popover"
// import {
//   Check,
//   ChevronsUpDown
// } form "lucide-react"
// // import {  format} form "date-fns"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger
// } form "@/components/ui/popover"
// import {  Calendar} form "@/components/ui/calendar"
// import {  Calendar as CalendarIcon} form "lucide-react"
// import {  DatetimePicker} form "@/components/ui/datetime-picker"
// import {
//   CloudUpload,
//   Paperclip
// } form "lucide-react"
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem
// } form "@/components/ui/file-upload"
import {Input} from "@/components/ui/input"
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot
// } form "@/components/ui/input-otp"
// import LocationSelector form "@/components/ui/location-input"
// import {
//   MultiSelector,
//   MultiSelectorContent,
//   MultiSelectorInput,
//   MultiSelectorItem,
//   MultiSelectorList,
//   MultiSelectorTrigger
// } form "@/components/ui/multi-select"
import {PasswordInput} from "@/components/ui/password-input"
// import {  PhoneInput} form "@/components/ui/phone-input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } form "@/components/ui/select"
//import {useRef} from "react"
// import SignatureInput form '@/components/ui/signature-input'
// import {  Slider} form "@/components/ui/slider"
// import {  SmartDatetimeInput} form "@/components/ui/smart-datetime-input"
// import {  Switch} form "@/components/ui/switch"
// import {  TagsInput} form "@/components/ui/tags-input"
// import {  Textarea} form "@/components/ui/textarea"
// import {  Rating} form "@/components/ui/rating"
///////////
import {FormFieldType, FormType} from "@/components/loginform/FormCard";
import {useRouter} from "next/navigation";
import {Alert} from "@/components/ui/Alert";
import {useState} from "react";

// const formSchema = z.object({
//     username: z.string().min(3).max(32),
//     password: z.string().min(8).max(128)
// });

type FormBuilderProps = {
    form: FormType
    onSubmit?: (data: any) => void
    onReset?: () => void
}

export default function FormBuilder({form: form_config}: FormBuilderProps) {
    const router = useRouter()

    const formSchema = z.object(
        form_config.fields.reduce((acc, field) => {
                switch (field.type) {
                    case "number":
                        acc[field.name] = z.coerce.number();
                        break;
                    case "date":
                        acc[field.name] = z.coerce.date();
                        break;
                    case "checkbox":
                        acc[field.name] = z.coerce.boolean();
                        break;
                    default:
                        acc[field.name] = z.string();
                        break;
                }
                if (field.required) {
                    acc[field.name] = acc[field.name].min(1, {
                        message: `${field.label} نیاز است `,
                    });
                }
                if (field.min) {
                    acc[field.name] = acc[field.name].min(field.min, {
                        message: `${field.label} باید حداقل دارای ${field.min} کاراکتر باشد`,
                    });
                }
                if (field.max) {
                    acc[field.name] = acc[field.name].max(field.max, {
                        message: `${field.label} باید حداقل دارای ${field.max} کاراکتر باشد`,
                    });
                }
//                 if (field.pattern) {
//                     acc[field.name] = acc[field.name].regex(new RegExp(field.pattern), {
//                         message: `${field.label} must match the pattern ${field.pattern}`,
//                     });
//                 }
                if (field.type === "email") {
                    acc[field.name] = acc[field.name].email({
                        message: `${field.label} must be a valid email`,
                    });
                }
                return acc;
            }, {} as any
        ));


    console.log(formSchema)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })
    const [AlertV , setAlertV ] = useState(false)
    function onSubmit(values: z.infer<typeof formSchema>) {
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
            {AlertV && <Alert variant={"successful"}>خوش آمدید</Alert>}
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">


                {(form_config.fields as FormFieldType[]).map((f, key) => {
                    let Field;
                    switch (f.type) {
                        case "password":
                            Field = PasswordInput;
                            break;
                        default:
                            Field = Input;
                            break;
                    }
                    return (
                        <FormField
                            key={key}
                            control={form.control}
                            name={f.name}
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{f.label}</FormLabel>
                                    <FormControl>
                                        <Field
                                            placeholder={f.placeholder}
                                            type={f.type}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>{f.description}</FormDescription>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    )
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
    )
}