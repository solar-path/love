import { Link } from "wouter-preact";
import { type ComponentChildren } from "preact";

export default function DocsLayout({
  children,
}: {
  children: ComponentChildren;
}) {
  // Group posts by category based on folder structure
  const postCategories = {
    "Getting Started": [
      { title: "What's New", path: "/whats-new" },
      { title: "Stack & Useful Tools", path: "/stack-usefull" },
    ],
    "Core Features": [
      { title: "Authentication", path: "/authentication" },
      { title: "Business", path: "/business" },
      { title: "Enterprise Risk Management", path: "/erm" },
    ],
    "Project Planning": [{ title: "Milestones", path: "/milestones" }],
  };

  return (
    <div className="flex flex-row">
      <div className="w-1/5 flex flex-col justify-between border-r">
        <nav className="p-4">
          {Object.entries(postCategories).map(([category, posts]) => (
            <div key={category} className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">{category}</h3>
              <ul className="space-y-1">
                {posts.map((post) => (
                  <li key={post.path}>
                    <Link
                      to={`/documentation${post.path}`}
                      className="text-gray-600 hover:text-gray-900 block py-1"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="w-4/5">{children}</div>
    </div>
  );
}
