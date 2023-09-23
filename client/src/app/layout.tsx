import '@/style/App.css'
import type { Metadata } from 'next'

import { MidiProvider } from '@/providers/MidiProvider'
import { SocketProvider } from '@/providers/SocketProvider'
import { UserProvider } from '@/providers/UserProvider'

import ThemeRegistry from '@/components/ui/theme/ThemeRegistry'

export const metadata: Metadata = {
  title: 'Midi chat',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
            <UserProvider>
              <MidiProvider>
                <SocketProvider>
                  {children}
                </SocketProvider>
              </MidiProvider>
            </UserProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
