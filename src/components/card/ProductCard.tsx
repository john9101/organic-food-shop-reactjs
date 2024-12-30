import {Link} from "react-router-dom";
import NextPrevGlide from "@/components/NextPrevGlide.tsx";
import {useEffect, useRef} from "react";
import Glide from "@glidejs/glide";
import {formatCurrency} from "@/util/decoration.util.ts"
import {Badge} from "@/components/ui/badge.tsx";
import {ProductItem} from "@/type/response/productItem.type.ts";

type ProductCardProps = {
    item: ProductItem
    shadow: boolean
}

const ProductCard = ({item, shadow = false}: ProductCardProps) => {
    const productCardGlideRef = useRef<HTMLDivElement>(null);
    const glideInstanceRef = useRef<Glide | null>(null);

    useEffect(() => {
        if (productCardGlideRef.current) {
            glideInstanceRef.current = new Glide(productCardGlideRef.current, {
                perView: 1,
                gap: 0,
                autoplay: 2000,
                hoverpause: false
            });
        }

        setTimeout(() => {
            glideInstanceRef.current?.mount();
        },10)

        return () => {
            glideInstanceRef.current?.destroy();
        };
    }, []);

    return (
        <div className={`group relative bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-green-600 ${shadow ? 'will-change-transform hover:shadow-xl transition-shadow' : ''}`}>
            <div className="relative w-full">
                <div>
                    <div className="relative group glide overflow-hidden" ref={productCardGlideRef}>
                        <div className="glide__track" data-glide-el="track">
                            <ul className="glide__slides">
                                {
                                    item.image_urls.map((imageUrl, index) => (
                                        <li key={index} className="glide__slide">
                                            <Link to={`/products/${item.slug}`} className="block aspect-w-4 aspect-h-3">
                                                <img className="object-fill w-full h-full" src={imageUrl}/>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>

                        {/*<div className="absolute -bottom-4 inset-x-0 h-10 bg-gradient-to-t from-neutral-900"></div>*/}

                        {/*<div className="glide__bullets flex items-center justify-center absolute bottom-2 left-1/2 transform -translate-x-1/2 space-x-1.5" data-glide-el="controls[nav]">*/}
                        {/*    {*/}
                        {/*        item.image_urls.map((_, index) => (*/}
                        {/*            <button key={index} className="glide__bullet my-auto mx-0 w-1.5 h-1.5 rounded-full bg-neutral-300" data-glide-dir={`=${index}`}/>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</div>*/}

                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity flex top-1/2 transform -translate-y-1/2 inset-x-2 justify-between">
                            <NextPrevGlide className="w-full justify-between" navBtnClassName="w-8 h-8 p-1.5"/>
                        </div>
                    </div>
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-black bg-opacity-30 hover:bg-opacity-50 cursor-pointer absolute right-3 top-3 z-[1]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill={"currentColor"}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </div>
                {item.discount_percent_event && <Badge variant="destructive" className="absolute left-3 top-3">Giảm 10%</Badge>}
            </div>
            <Link to={`/products/${item.slug}`}>
                <div className="p-4 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <h2 className="font-bold text-black hover:text-green-600 capitalize text-xl">
                                <span className="line-clamp-1">{item.name}</span>
                            </h2>
                        </div>
                        <div className="flex font-normal items-center text-neutral-500 dark:text-neutral-400 text-base space-x-2">
                            {/*{item.short_description}*/}
                            Lorem ipsum dolor sit amet
                        </div>
                    </div>
                    <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
                    <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-black !tracking-[-0.15rem] space-x-1.5">
                            <span className="text-green-600">
                                {formatCurrency(50000)}
                            </span>
                            <span className="text-base !tracking-[-0.1rem] text-neutral-400 line-through dark:text-neutral-400 font-normal">
                                {formatCurrency(80000)}
                            </span>
                        </div>
                        <div className="flex items-center space-x-0.5 text-base !tracking-[-0.1rem]">
                            <div className="pb-[2px]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     aria-hidden="true" className="w-[18px] h-[18px] text-orange-500">
                                    <path fill-rule="evenodd"
                                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </div>
                            <span className="font-semibold text-black">4.8</span>
                            <span className="text-neutral-500 dark:text-neutral-400">(28)</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard