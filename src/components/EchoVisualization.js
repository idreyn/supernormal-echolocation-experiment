import React from 'react';
import classNames from 'classnames';

const getPositionStyle = (x, y) => {
    return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% - ${y}px)`,
        transform: 'translateX(-50%) translateY(-50%)',
    };
};

const getRadialPositionStyle = (r, theta) => {
    return getPositionStyle(
        r * Math.cos(((90 - theta) * Math.PI) / 180),
        r * Math.sin(((90 - theta) * Math.PI) / 180)
    );
};

const getCircleStyle = (radius) => {
    return {
        width: `${2 * radius}px`,
        height: `${2 * radius}px`,
        borderRadius: `${radius}px`,
    };
};

const EchoVisualization = (props) => {
    const {
        chosenAzimuth = null,
        azimuthChoiceMap = {},
        showPulseAnimation = false,
        description = null,
        headRadiusMeters = 0.0875,
        targetDistanceMeters = 3,
        echoAnimationAzimuth,
        echoAnimationSlowdown,
        pxPerMeter = 90,
    } = props;
    const targetDistancePx = targetDistanceMeters * pxPerMeter;

    return (
        <div className="echo-visualization">
            <div className="description">{description}</div>
            <div className="stage">
                <div
                    className="ring"
                    style={{ ...getPositionStyle(0, 0), ...getCircleStyle(targetDistancePx) }}
                />
                <div className="ring-mask" />
                <div className="axis y-axis" style={getPositionStyle(0, 0)}>
                    <div className="axis-label">Front</div>
                    <div className="axis-line" />
                    <div className="axis-label">Back</div>
                </div>
                <div className="axis x-axis" style={getPositionStyle(0, 0)}>
                    <div className="axis-label">Left</div>
                    <div className="axis-line" />
                    <div className="axis-label">Right</div>
                </div>
                <div
                    className="head"
                    style={{
                        ...getPositionStyle(0, 0),
                        ...getCircleStyle(headRadiusMeters * 2 * pxPerMeter),
                    }}
                />
                {typeof echoAnimationAzimuth === 'number' && (
                    <div
                        className="echo-animation"
                        style={{
                            ...getRadialPositionStyle(targetDistancePx, echoAnimationAzimuth),
                            ...getCircleStyle(10),
                            animationDelay: `${
                                (2 * echoAnimationSlowdown * targetDistanceMeters) / 343
                            }s`,
                        }}
                    />
                )}
                {showPulseAnimation && (
                    <div
                        className="echo-animation"
                        style={{
                            ...getRadialPositionStyle(0, 0),
                            ...getCircleStyle(10),
                        }}
                    />
                )}
                {Object.entries(azimuthChoiceMap).map(([label, azimuth]) => (
                    <div
                        key={azimuth.toString()}
                        className={classNames(
                            'azimuth-choice',
                            azimuth === chosenAzimuth && 'chosen'
                        )}
                        style={{
                            ...getRadialPositionStyle(targetDistancePx, azimuth),
                            ...getCircleStyle(12),
                        }}
                    >
                        {label}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EchoVisualization;
