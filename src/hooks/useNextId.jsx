import React, { useState } from "react";

export default function useNextId() {
  const [id, setId] = useState(1);
  const setNextId = () => {
    setId(id + 1);
  };
  return [id, setId, setNextId];
}
