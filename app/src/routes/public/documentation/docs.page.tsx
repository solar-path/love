import { marked } from "marked";
import { useEffect, useState } from "react";

export default function Docs() {
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const path =
      window.location.pathname.split("/documentation/")[1] || "whats-new";

    const loadContent = async () => {
      try {
        const response = await fetch(`/src/assets/posts/${path}/${path}.md`);
        if (!response.ok) {
          throw new Error(
            `Failed to load markdown: ${response.status} ${response.statusText}`
          );
        }

        const markdown = await response.text();
        const content = markdown.replace(/^---[\s\S]*?---/, "").trim();

        // Configure custom renderer
        const renderer = new marked.Renderer();

        // Override heading renderer
        renderer.heading = ({ tokens, depth }) => {
          const text = tokens?.[0]?.type === "text" ? tokens[0].raw : "";
          return `<h${depth}>${text}</h${depth}>`;
        };

        // Use custom renderer
        marked.use({ renderer });

        setContent(await marked.parse(content));
        setError(null); // Reset error state before loading new content
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    loadContent();
  }, [window.location.pathname]);

  return (
    <div className="flex flex-row max-w-8xl mx-auto">
      <div className="w-full min-h-screen bg-white">
        <div className="px-8 py-6">
          {error && (
            <div className="p-4 mb-6 text-red-600 bg-red-50 rounded-lg border border-red-200">
              Error loading documentation: {error}
            </div>
          )}

          {!content && !error && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-pulse text-gray-400">Loading...</div>
            </div>
          )}

          {content && (
            <article className="prose prose-slate max-w-none">
              <div
                dangerouslySetInnerHTML={{ __html: content }}
                className="
                  prose-headings:font-semibold 
                  prose-h1:text-3xl prose-h1:mb-6
                  prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-3
                  prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-2
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:my-2
                  prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                  prose-code:text-sm prose-code:bg-gray-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded
                  prose-pre:bg-gray-50 prose-pre:p-4 prose-pre:rounded-lg
                  prose-ul:my-2 prose-ul:space-y-1
                  prose-li:my-0 prose-li:leading-normal
                  prose-img:rounded-lg
                "
              />
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
