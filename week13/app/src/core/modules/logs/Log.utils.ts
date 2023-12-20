export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 60);
  return `${String(hours).padStart(2, "0")}:${String(duration - hours * 60).padStart(2, "0")}`;
};
