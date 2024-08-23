import React from 'react';

function App() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Inquiries Section */}
      <div className="bg-[#FFFFFF] shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#032539] text-[#FFFFFF] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Inquiries</h2>
          <div className="w-6 h-6 bg-[#1C768F] rounded-full"></div>
        </div>
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-0 grid grid-cols-5 gap-y-2 text-[#032539]">
              {[20, 15, 10, 5, 0].map((label) => (
                <div key={label} className="flex items-center justify-center">
                  <span className="text-xs">{label}</span>
                </div>
              ))}
            </div>
            <div className="relative bg-[#E0F7FA] border border-[#1C768F] rounded-md">
              <div className="grid grid-rows-5 gap-y-2">
                {[...Array(5).keys()].map((i) => (
                  <div key={i} className="bg-[#E0F7FA] border-t border-[#1C768F]"></div>
                ))}
              </div>
              <div className="flex justify-between text-[#032539] mt-4">
                {['Week #1', 'Week #2', 'Week #3', 'Week #4'].map((label, index) => (
                  <div key={index} className="text-xs">{label}</div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center">
                  {[...Array(7).keys()].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 bg-[#1C768F]" style={{ position: 'absolute', top: `${i * 20}%`, left: `${i * 10}%` }}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#032539] rounded-full"></div>
              <span className="text-sm text-[#032539]">This Month</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-[#FA991C] rounded-full"></div>
              <span className="text-sm text-[#032539]">Last Month</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="bg-[#FFFFFF] shadow-lg rounded-lg overflow-hidden">
        <div className="bg-[#032539] text-[#FFFFFF] p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Reviews</h2>
          <div className="w-6 h-6 bg-[#1C768F] rounded-full"></div>
        </div>
        <div className="p-4 space-y-4">
          {['Claudia Alves', 'Cahaya Dewi', 'Olivia Wilson', 'Yael Amari'].map((author, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-12 h-12">
                <img
                  src={`https://via.placeholder.com/50?text=${author.split(' ')[0][0]}`}
                  alt={author}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-[#032539]">{author}</div>
                <div className="text-[#FA991C] text-sm">★★★★★</div>
                <div className="text-gray-500 text-xs">• {index * 2 + 2} min ago</div>
                <div className="text-gray-700 mt-1">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing"
                </div>
              </div>
            </div>
          ))}
          <div className="text-[#1C768F] flex items-center space-x-2 cursor-pointer">
            <span>See All</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
