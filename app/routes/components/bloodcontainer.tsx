import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Dispatch, SetStateAction, useState } from "react";
import BloodDrop from "./blooddrop";
import { HiOutlinePlus } from "react-icons/hi";

export default function BloodContainer({
  focusBlood,
  setFocusBlood,
}: {
  focusBlood: number | null;
  setFocusBlood: Dispatch<SetStateAction<number | null>>;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeID, setActiveID] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // Handle drag and drop logic here if needed
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFiles([...files, uploadedFile]); // Add the uploaded file to the list
    }
  };

  return (
    <div className="rounded-lg col-span-1 w-full p-4 border-2 border-border text-gray-200">
      {/* Add File Button */}
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 p-2 text-sm bg-gray-800 text-gray-200 rounded-md cursor-pointer hover:bg-gray-700"
        >
          <HiOutlinePlus scale={24} />
          Add blood drop
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Drag and Drop Context */}
      <DndContext
        onDragStart={(event) => {
          setActiveID(event.active.id as string);
          setIsDragging(true);
        }}
        onDragEnd={(event) => {
          setIsDragging(false);
          setActiveID(null);
          handleDragEnd(event);
        }}
      >
        {/* Render Uploaded Files as BloodDrop Components */}
        {files.map((file, index) => (
          <button
            onClick={() => setFocusBlood(index)}
            className="border-2 border-border p-2 rounded-lg flex items-start justify-start gap-2"
          >
            <BloodDrop key={index} index={index} file={file} />
          </button>
        ))}
      </DndContext>
    </div>
  );
}
