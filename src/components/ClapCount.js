import styled, {css} from 'styled-components'


const ClapCount = styled.span`
  position:relative;
  top: -42px;
  left: 2px;
  color: white;
  border-radius: 50%;
  backface-visibility: hidden;


  ${({theme: {size}}) => {
    const half = `${size / 2}px`
    return css`
      height: ${half};
      width: ${half};
      line-height: ${half};
      top: -42px;
      left: 2px;
      background: rgb(39, 174, 96);
    `
  }}
`

export default ClapCount
