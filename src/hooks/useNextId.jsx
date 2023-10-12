import React, { useEffect, useState } from "react";

export default function useNextId(defaultId = 1) {
  const [id, setId] = useState(defaultId);

  return { id, setId };
}
