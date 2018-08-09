import styled, {css} from 'styled-components'

const ClapCountTotal = styled.span`
  position: relative;
  transform: scale(1);
  text-align: center;
  top: -22px;
  left: 12px;

  ${({theme: {primaryColor, size}}) => css`
    top: -22px;
    color: ${primaryColor};
    width: ${size}px;
  `}
`

export default ClapCountTotal
