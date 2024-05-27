/* eslint-disable jsx-a11y/anchor-is-valid */
import Typography from '@mui/material/Typography'
import Link from 'next/link'

import { MyComments } from '@Components/Comments'
import Title from '@Components/Title'
import { generateMetadata } from '@Modules/metadata'

export const metadata = generateMetadata({
    pageTitle: 'CV',
    description: 'My CV',
    path: '/cv'
})

const CV = () => (
    <>
        <Title title="CV" />
        <br />
        <Typography variant="body1">
            Download my CV <Link href="/cv/pdf">here</Link>. If you like my CV
            and would like to see the source code, you can download my repo{' '}
            <Link href="/cv/source">here</Link>. You can build the latex file
            with the command `lualatex ajayakumar_vipin_cv.tex`.
        </Typography>
        <MyComments id="cv" />
    </>
)

export default CV
