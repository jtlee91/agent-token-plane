-- 대시보드에 프롬프트(유저 턴) 수를 보여주기 위한 본인 세션 합산 RPC.
-- security invoker라서 usage_sessions의 RLS(본인 행만 조회)가 그대로 적용된다.
create or replace function public.get_turn_totals()
returns table (total_turns bigint, weekly_turns bigint)
language sql
stable
set search_path = ''
as $$
  select
    coalesce(sum(s.user_turn_count), 0) as total_turns,
    coalesce(sum(s.user_turn_count) filter (
      where (s.started_at at time zone 'Asia/Seoul')::date
        >= date_trunc('week', (now() at time zone 'Asia/Seoul')::date)::date
    ), 0) as weekly_turns
  from public.usage_sessions s
  where s.user_id = auth.uid();
$$;

revoke execute on function public.get_turn_totals() from public, anon;
grant execute on function public.get_turn_totals() to authenticated;
