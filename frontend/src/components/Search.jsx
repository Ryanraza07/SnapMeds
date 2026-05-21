import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom'; // ✅ use react-router-dom
import { TypeAnimation } from 'react-type-animation';

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  return (
    <div className="w-full min-w-[300px] lg:min-w-[550px] h-11 lg:h-12 rounded-lg shadow-md overflow-hidden flex items-center bg-slate-50 border border-gray-300 text-neutral-600 group focus-within:border-green-600">
      
      {/* Search button */}
      <button className="flex justify-center items-center p-3 text-neutral-600 group-focus-within:text-green-600">
        <FaSearch />
      </button>

      {/* Search bar / animation */}
      <div className="flex-1 px-2">
        {!isSearchPage ? (
          // not in search page → show animation
          <div onClick={redirectToSearchPage} className="cursor-text text-gray-500">
            <TypeAnimation
              sequence={[
                'Search "Paracetamol"',
                1000,
                'Search "Diapers"',
                1000,
                'Search "Aspirin"',
                1000,
                'Search "Cough Syrups"',
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // in search page → show input
          <div>
            <input
              type="text"
              placeholder="Search medicines..."
              autoFocus 
              className="w-full outline-none px-2 py-1 bg-slate-50"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
