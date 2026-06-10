-- 올빼미/얼리버드 설명을 조건 나열식에서 자연스러운 문장으로 바꾼다
update public.badges
set description = '세션 5개 중 1개 이상을 밤 9시~새벽 5시에 시작했어요. (세션 50개부터 집계)'
where badge_key = 'night-owl';

update public.badges
set description = '세션 5개 중 1개 이상을 아침 7시~10시에 시작했어요. (세션 50개부터 집계)'
where badge_key = 'early-bird';
