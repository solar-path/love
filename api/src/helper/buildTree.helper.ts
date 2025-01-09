export const buildTree = (list: any[], parentKey: string) => {
  // Return empty array if list is null, undefined, or not an array
  if (!Array.isArray(list)) {
    console.warn("buildTree received invalid input:", list);
    return [];
  }

  const tree: any[] = [];
  const lookup: { [key: string]: any } = {};

  // First pass: Create a lookup object
  list.forEach((item) => {
    lookup[item.id] = { ...item, children: [] };
  });

  // Second pass: Build the tree
  list.forEach((item) => {
    const parent = item[parentKey];
    if (parent && lookup[parent]) {
      // Check if parent exists in lookup
      lookup[parent].children.push(lookup[item.id]);
    } else {
      tree.push(lookup[item.id]);
    }
  });

  return tree;
};
