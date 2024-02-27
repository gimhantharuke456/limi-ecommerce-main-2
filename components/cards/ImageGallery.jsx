import { useState } from "react";

export default function ImageGallery({ images }) {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <img
            key={img}
            src={img}
            alt={`${img}`}
            className="cursor-pointer"
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>

      {selectedImg && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center p-4">
          <img src={selectedImg} alt={selectedImg} />
          <button
            className="absolute top-4 right-4 text-white"
            onClick={() => setSelectedImg(null)}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
