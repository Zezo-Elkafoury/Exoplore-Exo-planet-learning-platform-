import React from 'react';

const GravityGame = () => {
  return (
    <div className="flex justify-center items-center bg-black min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-[800px] mx-auto px-4">
        <div className="relative w-full pb-[75%]">
          <iframe
            src="https://scratch.mit.edu/projects/1081808751/embed"
            className="absolute top-0 left-0 w-full h-full"
            allowTransparency="true"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
};

export default GravityGame;