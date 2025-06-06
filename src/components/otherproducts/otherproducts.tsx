"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import products from '../../form/product.json';
import React, {useState} from "react";
import Link from "next/link";
import siteConfig from "@/config";
import {Separator} from "@/components/ui/separator";

interface ProductDescription {
    property: string;
    propertydes: string;
}

interface Product {
    id:number
    name: string;
    category: string;
    brand: string;
    amount: number;
    description: ProductDescription[];
    price?: number;
    image: string;
}
const randomizer = (array: Product[])=>{
    for (let i = array.length - 1 ; i > 0 ; i--) {
        const g = Math.floor(Math.random() * (i + 1));
        [array[i] , array[g]] = [array[g] , array[i]]
    }
    return array;
}
const ProductList: React.FC = () => {
    const Randomizedproducts : Product[] = randomizer([...products])
    const productList: Product[] = Randomizedproducts.slice(0,5)
    const [currentPage, setCurrentPage ] = useState<number>(1);
    const itemsPerPage = 5;
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full m-0">
                <div className="flex flex-col items-start w-[80%] mt-10 gap-5">
                    <p className="text-2xl font-bold">دیگر محصولات</p>
                    <Separator/>
                </div>
                <div className="w-[80%] ml-[80px] mt-5">
                </div>
                <div className="flex flex-wrap items-center justify-center pr-4 pl-4 pt-4 m-0 gap-2.5 ">
                    {productList.map((product, index) => {
                        const loadimage = `../../${product.image}`
                        return (
                        <Card className="flex flex-col w-[300px]" key={index}>
                            <CardHeader className="flex flex-col items-center justify-center w-[300px]">
                                <img
                                    src={loadimage}
                                    alt={product.name}
                                    className="flex flex-col items-center justify-center w-[400px] h-[280px]"
                                />
                            </CardHeader>
                            <CardContent className="flex flex-col items-stretch justify-center w-[300px]">
                                <br/>
                                <a>{product.name}</a>
                                <br/>
                                <p className="flex flex-col items-end">{(new Intl.NumberFormat("fa")).format(product.price || 0)} تومان</p>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start">
                                <Link href={siteConfig.ROUTE.shop_detail.href.replace(":id", index + indexOfFirstProduct)}>
                                    <Button variant={"socialT"}>مشاهده جزئیات</Button></Link>
                            </CardFooter>
                        </Card>
                        )})}
                </div>
            </div>
        </>
    );
};

export default ProductList;
