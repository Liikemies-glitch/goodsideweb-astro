import { useState } from "react";
import { GripVertical } from "lucide-react";

interface ImageCompareSliderProps {
  image1Src: string;
  image1Alt: string;
  image2Src: string;
  image2Alt: string;
}

export const ImageCompareSlider = ({
  image1Src,
  image1Alt,
  image2Src,
  image2Alt,
}: ImageCompareSliderProps) => {
  const [inset, setInset] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMove = (clientX: number, currentTarget: EventTarget & Element) => {
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setInset(percentage);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.currentTarget);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    handleMove(e.touches[0].clientX, e.currentTarget);
  };

  const startDragging = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    // Call initial move to set position immediately on click/touch
    if ("touches" in e && e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.currentTarget);
    } else if ("clientX" in e) {
        handleMove(e.clientX, e.currentTarget);
    }
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full aspect-video overflow-hidden rounded-lg select-none border border-border/50 shadow-sm" // Added border, shadow, rounded-lg
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging} // Stop dragging if mouse leaves the container
      onTouchMove={onTouchMove}
      onTouchEnd={stopDragging}
    >
      {/* Image 2 (Bottom layer) */}
      <img
        src={image2Src}
        alt={image2Alt}
        draggable="false" // Prevent default image drag
        className="absolute left-0 top-0 w-full h-full object-cover aspect-video select-none"
      />
      {/* Image 1 (Top layer, clipped) */}
      <img
        src={image1Src}
        alt={image1Alt}
        draggable="false" // Prevent default image drag
        className="absolute left-0 top-0 z-10 w-full h-full object-cover aspect-video select-none"
        style={{
          clipPath: `inset(0 ${100 - inset}% 0 0)`, // Use inset to clip from the right
        }}
      />
      {/* Divider Line */}
      <div
        className="absolute top-0 z-20 h-full w-1 bg-primary cursor-ew-resize" // Use theme primary color
        style={{
          left: `calc(${inset}% - 2px)`, // Center the 1px line on the handle position
        }}
      >
        {/* Handle */}
        <button
          className="absolute top-1/2 z-30 -ml-4 flex h-10 w-8 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-md border border-border bg-background/80 backdrop-blur-sm text-primary shadow-md transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background" // Adjusted styling for better visibility and theme consistency
          onTouchStart={startDragging}
          onMouseDown={startDragging}
        >
          <GripVertical className="h-5 w-5 select-none" />
        </button>
      </div>
    </div>
  );
};

export default ImageCompareSlider; 