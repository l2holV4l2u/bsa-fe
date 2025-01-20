import { useState } from "react";

interface BloodDropProps {
  index: number;
  file: File | null; // Accept a file prop
}

export default function BloodDrop({ index, file }: BloodDropProps) {
  const [properties, setProperties] = useState();
  return (
    <>
      {file ? (
        // Render the uploaded file as an image preview
        <img
          src={URL.createObjectURL(file)} // Convert file to a temporary URL
          alt={`Blood drop ${index}`}
          className="w-24 h-auto rounded-md"
        />
      ) : (
        // Default placeholder if no file is uploaded
        <div className="w-full h-32 bg-gray-700 rounded-md flex items-center justify-center">
          <span className="text-gray-400">No file uploaded</span>
        </div>
      )}
      <p className="text-center text-gray-200">Blood drop {index}</p>
    </>
  );
}
