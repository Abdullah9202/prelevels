export default function SearchBar() {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full py-3 pl-6 pr-32 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-500 text-white px-5 py-2 rounded-2xl hover:bg-red-600 focus:outline-none">
                    Search
                </button>
            </div>
        </div>
    );
}
