import React, { useState } from "react";

export default function useNextId(defaultId = 1) {
  const [id, setId] = useState(defaultId);
  const getId = () => {
    setId(id + 1);
    return id;
  };

  return { id, setId, getId };
}
