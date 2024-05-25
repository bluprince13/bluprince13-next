import React from 'react'
import Typography from '@mui/material/Typography'
import StandardSeo from '@Components/StandardSeo'
import Title from '@Components/Title'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip'
import Comments from '@Components/Comments'
import Subscribe from '@Components/Subscribe'

import data, {
    PLATFORMS,
    MAC,
    IPHONE,
    IPAD,
    CHROME_EXTENSION,
    WEB
} from '@Content/uses'
import Figure from '@Components/Figure'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Stack from '@mui/material/Stack'
import MultipleSelect from '@Components/MultipleSelect'
import { useState } from 'react'
import {
    LaptopMac,
    TabletMac,
    PhoneIphone,
    Google,
    Web
} from '@mui/icons-material'

const platformIconMap = {
    [MAC]: LaptopMac,
    [IPAD]: TabletMac,
    [IPHONE]: PhoneIphone,
    [CHROME_EXTENSION]: Google,
    [WEB]: Web
}

const AppCard = ({
    use,
    appName,
    href,
    description,
    image,
    platforms,
    recommended
}) => {
    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardContent>
                <CardActionArea href={href} target="_blank">
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ margin: '0 1rem' }}
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Figure
                                src={image}
                                alt={appName}
                                size="xs"
                                align="center"
                            />
                            <Typography variant="h5" component="div">
                                {use} - {appName}
                            </Typography>
                        </Stack>
                        {recommended && (
                            <StarRateRoundedIcon fontSize="small" />
                        )}
                    </Stack>
                </CardActionArea>
                <Typography variant="body2" color="text.secondary">
                    <MDXRemote {...description} />
                </Typography>
                <Stack direction="horizontal" spacing={2}>
                    {platforms.map((platform) => {
                        const Icon = platformIconMap[platform]
                        return (
                            <Tooltip title={platform} key={platform}>
                                <Icon />
                            </Tooltip>
                        )
                    })}
                </Stack>
            </CardContent>
        </Card>
    )
}

const UsesThis = ({ data }) => {
    const [selectedOptions, setSelectedOptions] = useState(PLATFORMS)
    const numApps = data.length

    const filteredData = data.filter((app) =>
        selectedOptions.some((selectedOption) =>
            app.platforms.includes(selectedOption)
        )
    )

    return (
        <Box style={{ maxWidth: '960px', margin: 'auto' }}>
            <StandardSeo
                pageTitle="Uses"
                description="The apps I use"
                path="/uses"
                bannerPath="/uses/banner.jpeg"
            />
            <Figure alt="banner" src="uses/banner.jpeg" size="l" />
            <Title title="Uses" />
            <br />
            <Typography variant="body1">
                This page shows {numApps} apps that I use currently. I pick up
                most of my app recommendations from{' '}
                <Link href="https://thesweetsetup.com/">The Sweet Setup</Link>{' '}
                and <Link href="https://usesthis.com/">uses this</Link>. I
                starred the apps I feel like I cannot live without.You can also
                use the filter below to filter by platforms that I use the app
                on.
            </Typography>
            <br />
            <Typography variant="body1">
                Note that I have left out any apps that are specific to my
                geographic areas, i.e., UK or India.
            </Typography>
            <br />
            <Grid container justifyContent="right">
                <MultipleSelect
                    options={PLATFORMS}
                    label="Filter platforms"
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            </Grid>
            <Stack spacing={2}>
                {filteredData.map((app) => (
                    <AppCard {...app} key={app.appName} />
                ))}
            </Stack>
            <Subscribe />
            <Comments.Embed id="uses" />
        </Box>
    )
}

export async function getStaticProps() {
    return {
        props: {
            data: await Promise.all(
                data.map(async (app) => {
                    const source = await serialize(app.description)
                    return { ...app, description: source }
                })
            )
        }
    }
}

export default UsesThis
