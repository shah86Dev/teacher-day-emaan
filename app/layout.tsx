export const metadata = {
  title: "Thank You, Miss Rida",
  description: "A Teachers' Day card for Miss Rida from Emaan Fatima, Class 1-B."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
