import Title from '@Components/Title'
import StandardSeo from '@Components/StandardSeo'
import Spanish from '@Apps/Spanish'

const SpanishComponent = () => (
    <>
        <StandardSeo
            pageTitle="Spanish tenses interactive table"
            description="Conjugations for the most used tenses"
            path="/spanish"
        />
        <Title title="Spanish tenses interactive table" />
        <Spanish />
    </>
)

export default SpanishComponent
