import Table from './components/Table'
import data from './data'

const { forms, pronouns } = data

const getTenseNames = () => {
    return data.tenses.map((t) => t.name)
}

const getTense = ({ tenseName }) => {
    return data.tenses.find((t) => t.name === tenseName)
}

const Index = () => {
    const tenseNames = getTenseNames()

    return (
        <div>
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

export default Index
