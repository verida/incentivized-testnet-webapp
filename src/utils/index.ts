export const EVM_ADDRESS_REGEXP = /^0x[0-9a-fA-F]{40}$/;

/**
 * Check if a string value is a valid EVM address.
 *
 * @param address The address or value to test.
 * @returns `true` if a valid EVM address, `false` otherwise.
 */
export function isValidEvmAddress(address?: string): boolean {
  return address ? EVM_ADDRESS_REGEXP.test(address) : false;
}

export async function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getDaysLeft(targetDate: Date): number {
  const currentDate = new Date();
  const differenceInTime = targetDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
}
