import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MainComponent() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchCategory, setSearchCategory] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("https://team-2-ecommerce-website.onrender.com/products");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                console.log("Fetched Products:", data);

                if (Array.isArray(data)) {
                    setProducts(data);
                    setFilteredProducts(data);
                } else {
                    console.error("Unexpected API response format:", data);
                }
            } catch (error) {
                console.error("Fetching products failed:", error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://team-2-ecommerce-website.onrender.com/products/categories");
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

                const data = await response.json();
                console.log("Fetched Categories:", data);

                if (Array.isArray(data)) {
                    setCategories(data);
                } else {
                    console.error("Unexpected category response format:", data);
                }
            } catch (error) {
                console.error("Fetching categories failed:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSearch = async (event) => {
        const query = event.target.value.toLowerCase().trim();
        setSearchQuery(query);

        if (!query) {
            setFilteredProducts(products);
            setSearchCategory(null);
            return;
        }

        try {
            const response = await fetch(`https://team-2-ecommerce-website.onrender.com/products/types?query=${query}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            console.log("Search API Response:", data);

            if (Array.isArray(data) && data.length > 0) {
                const matchingCategory = data.find(cat =>
                    cat.name.toLowerCase().includes(query)
                ) || data[0];

                setSearchCategory(matchingCategory);
                setFilteredProducts(matchingCategory.products);
            } else {
                console.error("Unexpected search response format or no matching category:", data);
                setSearchCategory(null);
                setFilteredProducts([]);
            }
        } catch (error) {
            console.error("Fetching searched products failed:", error);
            setSearchCategory(null);
            setFilteredProducts([]);
        }
    };

    const addToWishlist = (product) => {
        const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isAlreadyInWishlist = storedWishlist.some((item) => item.id === product.id);

        if (!isAlreadyInWishlist) {
            const updatedWishlist = [...storedWishlist, product];
            localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
    };

    const addToCart = (product) => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = storedCart.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            storedCart[productIndex].quantity += 1;
        } else {
            storedCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(storedCart));
    };

    return (
        <>
            <section className="glass-navbar fixed w-full grid sm:grid-cols-2 grid-cols-[auto_auto] items-center p-4 py-6 border-b bg-cyan-900 shadow-lg">
                <div className="flex items-center gap-6">
                    <h1 className="font-bold text-2xl text-white tracking-widest">Primepicks</h1>
                    <div className="relative flex flex-col w-full bg-white rounded-lg border-blue-500 border-2 shadow-md">
                        <div className="flex justify-between items-center p-3 rounded-lg">
                            <input
                                className="outline-none w-full pl-4 text-lg"
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 justify-end text-white text-lg pr-6">
                    <a href="/wishlist" className="hover:text-gray-300 flex items-center gap-1">
                        ❤️ Wishlist
                    </a>
                    <a href="/cart" className="hover:text-gray-300 flex items-center gap-1">
                        🛒 Cart
                    </a>
                </div>
            </section>

            <section className="pt-26 p-4">
                <h1 className="text-lg font-bold py-2">
                    {searchQuery 
                        ? (searchCategory ? searchCategory.name : `Results for "${searchQuery}"`) 
                        : "Best Seller Products"}
                </h1>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((prod) => (
                            <li key={prod.id} className="product-card shadow-lg flex flex-col justify-between rounded-xl overflow-hidden bg-white border border-gray-200">
                                
                                <div className="w-full h-48 overflow-hidden flex items-center justify-center bg-gray-100 rounded-t-lg">
                                    <img
                                        className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                                        src={prod.thumbnail || prod.imageUrl || "https://via.placeholder.com/150"}
                                        alt={prod.title}
                                    />
                                </div>
                                <div className="px-3 py-2">
                                    <h1 className="font-semibold text-lg line-clamp-1">{prod.title}</h1>
                                    <p className="line-clamp-1 text-gray-900 text-sm">{prod.description}</p>
                                    <p className="text-sm underline cursor-pointer">View More</p>
                                </div>
                                <div className="flex justify-between items-center px-3 pb-2">
                                    <h1 className="font-bold text-lg">₹ {prod.price}</h1>
                                    <div className="flex gap-2">
                                        <button 
                                            className="button-upgrade bg-cyan-700 hover:bg-emerald-700 text-white shadow-lg p-2 font-bold rounded-md transition-transform duration-300 hover:scale-105"
                                            onClick={() => addToCart(prod)}
                                        >
                                            <p className="cursor-pointer text-sm">Add To Cart</p>
                                        </button>
                                        <button 
                                            className="button-upgrade bg-pink-600 hover:bg-red-600 text-white shadow-lg p-2 font-bold rounded-md transition-transform duration-300 hover:scale-105"
                                            onClick={() => addToWishlist(prod)}
                                        >
                                            ❤️
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No products found.</p>
                    )}
                </ul>
            </section>

            <section className="p-4">
                <h1 className="text-xl font-bold py-4">Categories</h1>
                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
                    {categories.length > 0 ? (
                        categories.map((cat) => (
                            <li key={cat.id} className="shadow-sm hover:shadow-lg flex flex-col justify-between rounded-lg p-4 hover:bg-stone-400 cursor-pointer transition-all duration-300">
                                <h1 className="font-semibold text-gray-600">{cat.name}</h1>
                            </li>
                        ))
                    ) : (
                        <p>Loading categories...</p>
                    )}
                </ul>
            </section>
        </>
    );
}

export default MainComponent;
