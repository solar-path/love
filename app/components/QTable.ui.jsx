import { Button, Table, TextInput, Pagination, Tooltip } from "flowbite-react";
import { useState } from "react";
import { createElement } from "preact";

export default function QTable({ items, caption, description, actions }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // Helper function to strip HTML tags for sorting and filtering
  const stripHtml = (html) => {
    if (typeof html !== "string") return String(html);
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  // Modified sorting function to handle HTML content
  const sortItems = (items) => {
    if (!sortConfig.key) return items;

    return [...items].sort((a, b) => {
      const aValue = stripHtml(a[sortConfig.key].value).toLowerCase();
      const bValue = stripHtml(b[sortConfig.key].value).toLowerCase();

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  // Modified filter function to handle HTML content
  const filterItems = (items) => {
    if (!searchTerm) return items;

    return items.filter((item) =>
      Object.values(item).some((field) =>
        stripHtml(field.value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Now we can use these functions
  const hasItems = items?.length > 0;
  const columns = hasItems ? Object.entries(items[0]) : [];
  const sortedItems = hasItems ? sortItems(filterItems(items)) : [];

  // Add sort handler
  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Helper function to safely render HTML content
  const renderCellContent = (value) => {
    if (typeof value !== "string" || !value.trim().startsWith("<")) {
      return value;
    }

    // Create a temporary div to parse HTML
    const temp = document.createElement("div");
    temp.innerHTML = value;

    // Get the first element
    const firstElement = temp.firstElementChild;

    if (!firstElement) return value;

    // Create element using the parsed HTML
    return createElement(firstElement.tagName.toLowerCase(), {
      ...Array.from(firstElement.attributes).reduce(
        (acc, attr) => ({
          ...acc,
          [attr.name]: attr.value,
        }),
        {}
      ),
      dangerouslySetInnerHTML: { __html: firstElement.innerHTML },
    });
  };

  // Calculate pagination
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const currentItems = sortedItems.slice(startIndex, endIndex);

  // Handle page change
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  // Helper to get main actions
  const getMainActions = () => {
    return actions?.filter((action) => action.location === "main") || [];
  };

  // Helper to get row actions
  const getRowActions = () => {
    return actions?.filter((action) => action.location === "row") || [];
  };

  return (
    <div className="overflow-x-auto">
      <Table hoverable>
        {/* Caption Section - Updated Button section */}
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          {caption}
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            {description}
          </p>
          <div className="flex flex-row justify-between items-center mt-2">
            <div className="w-1/2">
              <TextInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-1/2 flex justify-end items-center gap-2">
              {getMainActions().map((action, index) => (
                <Tooltip key={index} content={action.label}>
                  {action.component ? (
                    action.component
                  ) : (
                    <Button onClick={action.onClick}>{action.label}</Button>
                  )}
                </Tooltip>
              ))}
            </div>
          </div>
        </caption>

        {/* Table Head - Modified to handle no columns case */}
        <Table.Head>
          {hasItems ? (
            <>
              {columns.map(([key, item]) => (
                <Table.HeadCell
                  key={key}
                  onClick={() => requestSort(key)}
                  className="cursor-pointer select-none"
                >
                  {item.label}
                  {sortConfig.key === key && (
                    <span className="ml-2">
                      {sortConfig.direction === "ascending" ? "↑" : "↓"}
                    </span>
                  )}
                </Table.HeadCell>
              ))}
              {getRowActions().length > 0 && (
                <Table.HeadCell>Actions</Table.HeadCell>
              )}
            </>
          ) : (
            <Table.HeadCell>No columns available</Table.HeadCell>
          )}
        </Table.Head>

        {/* Table Body - Modified to show "no records" message */}
        <Table.Body className="divide-y">
          {hasItems ? (
            currentItems.map((item, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800 group"
              >
                {Object.values(item).map(
                  (value, cellIndex) =>
                    !value.hidden && (
                      <Table.Cell
                        key={cellIndex}
                        className={`whitespace-nowrap font-medium text-gray-900 dark:text-white ${
                          value.onClick ? "cursor-pointer text-red-500" : ""
                        }`}
                        onClick={() => {
                          if (value.onClick) {
                            value.onClick(item);
                          }
                        }}
                      >
                        {renderCellContent(value.value)}
                      </Table.Cell>
                    )
                )}
                {getRowActions().length > 0 && (
                  <Table.Cell>
                    <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      {getRowActions().map((action, actionIndex) =>
                        action.component ? (
                          <div key={actionIndex}>
                            {typeof action.component === "function"
                              ? action.component(item)
                              : action.component}
                          </div>
                        ) : (
                          <Button
                            key={actionIndex}
                            size="xs"
                            onClick={() => action.onClick(item)}
                          >
                            {action.label}
                          </Button>
                        )
                      )}
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            ))
          ) : (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell
                colSpan={columns.length || 1}
                className="text-center py-4"
              >
                No records available
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      {/* Only show pagination if there are items */}
      {hasItems && (
        <div className="flex items-center justify-between mt-4">
          {/* Items per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Show
            </span>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={itemsPerPage}
              onChange={(e) => {
                const value =
                  e.target.value === "all"
                    ? totalItems
                    : Number(e.target.value);
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
            >
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value="all">All</option>
            </select>
            <span className="text-sm text-gray-700 dark:text-gray-400">
              entries
            </span>
          </div>

          {/* Pagination info and controls */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </span>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
              showIcons
            />
            <span className="text-sm text-gray-700 dark:text-gray-400">
              Go to page:
            </span>
            <TextInput
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={(e) => {
                const page = Math.min(
                  Math.max(1, Number(e.target.value)),
                  totalPages
                );
                setCurrentPage(page);
              }}
              className="w-20"
            />
          </div>
        </div>
      )}
    </div>
  );
}
