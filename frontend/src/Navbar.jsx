import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="glass-navbar fixed w-full grid sm:grid-cols-2 grid-cols-[auto_auto] items-center p-4 py-6 border-b bg-cyan-900 shadow-lg">
            <div className="flex items-center gap-6">
                <h1 className="font-bold text-2xl text-white tracking-widest">Primepicks</h1>
            </div>
            <div className="flex gap-6 justify-end text-white text-lg pr-6">
                <Link to="/" className="hover:text-gray-300"> Home</Link>
                <Link to="/wishlist" className="hover:text-gray-300">❤️ Wishlist</Link>
                <Link to="/cart" className="hover:text-gray-300">🛒 Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;
