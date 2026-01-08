// 모바일 기기 감지 유틸리티

export const isMobile = () => {
  // 1. 화면 크기 체크 (768px 이하)
  const isSmallScreen = window.innerWidth <= 768

  // 2. User Agent 체크
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  const isMobileUA = mobileRegex.test(userAgent)

  // 3. Touch 이벤트 지원 여부
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // 4. 모바일 전용: 화면이 작고 (터치 또는 모바일 UA)
  return isSmallScreen && (isTouchDevice || isMobileUA)
}

export const isTablet = () => {
  const width = window.innerWidth
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  const isIPad = /iPad/i.test(userAgent)
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0

  // 태블릿: 768px ~ 1024px 사이의 터치 기기
  return (width > 768 && width <= 1024 && isTouchDevice) || isIPad
}

export const isDesktop = () => {
  return !isMobile() && !isTablet()
}

export const getDeviceType = () => {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}
