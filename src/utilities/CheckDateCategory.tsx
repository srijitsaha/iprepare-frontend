export function checkDateCategory(dateString: string) {
  // 1. Split the string to avoid UTC time zone shifts
  const [year, month, day] = dateString.split('-');
  const targetDate = new Date(Number(year), Number(month) - 1, Number(day)); // Month is 0-indexed in JS
  targetDate.setHours(0, 0, 0, 0);

  // 2. Get today's date at midnight local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 3. Calculate yesterday's date at midnight local time
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  // 4. Compare the timestamps
  if (targetDate.getTime() === today.getTime()) {
    return 'Today';
  } else if (targetDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  } else {
    return dateString;
  }
}