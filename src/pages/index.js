import Typography from '@material-ui/core/Typography'

import Facebook from '@Components/Facebook'
import Title from '@Components/Title'
import Figure from '@Components/blog/Figure'

export default () => (
    <>
        <Title title="Hello human" />
        <br />
        <Typography variant="body1">
            Welcome to my little slice of heaven. I use this space to showcase
            any apps I develop and to publish articles. Everything I publish
            here is, obviously, my personal stuff and opinions and has nothing
            to do with whom I work for.
        </Typography>
        <br />
        <Typography variant="body1">
            Here is a little bit about me. My name is Vipin. bluprince13 is just
            an alias I came up with when I was younger. I am from Kollam, a
            small seaside town in Kerala, a state in India. I also lived in Abu
            Dhabi for a few years. I have been to seven different schools - that
            was not fun. I came to the UK in 2010 to do my Masters in Aerospace
            Engineering at the University of Bath. I graduated in 2015 and then
            started working at Rolls-Royce, initially on their graduate scheme
            and later as an Aeroacoustics workstream lead. Whilst at
            Rolls-Royce, I developed a passion for software development. At the
            end of 2019, I switched to Amazon Prime Video in London as a
            full-stack web developer. I love being a developer. In particular, I
            love working with React.js, Python and AWS. Despite it being my day
            job, coding is still what I enjoy most in my free time. When I am
            not coding, I like learning Spanish, reading, hitting the gym and
            cycling.
        </Typography>
        <br />
        <Figure src="/photo.jpeg" maxWidth="200px" />
        <br />
        <Typography variant="body1">
            If you are interested in following my blog, you can subscribe to my
            RSS feed or follow me on my social media accounts - links are in the
            footer. My previous blog is at{' '}
            <a
                target="_blank"
                rel="noreferrer"
                href="https://vipinajayakumar.com"
            >
                vipinajayakumar.com
            </a>
            , but I do not plan to write there anymore.
            <br />
        </Typography>
        <br />
        <Facebook href="https://www.facebook.com/bluprince13" />
    </>
)
