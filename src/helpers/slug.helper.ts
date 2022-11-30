import * as slug from 'speakingurl';
import { generate } from 'voucher-code-generator';

export function slugify(value: string): string {
  if (value.charAt(value.length - 1) === '-') value = value.slice(0, value.length - 1);
  return `${slug(value, { titleCase: true })}-${
    generate({
      charset: '123456789abcdefghgklmnorstuvwxyz',
      length: 4
    })[0]
  }`.toLowerCase();
}
