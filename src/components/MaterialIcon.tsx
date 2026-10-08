import Alarm from '@mui/icons-material/Alarm'
import Approval from '@mui/icons-material/Approval'
import Biotech from '@mui/icons-material/Biotech'
import Call from '@mui/icons-material/Call'
import CheckCircle from '@mui/icons-material/CheckCircle'
import ChildCare from '@mui/icons-material/ChildCare'
import ChildFriendly from '@mui/icons-material/ChildFriendly'
import Description from '@mui/icons-material/Description'
import Done from '@mui/icons-material/Done'
import Edit from '@mui/icons-material/Edit'
import EditNote from '@mui/icons-material/EditNote'
import Email from '@mui/icons-material/Email'
import Event from '@mui/icons-material/Event'
import Fingerprint from '@mui/icons-material/Fingerprint'
import FitnessCenter from '@mui/icons-material/FitnessCenter'
import Flight from '@mui/icons-material/Flight'
import Groups from '@mui/icons-material/Groups'
import Home from '@mui/icons-material/Home'
import LaptopMac from '@mui/icons-material/LaptopMac'
import LocalHospital from '@mui/icons-material/LocalHospital'
import Mail from '@mui/icons-material/Mail'
import MedicalServices from '@mui/icons-material/MedicalServices'
import MenuBook from '@mui/icons-material/MenuBook'
import PanTool from '@mui/icons-material/PanTool'
import Phone from '@mui/icons-material/Phone'
import PregnantWoman from '@mui/icons-material/PregnantWoman'
import Scanner from '@mui/icons-material/Scanner'
import Schedule from '@mui/icons-material/Schedule'
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import Start from '@mui/icons-material/Start'
import Tv from '@mui/icons-material/Tv'
import Vaccines from '@mui/icons-material/Vaccines'
import type { SvgIconProps } from '@mui/material/SvgIcon'

export type IconName = 'alarm' | 'approval' | 'biotech' | 'call' | 'check_circle' | 'child_care' | 'child_friendly' | 'description' | 'done' | 'edit' | 'edit_note' | 'email' | 'event' | 'fingerprint' | 'fitness_center' | 'flight' | 'groups' | 'home' | 'laptop_mac' | 'local_hospital' | 'mail' | 'medical_services' | 'menu_book' | 'pan_tool' | 'phone' | 'pregnant_woman' | 'scanner' | 'schedule' | 'shopping_cart' | 'start' | 'tv' | 'vaccines'

const iconMap: Record<IconName, React.ComponentType<SvgIconProps>> = {
    alarm: Alarm,
    approval: Approval,
    biotech: Biotech,
    call: Call,
    check_circle: CheckCircle,
    child_care: ChildCare,
    child_friendly: ChildFriendly,
    description: Description,
    done: Done,
    edit: Edit,
    edit_note: EditNote,
    email: Email,
    event: Event,
    fingerprint: Fingerprint,
    fitness_center: FitnessCenter,
    flight: Flight,
    groups: Groups,
    home: Home,
    laptop_mac: LaptopMac,
    local_hospital: LocalHospital,
    mail: Mail,
    medical_services: MedicalServices,
    menu_book: MenuBook,
    pan_tool: PanTool,
    phone: Phone,
    pregnant_woman: PregnantWoman,
    scanner: Scanner,
    schedule: Schedule,
    shopping_cart: ShoppingCart,
    start: Start,
    tv: Tv,
    vaccines: Vaccines,
}

export default function MaterialIcon({ name, ...props }: { name: IconName } & SvgIconProps) {
    const IconComponent = iconMap[name]
    if (!IconComponent) throw new Error(`Unknown icon "${name}" — add it to MaterialIcon.tsx`)
    return <IconComponent {...props} />
}
