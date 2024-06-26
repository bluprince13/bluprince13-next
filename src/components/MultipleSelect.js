import { useTheme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
}

function getStyles(option, personoption, theme) {
    return {
        fontWeight:
            personoption.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    }
}

export default function MultipleSelect({
    options,
    selectedOptions,
    setSelectedOptions,
    label
}) {
    const theme = useTheme()

    const handleChange = (event) => {
        const {
            target: { value }
        } = event
        setSelectedOptions(typeof value === 'string' ? value.split(',') : value)
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-option-label">{label}</InputLabel>
            <Select
                labelId="multiple-option-label"
                id="multiple-option"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={MenuProps}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option}
                        value={option}
                        style={getStyles(option, selectedOptions, theme)}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
