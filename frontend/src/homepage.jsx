import { useEffect, useState } from "react";

function MainComponent() {

    const [products, setProducts] = useState([]);
    const [category , setCategory] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products)
                console.log(data);
            } catch (error) {
                console.log("fetching Failed  :", error);
            }
        }
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                const data = await response.json();
                setCategory(data)
                console.log("Hello",data);
            } catch (error) {
                console.log("fetching Failed  :", error);
            }
        }
        fetchData();
    }, [])


    return (
        <>
            <section>
                <section className="globalNavbar fixed w-full grid sm:grid-cols-2  grid-cols-[auto_auto] items-center p-2 py-6 border-b-gray-300 border-b bg-cyan-800">
                    <div className="flex items-center gap-6">
                        <div>
                            <h1 className="font-bold text-xl text-white">Primepicks</h1>
                        </div>
                        <div className="relative flex flex-col w-full bg-white rounded-lg border-b-blue-900 border-2">
                            <div className="flex justify-between items-center p-2 rounded-lg border-b-blue-400 shadow-lg w-full">
                                <input
                                    className="outline-none w-full pl-4 z-20"
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="Search ..." />
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6 text-blue-400 z-20">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex gap-4 ml-auto cursor-pointer">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            <div className="absolute -top-5 left-3 bg-blue-400 text-white rounded-full px-2 font-bold">
                                <p>{0}</p>
                            </div>
                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                            </svg>

                        </div>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </div>
                    </div>
                </section>
                <section className="pt-26">
                    <div className="p-4">
                    <h1 className="text-lg font-bold py-2">Best Seller Products </h1>
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {products.map((prod) => (
                            <li key={prod.Product_id} className="shadow-lg flex flex-col justify-between rounded-lg md:h-90 ">
                                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 rounded-t-lg ">
                                    <img
                                        className="w-full h-full object-contain"
                                        src={prod.thumbnail}
                                        alt={prod.title}
                                    />
                                </div>
                                <div className="px-2">
                                    <h1 className="font-semibold line-clamp-1">{prod.title}</h1>
                                    <p className="line-clamp-1 text-gray-900 text-sm">{prod.description}</p>
                                    <p className="text-sm underline cursor-pointer">View More</p>
                                </div>
                                <div className="flex justify-between items-center px-2 pb-1">
                                <h1 className="font-bold">₹ {prod.price}</h1>
                                <button className="flex gap-2 bg-cyan-700 hover:bg-emerald-700 text-white shadow-lg justify-center items-center p-2 font-bold cursor-pointer rounded-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                        </svg>
                                    <p className="cursor-pointer text-sm">Add To Cart</p>
                                </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    </div>
                </section>

                <section className="p-4">
                    <h1 className="text-xl font-bold py-4">Categories</h1>
                    <div>
                    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                        {category.map((prod) => (
                            <li key={prod.slug} className="shadow-sm hover:shadow-lg flex flex-col justify-between rounded-lg p-4 hover:bg-stone-400  cursor-pointer ">
                                <div className="px-2">
                                    <h1 className="font-semibold line-clamp-1 text-gray-600" >{prod.name}</h1>
                                </div>
                            </li>
                        ))}
                    </ul>

                    </div>
                </section>
            </section>
        </>
    )
}

export default MainComponent;
