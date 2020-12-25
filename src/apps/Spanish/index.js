import Title from '@Components/Title'

import Table from './components/Table'
import data from './data'

const { forms, pronouns } = data

const getTenseNames = () => {
    return data.tenses.map((t) => t.name)
}

const getTense = ({ tenseName }) => {
    return data.tenses.find((t) => t.name === tenseName)
}

export default () => {
    const tenseNames = getTenseNames()

    return (
        <div>
            <Title title="Spanish tenses interactive table" />
            {tenseNames.map((tenseName) => {
                const tense = getTense({ tenseName })
                const { pointsInTime, lineInTime } = tense
                return (
                    <Table
                        key={tense}
                        tense={tense}
                        pronouns={pronouns}
                        forms={forms}
                        pointsInTime={pointsInTime}
                        lineInTime={lineInTime}
                    />
                )
            })}
        </div>
    )
}
