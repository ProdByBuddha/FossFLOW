import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { PROJECTED_TILE_SIZE } from 'src/config';
import { useResizeObserver } from 'src/hooks/useResizeObserver';

interface Props {
  url?: string;
  path?: string;
  scale?: number;
  onImageLoaded?: () => void;
}

export const IsometricIcon = ({ url, path, scale = 1, onImageLoaded }: Props) => {
  const ref = useRef();
  const { size, observe, disconnect } = useResizeObserver();

  useEffect(() => {
    if (!ref.current) return;

    observe(ref.current);

    return disconnect;
  }, [observe, disconnect]);

  if (path) {
    return (
      <Box
        ref={ref}
        sx={{
          position: 'absolute',
          width: PROJECTED_TILE_SIZE.width * 0.8 * scale,
          top: -size.height,
          left: -size.width / 2,
          pointerEvents: 'none',
          color: 'text.primary'
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
          fill="currentColor"
        >
          <path d={path} />
        </svg>
      </Box>
    );
  }

  return (
    <Box
      ref={ref}
      component="img"
      onLoad={onImageLoaded}
      src={url}
      sx={{
        position: 'absolute',
        width: PROJECTED_TILE_SIZE.width * 0.8 * scale,
        top: -size.height,
        left: -size.width / 2,
        pointerEvents: 'none'
      }}
    />
  );
};
