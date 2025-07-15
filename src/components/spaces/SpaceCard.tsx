import { useState } from 'react';  

type Space = {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  image?: string;
};

type SpaceCardProps = {
  space: Space;
};

export default function SpaceCard({ space }: SpaceCardProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* CARD */}
      <div
        className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        {space.image && (
          <div className="h-48 overflow-hidden">
            <img 
              src={space.image} 
              alt={space.name} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{space.name}</h3>
          <p className="text-sm text-gray-500">Capacity: {space.capacity}</p>

          <div className="mt-2">
            <h4 className="text-sm font-medium text-gray-700">Features:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {space.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card click
              setShowModal(true);
            }}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Quick View
          </button>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md shadow-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl z-10 bg-white bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            
            {space.image && (
              <div className="h-48 w-full overflow-hidden">
                <img 
                  src={space.image} 
                  alt={space.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{space.name}</h2>
              <p className="text-gray-600 mb-1">Capacity: {space.capacity}</p>

              <h4 className="text-sm font-semibold mt-3 mb-1">Features:</h4>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {space.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <div className="mt-6 text-right">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-200 text-sm rounded-md hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

