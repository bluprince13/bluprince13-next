import { Children, isValidElement, type ReactNode } from 'react'
import { getFigureMaxWidth } from './Figure'
import styles from './FigureGroup.module.css'

const columnFor = (child: ReactNode) => {
    const props = isValidElement<{ maxWidth?: string; size?: string }>(child) ? child.props : {}
    const maxWidth = props.maxWidth || getFigureMaxWidth(props.size)
    return maxWidth ? `minmax(0, ${maxWidth})` : 'minmax(0, 1fr)'
}

const FigureGroup = ({ children }: { children: ReactNode }) => {
    const columns = Children.toArray(children).filter(isValidElement).map(columnFor)
    return (
        <div className={styles.group} style={{ gridTemplateColumns: columns.join(' ') }}>
            {children}
        </div>
    )
}

export default FigureGroup
