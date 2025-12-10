export const formatted = function (form: Date) {
  return new Date(form).toLocaleDateString("vi-VN", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};