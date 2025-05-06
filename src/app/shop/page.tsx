import ProductBuilder from "@/components/poductshowcase/productbuilder";
export default function Shop () {

return (
    <>
      <div className="flex flex-row w-[100%]">
        <div className="flex flex-col items-end w-[90%]">
            <ProductBuilder/>
        </div>
        <div className="flex flex-col items-start w-[10%]">
            <p>hello</p>
        </div>
      </div>
    </>
)

}
