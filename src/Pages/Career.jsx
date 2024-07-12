import React from 'react';

const data = [
    {
        id: 1,
        position: "Software Engineer",
        desc: "We're looking for a skilled software engineer to help us build amazing products."
    },
    {
        id: 2,
        position: "Product Manager",
        desc: "Join our team as a product manager to lead the development of innovative solutions."
    },
    {
        id: 3,
        position: "Marketing Specialist",
        desc: "We're seeking a creative marketing specialist to boost our brand awareness and engagement."
    },
];

function Career() {
    return (
        <div className='min-h-screen flex flex-col bg-gradient-to-br from-[#f6d365] to-[#fda085] inter'>
            <main className="container mx-auto px-6 py-16 flex-grow">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800">Join Our Team</h2>
                    <p className="text-gray-800 mt-4">At WriteX, we're always looking for talented and passionate individuals to join our team.</p>
                </div>

                <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((item) => (
                        <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-800">{item.position}</h3>
                            <p className="text-gray-600 mt-4">{item.desc}</p>
                            <a href={`/careers/${item.position.toLowerCase().replace(/\s+/g, '-')}`} className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">Learn More</a>
                        </div>
                    ))}
                </div>
            </main>
            <footer className="bg-gray-800 py-6">
                <div className="container mx-auto px-6 text-center text-white">
                    <p>&copy; 2024 Writex. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Career;
