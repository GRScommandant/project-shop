import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import React from "react"
export function Newproductdialog() {
    const [productData, setProductData] = useState({
        name: '',
        price: '',
        category: '',
        // Add other fields as needed
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log(productData)
    }

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
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Input
                            id="category"
                            placeholder="دسته بندی"
                            className="col-span-3 w-[300px]"
                            value={productData.category}
                            onChange={(e) => setProductData(prev => ({
                                ...prev,
                                category: e.target.value
                            }))}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" variant={"socialT"}>تایید</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    )
}