import Alarm from '@mui/icons-material/Alarm'
import Approval from '@mui/icons-material/Approval'
import Done from '@mui/icons-material/Done'
import Email from '@mui/icons-material/Email'
import Event from '@mui/icons-material/Event'
import Fingerprint from '@mui/icons-material/Fingerprint'
import FitnessCenter from '@mui/icons-material/FitnessCenter'
import LaptopMac from '@mui/icons-material/LaptopMac'
import Mail from '@mui/icons-material/Mail'
import MenuBook from '@mui/icons-material/MenuBook'
import PanTool from '@mui/icons-material/PanTool'
import Phone from '@mui/icons-material/Phone'
import Scanner from '@mui/icons-material/Scanner'
import Start from '@mui/icons-material/Start'
import Tv from '@mui/icons-material/Tv'
import type { SvgIconProps } from '@mui/material/SvgIcon'

export type IconName = 'alarm' | 'approval' | 'done' | 'email' | 'event' | 'fingerprint' | 'fitness_center' | 'laptop_mac' | 'mail' | 'menu_book' | 'pan_tool' | 'phone' | 'scanner' | 'start' | 'tv'

const iconMap: Record<IconName, React.ComponentType<SvgIconProps>> = {
    alarm: Alarm,
    approval: Approval,
    done: Done,
    email: Email,
    event: Event,
    fingerprint: Fingerprint,
    fitness_center: FitnessCenter,
    laptop_mac: LaptopMac,
    mail: Mail,
    menu_book: MenuBook,
    pan_tool: PanTool,
    phone: Phone,
    scanner: Scanner,
    start: Start,
    tv: Tv,
}

export default function MaterialIcon({ name, ...props }: { name: IconName } & SvgIconProps) {
    const IconComponent = iconMap[name]
    return IconComponent ? <IconComponent {...props} /> : null
}
