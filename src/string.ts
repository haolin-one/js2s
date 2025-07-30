/*
 * @Date: 2025-07-30 14:50:39
 * @LastEditors: wanghaolin @wanghaolin
 * @LastEditTime: 2025-07-30 16:58:26
 */

/**
 *
 * @param str 原字符串
 * @returns str 首字母大写字符串
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
