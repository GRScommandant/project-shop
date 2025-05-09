"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import magnifier from "../../../public/assets/pic/search.png"; // Adjust the path as needed
import React from "react";

interface SearchbarProps {
    searchQuery : string;
    setSearchQuery : (query : string) => void
    onSearch: () => void;
}
const SearchBar : React.FC<SearchbarProps> = ({searchQuery , setSearchQuery , onSearch}) => {
    const [inputValue , setInputValue] = useState<string>("")
    const handleSearch = () => {
        setInputValue(inputValue);
        onSearch();
    }

    return (
        <div className="flex flex-row items-start w-full h-full gap-2.5 p-2">
            <Input
                placeholder="جست و جو"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="socialT" onClick={handleSearch}>
                <img src={magnifier.src} alt="جست و جو" className="h-5 w-6" />
            </Button>
        </div>
    );
}
export default SearchBar;