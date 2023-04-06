import React, { useCallback, useContext } from "react";
import { TalkContext } from "../context/TalkContext";

/**
 *
 * @param {<ul>} dropableSpace
 * <ul>을 전달인자로 받아 <li>들의 드래그 앤 드롭을 실행하는 hook
 */
export default function useDragAndDrop(dropableSpace) {
  const { setMessagesPositionToTalkList } = useContext(TalkContext);
  let currentItem = null;
  let currentItemIndex = null;

  const handleDragStart = useCallback((e) => {
    currentItem = e.target;

    // nodeList를 배열화
    const nodeListToArr = [...currentItem.parentElement.children];
    currentItemIndex = nodeListToArr.indexOf(currentItem);
  });

  /**
   * Over 중인 곳의 parentElement가 dropableSpace면 Drop을 허용하는 함수
   */
  const handleDragOver = useCallback((e) => {
    const overItem = e.target;

    // Over 중인 곳의 parentElement를 확인하여 dropableSpace와 같다면 Drop을 허용한다.
    if (
      overItem.parentElement === dropableSpace ||
      overItem.parentElement.parentElement === dropableSpace
    )
      e.preventDefault(); // Drop을 허용한다.
  });

  const handleDrop = useCallback((e) => {
    // Drop 되는 위치는 <li>여야 한다. 따라서 부모가 dropableSpace인지 체크한다.
    // 만약 위치가 <li>안의 <div>라면 <li>로 값을 바꾼다.
    const dropPosition =
      e.target.parentElement.parentElement === dropableSpace
        ? e.target.parentElement
        : e.target;

    changeMessagesPosition(dropPosition);
    setMessagesPositionToTalkList(dropableSpace); // drag and drop으로 바뀐 위치정보를 talkList에 저장한다.
  });

  /**
   * Drop할 위치의 index와 Drop된 element의 index를 비교하여 위치를 바꾼다.
   */
  const changeMessagesPosition = useCallback((dropPosition) => {
    const nodeListToArr = [...currentItem.parentElement.children];
    const dropPositionIndex = nodeListToArr.indexOf(dropPosition); // Drop 할 위치가 원래위치면 -1을 반환, 아니면 해당 index를 반환

    if (dropPositionIndex === -1) return;

    currentItemIndex < dropPositionIndex
      ? dropPosition.after(currentItem) // 아래쪽으로 이동하는 경우
      : dropPosition.before(currentItem); // 위쪽으로 이동하는 경우
  });

  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}
