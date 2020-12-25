import Typography from '@material-ui/core/Typography'

import Comments from '@Components/Comments'
import Title from '@Components/Title'

export default () => (
    <>
        <Title title="CV" />
        <br />
        <Typography variant="body1">
            Download my CV{' '}
            <a href="https://bluprince13.gitlab.io/cv/ajayakumar_vipin_cv.pdf">
                here
            </a>
            . If you like my CV and would like to see the source code, you can
            download my repo{' '}
            <a href="https://bluprince13.gitlab.io/cv/ajayakumar_vipin_cv.tar.gz">
                here
            </a>
            . You can build the latex file with the command `lualatex
            ajayakumar_vipin_cv.tex`.
        </Typography>
        <Comments.Embed id="cv" />
    </>
)
