import products from "../../../form/product.json"
import React from "react";
import {Button} from "@/components/ui/button";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";

interface Product {
    name: string;
    price: number;
    image: string;
    description: Array<{ property: string; propertydes: string }>;
}
export default async function Page({
  params,
                                   }: {
    params: Promise<{ id : string }>
}) {
    const { id } = await params
    const product: Product = products[id];
    const ProductImage = `../../${product.image}`
    return(
        <>
            <div className="flex flex-row items-end w-full gap-2.5 mt-10">
                <div className="flex flex-col items-center justify-center mx-6 border-[0.5px] border-b-gray-300 w-[270px] h-[300px] rounded-3xl ">
                    <img
                        src={ProductImage}
                        alt={product.name}
                        className="flex flex-col items-center justify-center w-[230px] h-[250px]"
                    />
                </div>
                <div className="flex flex-col items-start border-[1px] border-b-gray-300 w-[80%] h-[300px] rounded-3xl" >
                    <div className="flex flex-col py-5 px-5">
                        <div >
                            <p className="text-3xl font-bold">{product.name}</p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div className="flex gap-2.5 ">
                            <p className="text-2xl">تومان</p>
                            <p className="text-3xl font-bold text-green-800">{(new Intl.NumberFormat("fa")).format(product.price || 0)} </p>

                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <Button variant={"socialT"}><p className="fas fa-shopping-cart">افزودن به سبد خرید</p></Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center w-full gap-2.5 mt-20">
               <div className="flex flex-col items-start border-[1px] border-b-gray-300 w-[76%] h-[700px] rounded-3xl py-6 px-6 gap-5">
                    <p className="text-2xl font-bold">مشخصات</p>
                    <br/>
                   {product.description.map((item, index) => (
                       <>
                           <div className="flex flex-row w-full">
                               <div className=" flex items-start w-[40%]"><p className="text-gray-400">{item.property}   :</p></div>
                                <div className=" flex items-end w-[60%]">{item.propertydes}</div>
                           </div>
                           <Separator/>
                       </>
                   ))}
               </div>

            </div>
        </>
    )
}