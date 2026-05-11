export default function RootLoading() {
  return (
    <div className="section-shell">
      <div className="site-container space-y-6">
        <div className="skeleton h-16 w-40" />
        <div className="skeleton h-56 w-full rounded-[2rem]" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="skeleton h-64 w-full" />
          <div className="skeleton h-64 w-full" />
          <div className="skeleton h-64 w-full" />
        </div>
      </div>
    </div>
  );
}
