import makeStyles from '@mui/styles/makeStyles';

import TableColumn from './TableColumn'
import TableHeader from './TableHeader'
import TableRow from './TableRow'

import Arrow from './Arrow'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '45%',
        display: 'inline-block',
        margin: theme.spacing(2)
    }
}))

export default function Table({
    tense,
    pronouns,
    forms,
    pointsInTime,
    lineInTime
}) {
    const classes = useStyles()

    const tenseName = tense.name

    const getConjugation = ({ formName }) => {
        const form = tense.forms.find((f) => f.name === formName)
        const conjugation = pronouns.map((subject) => form.conjugation[subject])
        return conjugation
    }

    return (
        <div className={classes.root}>
            <TableRow>
                <TableHeader type="title">{tenseName}</TableHeader>
                {forms.map((f) => (
                    <TableHeader key={f}>{f}</TableHeader>
                ))}
            </TableRow>
            <TableRow>
                <TableColumn items={pronouns} />
                {forms.map((f) => (
                    <TableColumn
                        key={f}
                        items={getConjugation({
                            formName: f
                        })}
                    />
                ))}
            </TableRow>
            <Arrow pointsInTime={pointsInTime} lineInTime={lineInTime} />
        </div>
    )
}
