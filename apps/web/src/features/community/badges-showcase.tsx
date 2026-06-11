"use client";

import Image from "next/image";
import { useState } from "react";

import type { BadgeDefinition } from "@/lib/data/models";

// 모바일 전용 트로피 진열장 — 3열 아이콘 그리드에서 배지를 탭하면 아래 상세 패널이 전환된다
export function BadgesShowcase({ badges }: { badges: BadgeDefinition[] }) {
  const [selectedKey, setSelectedKey] = useState(badges[0]?.key ?? null);
  const selected = badges.find((badge) => badge.key === selectedKey) ?? null;
  const selectedEarned = Boolean(selected?.earnedAt);

  return (
    <section className="rounded-lg border border-border bg-surface sm:hidden">
      <div className="grid grid-cols-3 gap-x-2 gap-y-4 p-4" role="tablist">
        {badges.map((badge) => {
          const earned = Boolean(badge.earnedAt);
          const active = badge.key === selectedKey;

          return (
            <button
              key={badge.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setSelectedKey(badge.key)}
              className="grid justify-items-center gap-1.5"
            >
              <span
                className={[
                  "grid size-[58px] place-items-center overflow-hidden rounded-full",
                  earned
                    ? "bg-white shadow-[0_8px_18px_rgba(29,45,37,0.14)]"
                    : "bg-[#f4f7f5]",
                  active ? "outline outline-[3px] outline-token-green/40" : "",
                ].join(" ")}
              >
                <Image
                  src={badge.iconPath}
                  alt=""
                  width={58}
                  height={58}
                  className={
                    earned
                      ? "size-full object-cover"
                      : "size-full object-cover opacity-55 grayscale"
                  }
                />
              </span>
              <span
                className={
                  earned
                    ? "text-[11px] font-extrabold leading-tight"
                    : "text-[11px] font-extrabold leading-tight text-muted"
                }
              >
                {badge.name}
              </span>
            </button>
          );
        })}
      </div>

      {selected ? (
        <div
          className={[
            "mx-4 mb-4 rounded-lg border p-3.5",
            selectedEarned
              ? "border-badge-gold/40 bg-gradient-to-r from-badge-gold/10 to-white"
              : "border-border bg-background",
          ].join(" ")}
        >
          <div className="flex items-center gap-2.5">
            <p className="min-w-0 flex-1 truncate text-[15px] font-black">
              {selected.name}
            </p>
            <span
              className={
                selectedEarned
                  ? "shrink-0 rounded-full border border-badge-gold/30 bg-[#fff0c2] px-3 py-1 text-xs font-extrabold text-[#9a6400]"
                  : "shrink-0 rounded-full border border-border bg-surface px-3 py-1 text-xs font-extrabold text-muted"
              }
            >
              {selectedEarned ? "✓ 획득" : "🔒 잠김"}
            </span>
          </div>
          <p className="mt-2 text-xs font-semibold leading-5 text-muted">
            {selected.description}
          </p>
          <p
            className={
              selectedEarned
                ? "mt-2 rounded-md bg-token-green/10 px-2.5 py-2 text-[13px] font-extrabold leading-5"
                : "mt-2 rounded-md bg-surface px-2.5 py-2 text-[13px] font-extrabold leading-5 text-muted"
            }
          >
            {selected.progress}
          </p>
          {selected.earnedAt ? (
            <p className="mt-2 text-xs font-semibold text-muted">
              {selected.earnedAt} 획득
            </p>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
