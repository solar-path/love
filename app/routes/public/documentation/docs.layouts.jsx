export default function DocsLayout({ children }) {
  return (
    <div className="flex flex-row">
      <div className="w-1/5 flex flex-col justify-between">
        <div className="p-4 ">posts</div>
      </div>

      <div className="w-4/5">{children}</div>
    </div>
  );
}
