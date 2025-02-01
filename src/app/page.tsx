import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Link from "next/link"
import ProductCard from "@/components/cardProduct"
import { product } from "./types/product"
import { CarouselWithProducts } from "./types/CarouselWithProducts"
import { Star } from "lucide-react"

async function GetProducts(): Promise<product[]> {
    try {
        const data = await fetch(process.env.URL + "/api/products")
        const products: product[] = await data.json()
        return products
    } catch (error) {
        console.log("a error has ocurred while trying to fetch de products data")
        console.log(error)
        return []
    }
}

const carousels: CarouselWithProducts[] = [
    {
        title: "PROMOTIONS",
        id: 1
    },
    {
        title: "RELEASES",
        id: 2
    }
]

export default async function Home() {

    const products = await GetProducts()

    return (
        <div className="flex flex-col p-0 m-0 w-full">

            <div className="w-full h-[400px] absolute flex mt-14">
                <Image src="https://images.unsplash.com/photo-1491166617655-0723a0999cfc?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmljZXxlbnwwfHwwfHx8MA%3D%3D"
                    fill={true}
                    alt="hahaah">
                </Image >

            </div>
            <div className="flex flex-col z-10 mt-[466px]">
                {carousels.map((carousel) => (
                    <div key={carousel.id} className="w-full mb-8 z-[1]">
                        <div className="m-auto bg-white w-full flex flex-col max-w-7xl mx-auto justify-center z-[1] rounded-lg">
                            <h1 className="flex flex-row w-full font-bold text-lg px-1 mx-0 text-primary rounded p-2 border-l-8 border-primary">
                                <Star fill="hsl(346.8, 77.2%, 49.8%)" className="white mr-2" />
                                {carousel.title}
                            </h1>
                            <Carousel opts={{
                                align: "start",
                                loop: true,
                            }} className="m-auto w-full justify-center h-full">
                                <CarouselContent className="m-auto ml[-4px] py-4">
                                    {products.map((product) => (

                                        <CarouselItem key={product.id} className="sm:basis-1/3 pl-1 md:basis-1/4 lg:basis-1/6 flex justify-center items-center aspect-square rounded-xl">

                                            <ProductCard product={product} productLink={`product/${product.id}`} />

                                        </CarouselItem>

                                    ))}
                                </ CarouselContent>

                                <CarouselNext variant="secondary" className="hidden md:flex" />
                                <CarouselPrevious variant="secondary" className="hidden md:flex" />

                            </Carousel>
                        </div>
                    </div>

                ))}
            </div>


        </div >
    );
}