import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setWishlist(JSON.parse(localStorage.getItem("wishlist")) || []);
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    const removeFromWishlist = (productId) => {
        const updatedWishlist = wishlist.filter((item) => item.id !== productId);
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    };

    const addToCart = (product) => {
        let updatedCart = [...cart];
        const existingItem = updatedCart.find((item) => item.id === product.id);

        if (existingItem) {
            updatedCart = updatedCart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <section className="p-6">
            <h1 className="text-2xl mt-16 font-bold mb-6 text-gray-800 text-center">❤️ My Wishlist ❤️ </h1>

            {wishlist.length > 0 ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {wishlist.map((prod) => (
                        <li key={prod.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition hover:shadow-lg">
                            {/* Clickable Image */}
                            <Link to={`/product/${prod.id}`}>
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center cursor-pointer">
                                    <img
                                        className="w-32 h-32 object-contain"
                                        src={prod.thumbnail || prod.imageUrl || "https://via.placeholder.com/150"}
                                        alt={prod.title || "Product Image"}
                                    />
                                </div>
                            </Link>

                            {/* Product Details */}
                            <div className="p-3">
                                <Link to={`/product/${prod.id}`}>
                                    <h2 className="text-sm font-semibold text-gray-900 line-clamp-1 hover:underline cursor-pointer">
                                        {prod.title}
                                    </h2>
                                </Link>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{prod.description}</p>
                                <p className="text-sm font-bold text-gray-800 mt-1">₹{prod.price}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="p-3 flex justify-between items-center border-t border-gray-200">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 text-xs rounded font-medium hover:bg-blue-600 transition"
                                    onClick={() => addToCart(prod)}
                                >
                                    🛒 Add to Cart
                                </button>
                                <button
                                    className="bg-red-500 text-white px-3 py-1 text-xs rounded font-medium hover:bg-red-600 transition"
                                    onClick={() => removeFromWishlist(prod.id)}
                                >
                                    ❌ Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-700 text-lg text-center">No items in your wishlist yet.</p>
            )}
        </section>
    );
}

export default Wishlist;
