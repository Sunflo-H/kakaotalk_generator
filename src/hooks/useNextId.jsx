import React, { useState } from "react";

export default function useNextId(defaultId = 1) {
  const [id, setId] = useState(defaultId);
  const getId = () => {
    setId(id + 1); // 다음에 전달 될 id
    return id; // 현재 id를 반환
  };

  return { id, setId, getId };
}
