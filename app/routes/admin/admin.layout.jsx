export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-row">
      <div className="w-1/4">
        <h1>Admin</h1>
      </div>
      <div className="w-3/4">{children}</div>
    </div>
  );
}
