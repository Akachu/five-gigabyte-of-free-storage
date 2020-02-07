import React, { useState, DragEvent } from "react";

const DragAndDrop: React.FC = props => {
  const dropRef: React.Ref<HTMLDivElement> = React.createRef();

  const [dragging, setDragging] = useState(false);

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragOut = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const reader = new FileReader();

    reader.onload = e => {
      console.log(e);
    };
    reader.readAsDataURL(e.dataTransfer.files[0]);

    

    setDragging(false);
  };

  return (
    <div
      ref={dropRef}
      onDragOver={handleDrag}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      style={
        dragging
          ? {
              border: "1px solid blue"
            }
          : {}
      }
    >
      {props.children}
    </div>
  );
};

export default DragAndDrop;
