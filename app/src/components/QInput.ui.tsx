import { Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "preact/hooks";
export default function QInput({
  label,
  id = "",
  name = "",
  value = "",
  icon = null,
  error,
  items = [],
  searchField = "title",
  displayAsHelper = "",
  onChange,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const getSearchValue = (item) => {
    if (typeof searchField === "function") {
      return searchField(item);
    }
    return searchField.includes(".")
      ? searchField.split(".").reduce((obj, key) => obj?.[key], item)
      : item[searchField];
  };

  const filteredItems = Array.isArray(items)
    ? items.filter((item) => {
        const searchValue = getSearchValue(item);
        return searchValue?.toLowerCase().includes(inputValue.toLowerCase());
      })
    : [];

  const handleSelect = (item) => {
    const searchValue = getSearchValue(item);
    setInputValue(searchValue);
    const event = {
      target: {
        name,
        value: searchValue,
        type: "text",
        dataset: {
          id: item.id,
        },
      },
    };
    onChange(event);
    setShowDropdown(false);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setShowDropdown(true);
  };

  const handleBlur = (e) => {
    const match = filteredItems.find((item) => {
      const searchValue = getSearchValue(item);
      return searchValue.toLowerCase() === inputValue.toLowerCase();
    });
    if (match) {
      handleSelect(match);
    }
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  return (
    <div className="relative">
      <Label htmlFor={id} className="pb-2">
        {label}
      </Label>
      <TextInput
        id={id}
        name={name}
        value={inputValue || ""}
        autoComplete="off"
        icon={icon || undefined}
        onChange={handleChange}
        onBlur={handleBlur}
        onFocus={() => setShowDropdown(true)}
        color={error ? "failure" : "gray"}
        helperText={error}
      />

      {showDropdown && (
        <div className="absolute z-50 w-3/4 bg-white border rounded-lg shadow-lg mt-1">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => {
              const searchValue = getSearchValue(item);
              const helperValue =
                typeof displayAsHelper === "function"
                  ? displayAsHelper(item)
                  : item[displayAsHelper];

              return (
                <div
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  <p className={displayAsHelper ? "font-bold" : ""}>
                    {searchValue}
                  </p>
                  {helperValue && (
                    <p className="text-sm text-gray-600">{helperValue}</p>
                  )}
                </div>
              );
            })
          ) : (
            <div className="px-4 py-2 text-gray-500 cursor-default">
              No match found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
