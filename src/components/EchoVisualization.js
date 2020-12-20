import React from 'react';
import classNames from 'classnames';

const getPositionStyle = (x, y) => {
    return {
        left: `calc(50% + ${100 * x}%)`,
        top: `calc(50% - ${100 * y}%)`,
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
        width: `${2 * 100 * radius}%`,
        height: `${2 * 100 * radius}%`,
        borderRadius: 100000,
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
        sizeMeters = 8,
    } = props;

    const targetDistance = targetDistanceMeters / sizeMeters;
    return (
        <div
            className={classNames('echo-visualization', echoAnimationSlowdown < 10 && 'high-speed')}
        >
            <div className="description">{description}</div>
            <div className="stage">
                <div
                    className="ring"
                    style={{ ...getPositionStyle(0, 0), ...getCircleStyle(targetDistance) }}
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
                        ...getCircleStyle(headRadiusMeters / sizeMeters),
                    }}
                />
                {typeof echoAnimationAzimuth === 'number' && (
                    <div
                        className="echo-animation"
                        style={{
                            ...getRadialPositionStyle(targetDistance, echoAnimationAzimuth),
                            ...getCircleStyle(0.02),
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
                            ...getCircleStyle(0.02),
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
                            ...getRadialPositionStyle(targetDistance, azimuth),
                            ...getCircleStyle(0.015),
                        }}
                    >
                        {label === 'space' ? '_' : label.toUpperCase()}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EchoVisualization;
