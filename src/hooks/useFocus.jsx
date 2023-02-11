import { useEffect, useRef, useState } from "react";

export default function useFocus(defaultFocused = false) {
  const [isFocused, setIsFocused] = useState(defaultFocused);
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    if (isFocused) {
      ref.current.focus();
    }

    ref.current.addEventListener("focus", onFocus);
    ref.current.addEventListener("blur", onBlur);

    return () => {
      ref.current.removeEventListener("focus", onFocus);
      ref.current.removeEventListener("blur", onBlur);
    };
  }, [isFocused]);

  return { ref, isFocused, setIsFocused };
}
