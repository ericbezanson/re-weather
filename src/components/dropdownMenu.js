import React, { useState } from 'react';

const DropdownMenu = ({ inputValue, setInputValue, onSubmit, useImperial, setUseImperial }) => {
    const [showMenu, setShowMenu] = useState(false);


    const handleToggleChange = () => {
        setUseImperial(!useImperial);
    };


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          onSubmit(inputValue);
          setShowMenu(false); // Close menu if needed
        }
      };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setShowMenu(!showMenu)}
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-cyan-950 hover:bg-cyan-700 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
                >
                    Menu
                </button>
            </div>

            {showMenu && (
                <div className="absolute right-0 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-60">
                    <div className="px-4 py-3">
                        <label htmlFor="input" className="block text-sm font-medium text-gray-700">
                            Search
                        </label>
                        <input
                            id="input"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                        />
                    </div>

                    <div className="px-4 py-2">
                        <label htmlFor="toggle1" className="flex items-center space-x-4 text-sm font-medium text-gray-700">
                            <span>Use Imperial</span>
                            <input
                            id="toggle1"
                            type="checkbox"
                            checked={useImperial}
                            onChange={handleToggleChange}
                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                        </label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DropdownMenu;