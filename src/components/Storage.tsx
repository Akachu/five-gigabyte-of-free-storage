import React, { 
  useEffect, 
  // useState 
} from "react";
// import FirebaseApp from "../FirebaseApp";
// import { LinearProgress } from "@material-ui/core";
// import { Transition } from "react-transition-group";
// import DragAndDrop from "./DragAndDrop";
import useItemList from "../hooks/useFiles";
import File from "./File";

// const transitionStyles: any = {
//   entering: { opacity: 1 },
//   entered: { opacity: 1 },
//   exiting: { opacity: 1 },
//   exited: { opacity: 0 }
// };

const Storage: React.FC = () => {
  const { fileList, folderList, setRef, ref } = useItemList();

  useEffect(() => {
    setRef(ref);
  }, []);

  return (
    <div>
      {/* <Transition in={fileList === null} timeout={300}>
        {state => (
          <LinearProgress
            variant="determinate"
            value={fileList === null ? 0 : 100}
            style={{
              transition: "0.3s ease-in-out",
              ...transitionStyles[state]
            }}
          />
        )}
      </Transition> */}

      {ref.parent && (
        <File isToParent={true} isFolder={true} fileRef={ref.parent} />
      )}

      {folderList.map((folder, i) => (
        <File isFolder={true} key={i} fileRef={folder} />
      ))}

      {fileList?.map((file, i) => (
        <File key={i} fileRef={file} />
      ))}

      {/* <button
        onClick={() => {
          setRef(ref);
        }}
      >
        refresh
      </button> */}
      {/*
      <DragAndDrop>
        <DragAndDrop>1</DragAndDrop>
        <DragAndDrop>2</DragAndDrop>
        <DragAndDrop>3</DragAndDrop>
      </DragAndDrop> */}
    </div>
  );
};

export default Storage;
