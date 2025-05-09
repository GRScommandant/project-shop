"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import products from '../../form/product.json';
import React, { useState } from "react";
import SearchBar from "@/components/search/searchbar";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface Product {
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
    const [currentPage, setCurrentPage] = useState<number>(1); // State for current page
    const itemsPerPage = 20; // Number of items per page

    const productList: Product[] = products;

    const handleSearch = () => {
        const results = productList.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(results);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Calculate the products to display based on the current page
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    // Calculate total pages
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <>
            <div className="flex flex-col items-center justify-center w-full m-0">
                <div className="w-[80%] ml-[80px] mt-5">
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={handleSearch} />
                </div>
                <div className="flex flex-wrap items-start pr-4 pl-4 pt-4 m-0 gap-2.5 ">
                    {currentProducts.map((product, index) => (
                        <Card className="flex flex-col w-[300px]" key={index}>
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
                                <Button variant={"socialT"}>جزئیات محصول</Button>
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
                                disabled={currentPage === totalPages} // Disable if on the last page
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
};

export default ProductList;
