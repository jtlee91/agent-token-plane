alter table if exists public.usage_daily
  drop column if exists reasoning_tokens;

alter table if exists public.usage_sessions
  drop column if exists reasoning_tokens;

alter table if exists public.usage_turns
  drop column if exists reasoning_tokens;
