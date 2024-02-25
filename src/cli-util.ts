import { createInterface } from 'readline';

/**
 * Lesar ein streng frå kommandolinja.
 */
export function readLine(): Promise<string> {
  return new Promise((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on('line', (input) => {
      resolve(input);
      rl.close();
    });
  });
}

/**
 * Lar brukaren velje eit element frå ei liste.
 * @param items Liste med element.
 * @param optional Om valet kan vere null.
 */
export async function selectItem<T>(items: T[]): Promise<T>;
export async function selectItem<T>(items: T[], optional: false): Promise<T>;
export async function selectItem<T>(
  items: T[],
  optional: true,
): Promise<T | null>;
export async function selectItem<T>(
  items: T[],
  optional?: boolean,
): Promise<T | null> {
  if (items.length === 0 && !optional) {
    throw new Error('Liste med element kan ikkje vere tom');
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    let i = 0;

    for (const item of items) {
      console.log(`${i + 1}: ${item}`);
      i++;
    }

    rl.question('Val: ', (input) => {
      rl.close();

      const index = parseInt(input, 10) - 1;

      if (isNaN(index) || index < 0 || index >= items.length) {
        if (optional) {
          resolve(null);
        } else {
          console.error('Ugyldig val');
          resolve(selectItem(items, optional as false));
        }
      } else {
        resolve(items[index]);
      }
    });
  });
}
