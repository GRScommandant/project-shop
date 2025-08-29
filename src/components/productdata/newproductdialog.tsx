import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {useState} from "react"
import React from "react"
import {Select, SelectTrigger, SelectValue, SelectGroup, SelectContent, SelectItem} from "@/components/ui/select";
import products from "@/form/product.json"
import {useRouter} from "next/navigation";
import {Plus, Trash2} from "lucide-react";

interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    amount: number;
    price?: number;
    image: string;
    description: Array<{
        property: string;
        propertydes: string;
    }>;

}

export function Newproductdialog() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        amount: '',
        description: [{property: "", propertydes: ""}],
        category: '',
        brand: '',
        image: '',
    })
    const router = useRouter()
    const addDescriptionField = () => {
        setProductData(prev => ({
            ...prev,
            description: [...prev.description, {property: "", propertydes: ""}]
        }))
    };
    const removeDescriptionField = (index: number) => {
        setProductData(prev => ({
            ...prev,
            description: prev.description.filter((_, i) => i !== index)
        }))
    };
    const handleDescriptionChange = (
        index: number,
        field: 'property' | 'propertydes',
        value: string
    ) => {
        setProductData(prev => {
            const newDescription = [...prev.description];
            newDescription[index] = {
                ...newDescription[index],
                [field]: value
            };
            return {
                ...prev,
                description: newDescription
            };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('')
        console.log(productData)
        router.refresh()

    }
    const handleCatagoryChange = (value: string) => {
        setProductData(prev => ({
            ...prev,
            category: value,

        }))
    }
    const handlebrandChange = (value: string) => {
        setProductData(prev => ({
            ...prev,
            brand: value,

        }))
    }
    const productList: Product[] = products;
    const Uniquecatagory = Array.from(new Set(productList.map(product => product.category)))
    const Uniquebrand = Array.from(new Set(productList.map(product => product.brand)))
    return (
        <DialogContent className="sm:max-w-[425px] flex flex-col items-end">
            <DialogHeader>
                <DialogTitle className="text-right flex flex-col items-center justify-center">کالای جدید</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4 w-[100%]">
                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <Input
                            id="name"
                            placeholder="نام کالا"
                            className="col-span-3 w-[300px]"
                            value={productData.name}
                            onChange={(e) => setProductData(prev => ({
                                ...prev,
                                name: e.target.value
                            }))}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 w-full">
                        <Input
                            id="amount"
                            placeholder="تعداد"
                            type="number"
                            className="col-span-3 w-[300px]"
                            value={productData.amount}
                            onChange={(e) => setProductData(prev => ({
                                ...prev,
                                amount: e.target.value
                            }))}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="price"
                            placeholder="قیمت"
                            type="number"
                            className="col-span-3 w-[300px]"
                            value={productData.price}
                            onChange={(e) => setProductData(prev => ({
                                ...prev,
                                price: e.target.value
                            }))}
                        />
                    </div>
                    <div>
                        <Select onValueChange={handleCatagoryChange}>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="دسته بندی"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Uniquecatagory.map((catagory, index) => (
                                        <SelectItem key={index} value={catagory}>{catagory}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Select onValueChange={handlebrandChange}>
                            <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="برند"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Uniquebrand.map((brand, index) => (
                                        <SelectItem key={index} value={brand}>{brand}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                        <div className="space-y-4">
                            {productData.description.map((desc, index) => (
                                <div key={index} className="flex gap-4 items-center">
                                    <div className="grid grid-cols-2 gap-4 flex-1">
                                        <Input
                                            placeholder="ویژگی"
                                            value={desc.property}
                                            onChange={(e) =>
                                                handleDescriptionChange(index, 'property', e.target.value)
                                            }
                                        />
                                        <Input
                                            placeholder="توضیحات ویژگی"
                                            value={desc.propertydes}
                                            onChange={(e) =>
                                                handleDescriptionChange(index, 'propertydes', e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {index === productData.description.length - 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={addDescriptionField}
                                            >
                                                <Plus className="h-4 w-4"/>
                                            </Button>
                                        )}
                                        {productData.description.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => removeDescriptionField(index)}
                                            >
                                                <Trash2 className="h-4 w-4"/>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                </div>
                <DialogFooter>
                    <Button type="submit" variant={"socialT"}>تایید</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}