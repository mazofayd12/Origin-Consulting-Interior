import '@/styles/globals.css';

export const metadata = {
  title: 'Origin Consulting Interior',
  description: 'Enterprise Luxury Architecture & Interior Design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
