export const metadata = {
  title: "Next.js To-Do",
  description: "Simple to-do list made with Next.js + React",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
