import React from 'react';

interface SkeletonProps {
  variant?: 'rectangular';
  width?: string;
  height?: string;
  className?: string;
  animation?: 'pulse' | 'wave' | 'none';
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width = '100%',
  height = '20px',
  className = '',
  animation = 'pulse'
}) => {
  const classes = [
    'skeleton',
    `skeleton--${variant}`,
    animation !== 'none' && `skeleton--${animation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      data-testid="skeleton"
      className={classes}
      style={{
        width,
        height,
      }}
    />
  );
};

export default Skeleton;