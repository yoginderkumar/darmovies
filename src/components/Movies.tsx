import styled, { keyframes } from 'styled-components';
import { colors } from './colors';

export const MovieCard = styled.div<{ width?: number; height?: number }>`
  background-color: transparent;
  border-radius: 12px;
  width: ${(props) => props.width || 160}px;
  height: ${(props) => props.height || 240}px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  min-width: ${(props) => props.width || 160}px;
  list-style: none;
`;

export const MoviePoster = styled.img<{ radius?: number }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => props?.radius || 12}px;
`;

const shimmerAnimation = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

export const SkeletonBox = styled.div`
  background-color: ${colors.thirdBase};
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(${colors.thirdBase.slice(1)}, 0) 0%,
      rgba(${colors.thirdBase.slice(1)}, 0.5) 50%,
      rgba(${colors.thirdBase.slice(1)}, 0) 100%
    );
    transform: translateX(-100%);
    animation: ${shimmerAnimation} 1s infinite;
  }
`;

export const Skeleton = styled(SkeletonBox)<{
  width?: number;
  height?: number;
}>`
  width: ${(props) => props.width || 160}px;
  height: ${(props) => props.height || 240}px;
`;
