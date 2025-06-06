"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import products from '../../form/product.json';
import React, { useState } from "react";
import SearchBar from "@/components/search/searchbar";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Link from "next/link";
import siteConfig from "@/config";



interface Product {
    id:number;
    name: string;
    category: string;
    brand: string;
    amount: number;
    description: string;
    price?: number;
    image: string;
}
const ProductList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [currentPage, setCurrentPage ] = useState<number>(1);
    const itemsPerPage = 10;

    const productList: Product[] = products;

    const handleSearch = () => {
        const results = productList.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
        setCurrentPage(1);
    };


    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);


    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full m-0">
                <div className="w-[80%] ml-[80px] mt-5">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-1 max-w-7xl ">
                    {currentProducts.map((product, index) => (
                        <Card className="flex flex-col w-full" key={index}>
                            <CardHeader className="flex flex-col items-center justify-center w-[300px]">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="flex flex-col items-center justify-center w-[400px] h-[280px]"
                                />
                            </CardHeader>
                            <CardContent className="flex flex-col items-stretch justify-center w-[300px]">
                                <br />
                                <a>{product.name}</a>
                                <br />
                                <p className="flex flex-col items-end">{(new Intl.NumberFormat("fa")).format(product.price || 0)} تومان</p>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start">
                                <Link href={siteConfig.ROUTE.shop_detail.href.replace(":id" ,  index + indexOfFirstProduct )}> <Button variant={"socialT"}>مشاهده جزئیات</Button></Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1} // Disable if on the first page
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                    active={currentPage === index + 1} // Highlight the active page
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>

                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default ProductList;
