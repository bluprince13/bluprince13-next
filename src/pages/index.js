import Typography from '@material-ui/core/Typography'

import Facebook from '@Components/Facebook'
import Title from '@Components/common/Title'

export default () => (
    <>
        <Title title="Hello human" />
        <br />
        <Typography variant="body1">
            This website is currently a work in progress, but feel free to have
            a look around. I plan to use this website to showcase any apps I
            develop and to publish articles. My previous blog is at{' '}
            <a
                target="_blank"
                rel="noreferrer"
                href="https://vipinajayakumar.com"
            >
                vipinajayakumar.com
            </a>
            .
            <br />
        </Typography>
        <br />
        <Typography variant="body1">
            If you are interested in following my blog, you can subscribe to my
            RSS feed. Alternatively, follow me on my social media accounts
            linked to in the footer.
        </Typography>
        <br />
        <Typography variant="body1">
            I have learnt a lot from looking at work by other developers who
            open-source their code. You may also access the source code for my
            website{' '}
            <a
                target="_blank"
                rel="noreferrer"
                href="https://bluprince13.s3.eu-west-2.amazonaws.com/release.zip"
            >
                here
            </a>
            .
        </Typography>
        <Facebook href="https://www.facebook.com/bluprince13" />
    </>
)
