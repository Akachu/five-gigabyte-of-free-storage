import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { setItem } from "../modules/files";

export default function useItemList() {
  const itemList = useSelector((state: RootState) => state.items.list);
  const dispatch = useDispatch();

  const onItemSet = useCallback(
    (itemList: Array<number>) => dispatch(setItem(itemList)),
    [dispatch]
  );

  return [itemList, onItemSet];
}
