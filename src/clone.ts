/*
 * @Date: 2025-07-30 16:58:51
 * @LastEditors: wanghaolin @wanghaolin
 * @LastEditTime: 2025-07-30 17:01:42
 */

/**
 * 深拷贝一个值，支持对象、数组、Map、Set、Date、RegExp 等常见类型。
 * 会自动处理循环引用。
 *
 * @template T 被拷贝的值类型
 * @param {T} value 要深拷贝的值
 * @param {WeakMap<object, any>} [cache=new WeakMap()] 用于处理循环引用的缓存
 * @returns {T} 拷贝后的新值
 */
export function deepClone<T>(value: T, cache: WeakMap<object, any> = new WeakMap()): T {
  // 原始类型直接返回
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 循环引用处理
  if (cache.has(value as object)) {
    return cache.get(value as object);
  }

  // Date
  if (value instanceof Date) {
    return new Date(value.getTime()) as T;
  }

  // RegExp
  if (value instanceof RegExp) {
    const pattern = value.source;
    const flags = value.flags;
    return new RegExp(pattern, flags) as T;
  }

  // Map
  if (value instanceof Map) {
    const result = new Map();
    cache.set(value, result);
    value.forEach((v, k) => {
      result.set(deepClone(k, cache), deepClone(v, cache));
    });
    return result as T;
  }

  // Set
  if (value instanceof Set) {
    const result = new Set();
    cache.set(value, result);
    value.forEach((v) => {
      result.add(deepClone(v, cache));
    });
    return result as T;
  }

  // Array
  if (Array.isArray(value)) {
    const result: any[] = [];
    cache.set(value, result);
    value.forEach((item, index) => {
      result[index] = deepClone(item, cache);
    });
    return result as T;
  }

  // 普通对象（排除原型链）
  const result: Record<string | symbol, any> = Object.create(Object.getPrototypeOf(value));
  cache.set(value as object, result);

  Reflect.ownKeys(value).forEach((key) => {
    // 支持 symbol 键
    result[key as keyof typeof result] = deepClone((value as any)[key], cache);
  });

  return result as T;
}
