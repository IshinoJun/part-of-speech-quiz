/** 異常系の共通処理 */

import * as assert from 'assert';

/**
 * Switchのdefaultに記載しておくと、対象が増えたときにエラーが出て検知できる
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function unreachable(...args: never): never {
  assert.fail('unreachable');
}
