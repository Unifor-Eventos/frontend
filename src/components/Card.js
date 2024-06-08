
const Card = () => (
    <div className="bg-white rounded-lg border p-4">
        <img src="https://placehold.co/300x200/d1d4ff/352cb5.png" alt="Placeholder Image" className="w-full h-48 rounded-md object-cover" />
        <div className="px-1 py-4">
            <div className="font-bold text-xl mb-2">Blog Title</div>
            <p className="text-gray-700 text-base">
                This is a simple blog card example using Tailwind CSS. You can replace this text with your own blog content.
            </p>
        </div>
        <div className="px-1 py-4">
            <a href="#" className="text-blue-500 hover:underline">Read More</a>
        </div>
    </div >
)

export default Card;
