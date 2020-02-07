import React, { useEffect, useState } from "react";
import FirebaseApp from "../FirebaseApp";
import { LinearProgress } from "@material-ui/core";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import DragAndDrop from "./DragAndDrop";
import useItemList from "../hooks/useItemList";

const transitionStyles: any = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
};

const Storage: React.FC = () => {
  const str = FirebaseApp.storage();
  const ref = str.ref();
  const [load, setLoad] = useState(0);

  const [itemList, setItemList] = useItemList();

  const [fileList, setFileList] = useState<firebase.storage.Reference[] | null>(
    null
  );

  useEffect(() => {
    ref.list().then(result => {
      setFileList(result.items);
    });
  }, []);

  return (
    <div>
      <Transition in={fileList === null} timeout={300}>
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
      </Transition>
      {fileList?.map(file => {
        console.log(file);
        file.getMetadata().then(console.log);
        return file.name;
      })}
      {fileList?.toString()}
      <DragAndDrop>
        {" 와! "}
        <DragAndDrop>1</DragAndDrop>
        <DragAndDrop>2</DragAndDrop>
        <DragAndDrop>3</DragAndDrop>
      </DragAndDrop>
    </div>
  );
};

export default Storage;
