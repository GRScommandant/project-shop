import products from '../../form/product.json';
import {TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import React, {useState} from "react";
import {Input} from "@/components/ui/input";
import {Newproductdialog} from "@/components/productdata/newproductdialog";
interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    amount: number;
    description: string;
    price?: number;
    image: string;
}

const productList: Product[] = products;
export default function ProductTable() {
    const [searchTerm, setSearchTerm] = useState('')
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    return (
        <>
            <div className="w-full gap-2.5">
               <div className="mb-5 flex flex-row items-center justify-center gap-2.5">
                   <Dialog>
                       <DialogTrigger asChild>
                           <Button variant={"socialT"}> محصول جدید </Button>
                       </DialogTrigger>
                       <Newproductdialog/>
                   </Dialog>
                   <Input
                       type="text"
                       placeholder="جستوجو محصولات....."
                       value={searchTerm}
                       onChange={(e) => setSearchTerm(e.target.value)}
                       className="w-full flex"
                   />
               </div>
                <div className=" flex flex-col border-2 rounded-2xl items-center justify-center w-1000px">
                    <button/>
                    <table className="w-[1000px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px] text-right">ID</TableHead>
                                <TableHead className="text-right">نام کالا</TableHead>
                                <TableHead className="text-right">قیمت</TableHead>
                                <TableHead className="text-right">دسته بندی</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell className="text-right">{product.category}</TableCell>
                                    <TableCell><Button>ویرایش</Button></TableCell>
                                    <TableCell><Button>حذف</Button></TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </table>
                </div>
            </div>
        </>
    )
}