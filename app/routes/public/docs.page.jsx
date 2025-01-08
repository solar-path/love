// import { List } from "flowbite-react";
// import { useState, useEffect, useCallback } from "react";
// import ReactMarkdown from "react-markdown";
// import { useSearchParams } from "react-router";
// import remarkGfm from "remark-gfm";

// // Add this interface for the frontmatter
// interface Frontmatter {
//   title: string;
//   description: string;
//   author: string;
//   date: string;
// }

// // Add this interface for the table of contents
// interface TocItem {
//   id: string;
//   text: string;
//   level: number;
// }

// const posts = [
//   { title: "Authentication", path: "authentication.md" },
//   { title: "Business", path: "business.md" },
//   { title: "Enterprise Risk Management", path: "erm.md" },
//   { title: "What's new", path: "whats-new.md" },
//   { title: "Milestones", path: "milestones.md" },
//   { title: "Usefull stack", path: "stack-usefull.md" },
// ];

export default function Docs() {
  return <div>Docs</div>;
}

// export default function Docs() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const [content, setContent] = useState<string | null>(null);
//   const [frontmatter, setFrontmatter] = useState<Frontmatter | null>(null);
//   const [toc, setToc] = useState<TocItem[]>([]);
//   const selectedPost = searchParams.get("post");

//   // Function to extract frontmatter and content
//   const processMdContent = (text: string) => {
//     const matches = text.match(/^---([\s\S]*?)---\n([\s\S]*)$/);
//     if (!matches) return { content: text };

//     const [, frontmatterStr, content] = matches;
//     const frontmatter = frontmatterStr.split("\n").reduce((acc, line) => {
//       const [key, ...value] = line.split(":");
//       if (key && value.length) {
//         acc[key.trim()] = value.join(":").trim();
//       }
//       return acc;
//     }, {} as Record<string, string>);

//     return { frontmatter, content };
//   };

//   useEffect(() => {
//     const fetchContent = async () => {
//       if (!selectedPost) {
//         setContent(null);
//         setFrontmatter(null);
//         setToc([]);
//         return;
//       }

//       try {
//         const response = await fetch(`/posts/${selectedPost}`);
//         if (!response.ok) throw new Error("Failed to fetch content");
//         const text = await response.text();
//         const { frontmatter, content } = processMdContent(text);
//         setFrontmatter(frontmatter as unknown as Frontmatter);
//         setContent(content);

//         // Extract headers for TOC
//         const tocItems: TocItem[] = [];
//         const lines = content.split("\n");
//         lines.forEach((line) => {
//           const match = line.match(/^(#{1,3})\s+(.*)/);
//           if (match) {
//             const [, hashes, text] = match;
//             const level = hashes.length;
//             const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
//             tocItems.push({ id, text, level });
//           }
//         });
//         setToc(tocItems);
//       } catch (error) {
//         console.error("Error loading markdown:", error);
//         setContent(null);
//       }
//     };

//     fetchContent();
//   }, [selectedPost]);

//   // Function to generate ID for headers
//   const generateId = useCallback((text: string) => {
//     return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
//   }, []);

//   // Custom components for ReactMarkdown
//   const components = {
//     h1: ({ children }: { children: React.ReactNode }) => {
//       const id = generateId(children as string);
//       return (
//         <h1 id={id} className="text-4xl font-bold mb-4 text-gray-900">
//           {children}
//         </h1>
//       );
//     },
//     h2: ({ children }: { children: React.ReactNode }) => {
//       const id = generateId(children as string);
//       return (
//         <h2 id={id} className="text-3xl font-semibold mt-8 mb-4 text-gray-800">
//           {children}
//         </h2>
//       );
//     },
//     h3: ({ children }: { children: React.ReactNode }) => {
//       const id = generateId(children as string);
//       return (
//         <h3 id={id} className="text-2xl font-semibold mt-6 mb-3 text-gray-700">
//           {children}
//         </h3>
//       );
//     },
//     ul: ({ children }: { children: React.ReactNode }) => (
//       <ul className="list-disc pl-6">{children}</ul>
//     ),
//     ol: ({ children }: { children: React.ReactNode }) => (
//       <ol className="list-decimal pl-6">{children}</ol>
//     ),
//     li: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
//     a: ({ node, ...props }: { node: any; [key: string]: any }) => (
//       <a
//         {...props}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="text-blue-600 hover:text-blue-800"
//       />
//     ),
//   };

//   const handlePostSelect = (path: string) => {
//     const cleanPath = path.replace(/^\/docs\/posts\//, "");
//     setSearchParams({ post: cleanPath });
//   };

//   return (
//     <div className="flex flex-row space-x-4">
//       {/* Left sidebar navigation */}
//       <List unstyled>
//         {posts.map((post) => (
//           <List.Item key={post.path}>
//             <button key={post.path} onClick={() => handlePostSelect(post.path)}>
//               {post.title}
//             </button>
//           </List.Item>
//         ))}
//       </List>

//       {/* Content area */}
//       <div className="w-3/5 prose prose-slate max-w-none">
//         {content && frontmatter && (
//           <>
//             <div className="mb-8">
//               <h1 className="text-4xl font-bold mb-2">{frontmatter.title}</h1>
//               <p className="text-gray-600 italic">
//                 Published by {frontmatter.author} on{" "}
//                 {new Date(frontmatter.date).toLocaleDateString()}
//               </p>
//               <p className="text-gray-700 mt-4">{frontmatter.description}</p>
//             </div>
//             <ReactMarkdown
//               remarkPlugins={[remarkGfm]}
//               components={components}
//               className="text-justify"
//             >
//               {content}
//             </ReactMarkdown>
//           </>
//         )}
//       </div>

//       {/* Right sidebar - Table of Contents */}
//       <div className="w-1/5 sticky top-4 h-screen overflow-y-auto">
//         <div>
//           <h3 className="text-lg font-semibold mb-4">On this page</h3>
//           <nav className="space-y-2">
//             {toc.map((item) => (
//               <a
//                 key={item.id}
//                 href={`#${item.id}`}
//                 className={`block text-gray-600 hover:text-gray-900 ${
//                   item.level === 2 ? "pl-4" : item.level === 3 ? "pl-8" : ""
//                 }`}
//               >
//                 {item.text}
//               </a>
//             ))}
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }
