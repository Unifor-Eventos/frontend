import Header from '@/app/(app)/Header'

export const metadata = {
    title: 'Laravel - Dashboard',
}

const Dashboard = () => {
    return (
        <>
            <Header title="Dashboard" />
            <div className="py-8">
                <div className="mx-auto sm:px-2 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="">
                                <div className="mx-auto">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
