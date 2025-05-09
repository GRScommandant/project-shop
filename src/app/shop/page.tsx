import ProductBuilder from "@/components/poductshowcase/productbuilder";
import Searchfilters from "@/components/filterss/searchfilters";
import {Separator} from "@/components/ui/separator";

export default function Shop() {
    return (
        <>
            <div className="flex flex-row-reverse w-full">
                <div className="flex flex-col items-end w-[85%] ">
                    <ProductBuilder />
                </div>
                <div className="flex flex-col items-start w-[15%] mt-3">
                    <div className="flex flex-col items-center justify-center w-full">
                        <Separator className="my-1"/>
                    </div>
                    <Searchfilters />
                </div>
            </div>
        </>
    );
}
