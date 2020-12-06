import { useMemo } from 'react'
import * as d3 from 'd3'

import useChartDimensions from './useChartDimensions'

const chartSettings = {
    marginRight: 5,
    marginLeft: 5
}

const Circle = ({ cx, cy = 0, xScale, yScale, fill = 'green' }) => (
    <circle
        cx={`${xScale(cx)}`}
        cy={`${yScale(cy)}`}
        r={`${yScale(-0.2)}`}
        fill={fill}
    />
)

const Line = ({
    x1 = 0,
    x2 = 0,
    y1 = 0,
    y2 = 0,
    xScale,
    yScale,
    stroke = 'grey',
    hasCircleEnd = false,
    opacity = 1
}) => (
    <>
        <line
            x1={xScale(x1)}
            y1={yScale(y1)}
            x2={xScale(x2)}
            y2={yScale(y2)}
            stroke={stroke}
            strokeWidth="4"
            opacity={opacity}
        />
        {hasCircleEnd && (x1 || x2) && (
            <>
                <Circle cx={x1} xScale={xScale} yScale={yScale} />
                <Circle cx={x2} xScale={xScale} yScale={yScale} />
            </>
        )}
    </>
)

export default ({ pointsInTime = [], lineInTime = {} }) => {
    const [ref, dms] = useChartDimensions(chartSettings)

    const xScale = useMemo(
        () => d3.scaleLinear().domain([-1, 1]).range([0, dms.boundedWidth]),
        [dms.boundedWidth]
    )
    const yScale = useMemo(
        () => d3.scaleLinear().domain([-1, 1]).range([0, dms.boundedHeight]),
        [dms.boundedHeight]
    )
    return (
        <div className="Chart__wrapper" ref={ref} style={{ height: '25px' }}>
            <svg width={dms.width} height={dms.height}>
                <g
                    transform={`translate(${[
                        dms.marginLeft,
                        dms.marginTop
                    ].join(',')})`}
                >
                    <g>
                        <Line
                            x1={-0.95}
                            x2={0.95}
                            xScale={xScale}
                            yScale={yScale}
                            opacity={0.5}
                        />
                        <polygon
                            points={`${xScale(-1)} ${yScale(0)}, ${xScale(
                                -0.95
                            )} ${yScale(1)}, ${xScale(-0.95)} ${yScale(-1)}`}
                            fill="grey"
                            opacity="0.5"
                        />
                        <polygon
                            points={`${xScale(1)} ${yScale(0)}, ${xScale(
                                0.95
                            )} ${yScale(1)}, ${xScale(0.95)} ${yScale(-1)}`}
                            fill="grey"
                            opacity="0.5"
                        />
                        <Line
                            y1={-1}
                            y2={1}
                            xScale={xScale}
                            yScale={yScale}
                            opacity={0.5}
                        />
                        {pointsInTime &&
                            pointsInTime.map((point) => (
                                <Circle
                                    key={point}
                                    cx={point}
                                    cy={0}
                                    xScale={xScale}
                                    yScale={yScale}
                                />
                            ))}
                        {lineInTime && (
                            <Line
                                x1={lineInTime.x1}
                                x2={lineInTime.x2}
                                xScale={xScale}
                                yScale={yScale}
                                stroke="green"
                                hasCircleEnd
                            />
                        )}
                    </g>
                </g>
            </svg>
        </div>
    )
}
