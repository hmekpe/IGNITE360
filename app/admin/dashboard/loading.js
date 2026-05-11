export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6">
      <div className="surface-card p-6">
        <div className="skeleton h-10 w-64" />
        <div className="mt-4 skeleton h-5 w-full" />
        <div className="mt-2 skeleton h-5 w-3/4" />
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="surface-card p-5">
            <div className="skeleton h-4 w-24" />
            <div className="mt-4 skeleton h-10 w-20" />
            <div className="mt-4 skeleton h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
