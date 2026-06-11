-- 주간 리더보드는 로그인 없이도 볼 수 있게 한다.
-- 노출 데이터는 ranking_opt_in 사용자(상위 100명)의 표시명·아바타·토큰 합계뿐이며,
-- 비로그인 호출은 auth.uid()가 null이라 is_viewer/본인 행 포함 로직이 발동하지 않는다.
grant execute on function public.get_weekly_ranking(date) to anon;
