function SkeletonBlock({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-md border border-border bg-surface-alt ${className}`}
    />
  );
}

export function RouteSkeleton({
  variant = "list",
}: {
  variant?: "list" | "cards" | "article";
}) {
  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex min-h-[72px] w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <SkeletonBlock className="size-[52px] rounded-xl" />
            <SkeletonBlock className="h-6 w-32" />
          </div>
          <div className="flex gap-2">
            <SkeletonBlock className="h-10 w-20" />
            <SkeletonBlock className="h-10 w-20" />
          </div>
          <SkeletonBlock className="hidden h-10 w-28 md:block" />
        </div>
      </header>
      <main
        className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8"
        aria-busy="true"
        aria-label="페이지를 불러오는 중"
      >
        {variant === "cards" ? (
          <div className="space-y-6">
            <SkeletonBlock className="h-40 w-full" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SkeletonBlock className="h-28" />
              <SkeletonBlock className="h-28" />
              <SkeletonBlock className="h-28" />
              <SkeletonBlock className="h-28" />
            </div>
            <SkeletonBlock className="h-64 w-full" />
          </div>
        ) : variant === "article" ? (
          <div className="space-y-6">
            <SkeletonBlock className="h-10 w-1/2" />
            <SkeletonBlock className="h-32 w-full" />
            <SkeletonBlock className="h-32 w-full" />
            <SkeletonBlock className="h-32 w-2/3" />
          </div>
        ) : (
          <div className="space-y-4">
            <SkeletonBlock className="h-10 w-1/3" />
            <SkeletonBlock className="h-20 w-full" />
            <SkeletonBlock className="h-16 w-full" />
            <SkeletonBlock className="h-16 w-full" />
            <SkeletonBlock className="h-16 w-full" />
            <SkeletonBlock className="h-16 w-full" />
          </div>
        )}
      </main>
    </div>
  );
}
