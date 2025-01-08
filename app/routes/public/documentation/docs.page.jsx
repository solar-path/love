import { marked } from "marked";
import { useEffect, useState } from "react";

export default function Docs() {
  const [content, setContent] = useState("");
  const [toc, setToc] = useState([]);

  useEffect(() => {
    // Get the current path to determine which markdown file to load
    const path =
      window.location.pathname.split("/documentation/")[1] || "whats-new";

    // Load and parse the markdown file
    const loadContent = async () => {
      try {
        const response = await fetch(`/posts/${path}.md`);
        const markdown = await response.text();

        // Parse markdown and extract headings for table of contents
        const tokens = marked.lexer(markdown);
        const headings = tokens.filter((token) => token.type === "heading");
        setToc(headings);

        // Convert markdown to HTML
        const html = marked.parse(markdown);
        setContent(html);
      } catch (error) {
        console.error("Error loading documentation:", error);
      }
    };

    loadContent();
  }, []);

  return (
    <div className="flex flex-row">
      <div className="w-3/4 p-8">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

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
    </div>
  );
}
