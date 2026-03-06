// Parse on load - split "10:00-21:00" into { open, close }
export function parseHours(
  hours: Record<string, string>,
): Record<string, { open: string; close: string } | null> {
  return Object.entries(hours).reduce(
    (acc, [day, value]) => {
      const [open, close] = value.split('-');
      acc[day] = { open, close };
      return acc;
    },
    {} as Record<string, { open: string; close: string } | null>,
  );
}

// Transform on save - join { open, close } back to "10:00-21:00"
export function transformHours(
  hours: Record<string, { open: string; close: string } | null>,
): Record<string, string> {
  return Object.entries(hours).reduce(
    (acc, [day, value]) => {
      if (!value) return acc;
      acc[day] = `${value.open}-${value.close}`;
      return acc;
    },
    {} as Record<string, string>,
  );
}
