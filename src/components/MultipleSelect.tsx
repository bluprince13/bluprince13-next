import { useTheme, Theme } from '@mui/material/styles'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const selectMenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250
            }
        }
    }
}

function getStyles<T extends string>(option: T, selectedOptions: T[], theme: Theme) {
    return {
        fontWeight:
            selectedOptions.indexOf(option) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium
    }
}

export default function MultipleSelect<T extends string>({
    options,
    selectedOptions,
    setSelectedOptions,
    label
}: {
    options: T[]
    selectedOptions: T[]
    setSelectedOptions: (values: T[]) => void
    label: string
}) {
    const theme = useTheme()

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        const { target: { value } } = event
        setSelectedOptions(typeof value === 'string' ? (value.split(',') as T[]) : (value as T[]))
    }

    return (
        <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="multiple-option-label">{label}</InputLabel>
            <Select<string[]>
                labelId="multiple-option-label"
                id="multiple-option"
                multiple
                value={selectedOptions}
                onChange={handleChange}
                input={<OutlinedInput label={label} />}
                MenuProps={selectMenuProps}
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
