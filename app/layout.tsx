export const metadata = {
  title: 'Rise Today',
  description: 'MULDHATA KEE DHUGOOMSI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="om">
      <body style={{ margin: 0, padding: 0, backgroundColor: "#110A1C" }}>
        {children}
      </body>
    </html>
  )
}
