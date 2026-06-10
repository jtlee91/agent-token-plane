// 아바타 URL은 사용자 입력 경로(user_metadata, profiles)를 거치므로
// 저장할 때와 표시할 때 모두 이 검증을 통과한 값만 사용한다
export function trustedAvatarUrl(value: string | null | undefined) {
  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());
    const isGoogleHost =
      url.hostname === "googleusercontent.com" ||
      url.hostname.endsWith(".googleusercontent.com");

    return url.protocol === "https:" && isGoogleHost ? url.toString() : null;
  } catch {
    return null;
  }
}
