/**
 *
 * @param arr
 * @param key
 * @param parentKey
 * @returns tree
 */
export function array2Tree(arr: any[], key: string, parentKey: string): any[] {
  const map: any = {};
  const roots: any[] = [];

  for (const obj of arr) {
    // 当前obj的id
    const id: string = obj[key];
    // 当前obj的父级id
    const parentId: string = obj[parentKey];

    // 已经有子集存在于map中
    if (map[id]) {
      obj.children = map[id].children;
    }

    // 保存obj到map中
    map[id] = obj;

    if (!obj[parentKey]) {
      // 当前obj没有父级
      roots.push(obj);
    } else {
      if (map[parentId]) {
        // 父级存在于map中
        if (!map[parentId].children) map[parentId].children = [];
        map[parentId].children.push(obj);
      } else {
        // 先将子级存到map中
        map[parentId] = { children: [obj] };
      }
    }
  }

  return roots;
}
