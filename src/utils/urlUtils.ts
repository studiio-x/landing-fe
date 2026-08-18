// URL 쿼리스트링처럼 신뢰할 수 없는 입력에서 안전한 양의 정수 id만 뽑아낸다.
// 잘못된 값(비숫자, 음수, NaN 등)은 null로 취급해 호출부가 폴백을 쓰도록 한다.
export const parsePositiveIntParam = (value: string | null): number | null => {
  if (!value) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
};
