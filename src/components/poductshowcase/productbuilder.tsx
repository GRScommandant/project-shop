import {Card, CardContent, CardDescription, CardFooter,CardHeader, CardTitle,} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import products from '../../form/product.json'
import react from "react";

interface product {
    name : string,
    category : string,
    brand : string,
    amount : number,
    description: string,
    image: string,
}
    const ProductList : react.FC = () => {
    const productList : product [] = products
        return (
            <>
           <div className="flex flex-col items-center justify-center w-[100%] m-0">
                <div className="flex flex-wrap items-start pr-4 pl-4 pt-4 m-0 gap-2.5 ">
                    {productList.map((product , index) => (
                        <>
                            <Card className="flex flex-col w-[300px] ">
                                <CardHeader className="flex flex-col items-center justify-center w-[300px]" key={index}>
                                    <img src={product.image} alt={product.name} className="flex flex-col items-center justify-center w-[400px] h-[280px]"/>
                                </CardHeader>
                                <CardContent className="flex flex-col items-start justify-center w-[300px]">
                                    <br/>
                                    <a>{product.name}</a>
                                </CardContent>
                                <CardFooter className="flex flex-col items-start">
                                    <Button  variant={"socialT"}>جزئیات محصول</Button>
                                </CardFooter>
                            </Card>
                        </>
                    ))}
                </div>
           </div>
            </>
        )

    }


export default ProductList