/* @flow */
/**
 * This component is used to show
 * the total claps number for a specific service.
 */
import styled, {css} from 'styled-components'

const ClapCountTotal = styled.span`
  position: relative;
  transform: scale(1);
  text-align: center;
  top: -22px;
  left: 13px;

  ${({theme: {size}}) => css`
    top: -22px;
    color: 'rgb(0, 0, 0)';
    width: ${size}px;
  `}
`

export default ClapCountTotal
