/*
 * @Date: 2025-07-30 14:50:39
 * @LastEditors: wanghaolin @wanghaolin
 * @LastEditTime: 2025-07-30 15:12:51
 */

/**
 *
 * @param str
 * @returns str
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
