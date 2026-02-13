import { useEffect, useCallback, RefObject } from "react";

/**
 * 특정 요소 외부 클릭 감지 훅
 * @param ref - 감지할 요소의 ref
 * @param callback - 외부 클릭 시 실행할 함수
 * @param isActive - 이벤트 리스너 활성화 여부 (기본값: true)
 */
const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void,
  isActive: boolean = true
) => {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isActive, handleClickOutside]);
};

export default useClickOutside;
