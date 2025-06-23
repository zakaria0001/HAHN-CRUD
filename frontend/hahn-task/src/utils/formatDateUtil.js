export function formatCreatedAt(dateString) {
  const date = new Date(dateString);
  const now = new Date();

  // Check if same day
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay) {
    // Show "Today at HH:MM"
    return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } else {
    // Show full date: e.g. "Monday 22 June 2025 - 14:23:56"
    return date.toLocaleString('en-US', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }
}