import type { ReactNode } from 'react'
import styles from './FigureGroup.module.css'

const FigureGroup = ({ children }: { children: ReactNode }) => (
    <div className={styles.group}>{children}</div>
)

export default FigureGroup
