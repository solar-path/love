import { marked } from "marked";
import { useEffect, useState } from "react";

export default function Docs() {
  const [content, setContent] = useState("");
  const [toc, setToc] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const path =
      window.location.pathname.split("/documentation/")[1] || "whats-new";
    console.log("Current path:", path);

    const loadContent = async () => {
      try {
        console.log(
          "Attempting to fetch:",
          `/app/assets/posts/${path}/${path}.md`
        );
        const response = await fetch(`/app/assets/posts/${path}/${path}.md`);
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(
            `Failed to load markdown: ${response.status} ${response.statusText}`
          );
        }

        const markdown = await response.text();
        console.log("Markdown content:", markdown);

        const content = markdown.replace(/^---[\s\S]*?---/, "").trim();

        const tokens = marked.lexer(content);
        console.log("Marked tokens:", tokens);

        const headings = tokens.filter((token) => token.type === "heading");
        setToc(headings);

        const html = marked.parse(content);
        console.log("Generated HTML:", html);
        setContent(html);
      } catch (error) {
        console.error("Detailed error:", error);
        setError(error.message);
      }
    };

    loadContent();
  }, [window.location.pathname]);

  if (error) {
    return (
      <div className="p-8 text-red-600">
        Error loading documentation: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="w-3/4 p-8 bg-white">
        {error && (
          <div className="p-4 mb-4 text-red-600 bg-red-50 rounded">
            Error: {error}
          </div>
        )}

        {!content && !error && (
          <div className="p-4 bg-gray-50 rounded">Loading...</div>
        )}

        {content && (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
            style={{ minHeight: "200px" }}
          />
        )}
      </div>

      {toc.length > 0 && (
        <div className="w-1/4 p-4">
          <div className="sticky top-4">
            <h3 className="font-semibold mb-2">On this page</h3>
            <ul className="space-y-1">
              {toc.map((heading, index) => (
                <li key={index} className={`pl-${(heading.depth - 1) * 4}`}>
                  <a
                    href={`#${heading.text.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
