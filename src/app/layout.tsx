import '@Styles/globals.css'
import { AppBody } from '@App/AppBody'
import { siteMetadata } from '@Modules/metadata'

export const metadata = siteMetadata

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AppBody>{children}</AppBody>
            </body>
        </html>
    )
}
