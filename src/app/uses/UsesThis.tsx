'use client'

import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import Link from 'next/link'
import Tooltip from '@mui/material/Tooltip'
import Stack from '@mui/material/Stack'
import {
    LaptopMac,
    TabletMac,
    PhoneIphone,
    Google,
    Web
} from '@mui/icons-material'

import { PLATFORMS, MAC, IPHONE, IPAD, CHROME_EXTENSION, WEB } from '@Content/uses'
import Figure from '@Components/Figure'
import { MdxRenderer } from '@Components/MdxRenderer'
import { MyComments } from '@Components/Comments'
import Subscribe from '@Components/Subscribe'
import Title from '@Components/Title'
import MultipleSelect from '@Components/MultipleSelect'

interface AppEntry {
    use: string
    appName: string
    href: string
    description: string
    image: string
    platforms: string[]
    recommended?: boolean
}

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
}: AppEntry): JSX.Element => {
    return (
        <Card sx={{ maxWidth: 700 }}>
            <CardContent>
                <CardActionArea href={href} target="_blank">
                    <Box
                        sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '0 1rem' }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
                            <Figure
                                src={image}
                                alt={appName}
                                size="xs"
                                align="center"
                            />
                            <Typography variant="h5" component="div">
                                {use} - {appName}
                            </Typography>
                        </Box>
                        {recommended && (
                            <StarRateRoundedIcon fontSize="small" />
                        )}
                    </Box>
                </CardActionArea>
                <Typography variant="body2" color="text.secondary" component="div">
                    <MdxRenderer compiledSource={description} />
                </Typography>
                <Stack direction="row" spacing={2}>
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

const UsesThis = ({ data }: { data: AppEntry[] }) => {
    const [selectedOptions, setSelectedOptions] = useState(PLATFORMS)
    const numApps = data.length

    const filteredData = data.filter((app) =>
        selectedOptions.some((selectedOption) =>
            app.platforms.includes(selectedOption)
        )
    )

    return (
        <Box style={{ maxWidth: '960px', margin: 'auto' }}>
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
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <MultipleSelect
                    options={PLATFORMS}
                    label="Filter platforms"
                    selectedOptions={selectedOptions}
                    setSelectedOptions={setSelectedOptions}
                />
            </Box>
            <Stack spacing={2}>
                {filteredData.map((app) => (
                    <AppCard {...app} key={app.appName} />
                ))}
            </Stack>
            <Subscribe />
            <MyComments id="uses" />
        </Box>
    )
}

export default UsesThis
