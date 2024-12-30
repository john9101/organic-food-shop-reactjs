import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowDownRightIcon, TruckIcon, PhoneIcon, ShieldCheckIcon, ReceiptRefundIcon, SparklesIcon, ArrowTrendingUpIcon, ReceiptPercentIcon} from "@heroicons/react/24/outline"
import {formatCurrency} from "@/util/decoration.util.ts";
import {Link} from "react-router-dom";
import {Carousel, CarouselContent, CarouselNext, CarouselPrevious} from "@/components/ui/carousel.tsx";
import {Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import {Fragment} from "react";

const Home = () => {

    return (
        <div className="relative overflow-hidden">
            <div className="container mx-auto relative space-y-6">
                {/*<div className="pt-10 lg:pt-16 lg:pb-16 flex flex-col-reverse lg:flex-col relative">*/}
                {/*<div className="flex flex-col lg:flex-row lg:items-center">*/}
                {/*<div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-8 sm:space-y-10 pb-14 lg:pb-64 xl:pr-14 lg:mr-10 xl:mr-0">*/}
                {/*    <h2 className="font-medium tracking-tighter text-4xl md:text-5xl xl:text-6xl !leading-[124%]">*/}
                {/*        Cung cấp trái cây, rau củ, thịt, trứng và thủy hải sản <span className="font-bold text-green-600">hoàn toàn từ hữu cơ</span>*/}
                {/*    </h2>*/}
                {/*    <span className="text-base md:text-xl text-neutral-500 dark:text-neutral-400">*/}
                {/*        Chào mừng bạn đến cửa hàng <span className="font-bold text-green-600">organicbox</span>, đồng hành cùng chúng tôi bạn sẽ được trải nghiệm, tiếp cận và mua sắm các thực phẩm hữu cơ một cách uy tín, tươi sạch trong lành tốt cho sức khỏe*/}
                {/*    </span>*/}
                {/*    <Button></Button>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}

                <div className="pt-6 lg:pt-8 lg:grid-cols-3 gap-4 grid">
                    <div
                        className="row-span-2 col-span-2 flex items-center pl-8 rounded-xl overflow-hidden bg-[url('public/mainBanner.svg')] bg-no-repeat bg-cover">
                        {/*<img src="public/mainBanner.svg" className="w-full"/>*/}
                        <div className="flex-shrink-0 lg:w-3/5 flex flex-col items-start space-y-6 sm:space-y-8">
                            <h2 className="font-normal text-white text-3xl md:text-4xl xl:text-7xl !leading-[120%] !tracking-[-0.3rem]">
                                <span className="text-green-400 font-bold">Thực phẩm hữu cơ</span> tươi sạch và tốt cho
                                sức khỏe
                            </h2>
                            <div className="border-l-2 border-green-400 pl-2.5 space-y-1.5 text-xl tracking-tighter">
                                <span className="block text-white">Khuyến mãi lên đến<Badge
                                    className="bg-amber-500 text-base ml-2 font-extrabold">30%</Badge></span>
                                <span className="block text-white">Miễn phí vận chuyển cho đơn hàng từ <span
                                    className="ml-1 text-green-400 font-extrabold !tracking-[-0.1rem]">{formatCurrency(1000000)}</span></span>
                            </div>
                            <Button
                                className="bg-white font-bold text-green-400 text-lg border-none outline-none hover:bg-green-400 hover:text-white"><ArrowDownRightIcon/>Mua
                                sắm ngay</Button>
                        </div>
                    </div>
                    <div
                        className="rounded-xl h-96 overflow-hidden flex justify-start items-start pt-8 pl-8 bg-[url('public/extraBannerFirst.svg')] bg-no-repeat bg-cover">
                        <div className="space-y-8">
                            <div className="space-y-1.5">
                                <div className="text-xl">Ưu đãi khai trương</div>
                                <div className="font-bold text-4xl !tracking-[-0.1rem]">Giảm 50%</div>
                                <div className="text-sm text-muted-foreground">(Chỉ áp dụng cho trái cây và rau củ)
                                </div>
                            </div>
                            <Button asChild
                                    className="text-green-400 text-lg font-bold hover:bg-green-400 hover:text-black">
                                <Link to="/any" className="!gap-1"><ArrowDownRightIcon/>Mua sắm ngay</Link>
                            </Button>
                        </div>
                    </div>
                    <div
                        className="rounded-xl h-96 flex items-center text-center px-14 overflow-hidden bg-[url('public/extraBannerSecond.svg')] bg-no-repeat bg-cover">
                        <div className="space-y-8">
                            <div className="space-y-1.5 text-white !tracking-[-0.1rem]">
                                <div className="text-xl">Ưu đãi tốt nhất</div>
                                <div className="font-bold text-4xl leading-snug">Những sản phẩm có giá ưu đãi trong
                                    tháng
                                </div>
                            </div>
                            <Button asChild
                                    className="text-green-400 bg-white text-lg font-bold hover:bg-green-400 hover:text-white">
                                <Link to="/any" className="!gap-1"><ArrowDownRightIcon/>Khám phá ngay</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="grid lg:grid-cols-4 gap-1 rounded-xl p-8 shadow-[0_8px_40px_0_rgba(0,38,3,0.08)]">
                    <div className="flex gap-1 items-center">
                        <TruckIcon className="text-green-600 h-16 w-16"/>
                        <div className="grid gap-1">
                            <h3 className="font-bold text-xl">Miễn phí vận chuyển</h3>
                            <span className="text-base">Áp dụng cho đơn hàng có giá trị lớn</span>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <PhoneIcon className="text-green-600 h-16 w-16"/>
                        <div className="grid gap-1">
                            <h3 className="font-bold text-xl">Tư vấn & hỗ trợ 24h</h3>
                            <span className="text-base">Chăm sóc khách hàng</span>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <ShieldCheckIcon className="text-green-600 h-16 w-16"/>
                        <div className="grid gap-1">
                            <h3 className="font-bold text-xl">100% thực phẩm hữu cơ</h3>
                            <span className="text-base">Chăm sóc khách hàng</span>
                        </div>
                    </div>
                    <div className="flex gap-1 items-center">
                        <ReceiptRefundIcon className="text-green-600 h-16 w-16"/>
                        <div className="grid gap-1">
                            <h3 className="font-bold text-xl">30 ngày hỗ trợ hoàn trả</h3>
                            <span className="text-base">Chăm sóc khách hàng</span>
                        </div>
                    </div>
                </div>

                {/*<div className="relative py-16">*/}
                {/*    <div className="absolute inset-y-0 w-screen xl:max-w-[1340px] 2xl:max-w-screen-2xl left-1/2 transform -translate-x-1/2 xl:rounded-3xl z-0 bg-neutral-100 dark:bg-black dark:bg-opacity-20"></div>*/}
                {/*    <div className="relative">*/}
                {/*<Carousel className="w-full">*/}
                {/*    <CarouselContent>*/}
                {/*        {*/}
                {/*            Array.from({length: 8}).map((_,index)=> (*/}
                {/*                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">*/}
                {/*                    <ProductCard path="product/1"/>*/}
                {/*                </CarouselItem>*/}
                {/*            ))*/}
                {/*        }*/}
                {/*    </CarouselContent>*/}
                {/*</Carousel>*/}
                {/*</div>*/}
                {/*</div>*/}
                <div className="py-12">
                    <TabGroup>
                        <TabList className="flex gap-4">
                            <Tab as={Fragment}>
                                <Button
                                    className="rounded-full py-3 px-4 text-base font-semibold text-white data-[selected]:bg-blue-500 data-[selected]:font-bold focus-without-ring hover:border-none"><SparklesIcon/>Sản
                                    phẩm mới</Button>
                            </Tab>
                            <Tab as={Fragment}>
                                <Button
                                    className="rounded-full py-3 px-4 text-base font-semibold text-white data-[selected]:bg-amber-500 data-[selected]:font-bold focus-without-ring hover:border-none"><ArrowTrendingUpIcon/> Sản
                                    phẩm bán chạy</Button>
                            </Tab>
                            <Tab as={Fragment}>
                                <Button
                                    className="rounded-full py-3 px-4 text-base font-semibold text-white data-[selected]:bg-red-500 data-[selected]:font-bold focus-without-ring hover:border-none"><ReceiptPercentIcon/>Sản
                                    phẩm giảm giá</Button>

                            </Tab>
                        </TabList>
                        <TabPanels className="mt-4">
                            <TabPanel>
                                <Carousel opts={{align: "start"}} className="w-full">
                                    <CarouselContent>
                                        {/*{Array.from({length: 8}).map((_, index) => (*/}
                                        {/*    <CarouselItem key={index}*/}
                                        {/*                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">*/}
                                        {/*        <ProductCard path={`product/${index}`}/>*/}
                                        {/*    </CarouselItem>*/}
                                        {/*))}*/}
                                    </CarouselContent>
                                    <CarouselPrevious className="hover:border-black"/>
                                    <CarouselNext className="hover:border-black"/>
                                </Carousel>
                            </TabPanel>
                            <TabPanel>
                                <Carousel opts={{align: "start"}} className="w-full">
                                    <CarouselContent>
                                        {/*{Array.from({length: 8}).map((_, index) => (*/}
                                        {/*    <CarouselItem key={index}*/}
                                        {/*                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">*/}
                                        {/*        <ProductCard path={`product/${index}`}/>*/}
                                        {/*    </CarouselItem>*/}
                                        {/*))}*/}
                                    </CarouselContent>
                                    <CarouselPrevious/>
                                    <CarouselNext/>
                                </Carousel>
                            </TabPanel>
                            <TabPanel>
                                <Carousel opts={{align: "start"}} className="w-full">
                                    <CarouselContent>
                                        {/*{Array.from({length: 8}).map((_, index) => (*/}
                                        {/*    <CarouselItem key={index}*/}
                                        {/*                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">*/}
                                        {/*        <ProductCard path={`product/${index}`}/>*/}
                                        {/*    </CarouselItem>*/}
                                        {/*))}*/}
                                    </CarouselContent>
                                    <CarouselPrevious/>
                                    <CarouselNext/>
                                </Carousel>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </div>
    )
}

export default Home