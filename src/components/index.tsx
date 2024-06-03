import styled from 'styled-components';
import { colors } from './colors';

export * from './Movies';

export const Box = styled.div`
  display: block;
`;

export const Stack = styled.div<{ gap?: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => `${props?.gap}px`};
`;

export const Inline = styled.div<{
  gap?: number;
  alignItems?: string;
  justifyContent?: string;
  overflowX?: string;
}>`
  display: flex;
  align-items: ${(props) => props.alignItems || 'stretch'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  gap: ${(props) => (props.gap ? `${props.gap}px` : '0')};
  margin: 0;
  padding: 0;
  overflow-x ${(props) => props.overflowX};
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  width: fit-content;
  color: white;
  font-weight: medium;
  height: 48px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  padding: 0px 24px;
  background-color: ${colors.primary};
`;
