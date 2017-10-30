import styled, {injectGlobal} from 'styled-components'

injectGlobal`
	.comPlainTextContentEditable {
		-webkit-user-modify: read-write-plaintext-only;
	}
	
	.comPlainTextContentEditable--has-placeholder::before {
		content: attr(placeholder);
		opacity: 0.5;
		color: inherit;
		cursor: text;
	}
`


export const BoardDiv = styled.div`
  background-color: #23719f;
  overflow-y: hidden;
  padding: 5px;
  font: 14px/18px "Helvetica Neue", Arial, Helvetica, sans-serif;
  color: #393939;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100vh;
`

export const ScrollableLane = styled.div`
	height: auto;
  max-height: 95%;
  overflow-y: auto;
  min-width: 250px;
`

export const Section = styled.section`
  background-color: #e3e3e3;
  border-radius: 3px;
  margin: 5px 5px;
  padding: 10px;
  
`

export const Header = styled.header`
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

export const Title = styled.span`
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  cursor: grab;
  width: 100%;
`

export const RightContent = styled.span`
  width: 30%;
  text-align: right;
  font-size: 13px;
`

export const DraggableList = styled.div`min-height: 10px;`

export const CardWrapper = styled.article`
  border-radius: 3px;
  margin: 10px 0px;
  border-bottom: 1px solid #ccc;
  position: relative;
  padding: 6px 8px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.23, 1, 0.32, 1);
  max-width: 250px;
`

export const MovableCardWrapper = styled(CardWrapper)`
	&:hover {
    background-color: #f0f0f0;
  }
`

export const Placeholder = styled.section`
  background-color: #ccc;
  margin: 5px 0px;
  padding: 10px;
  min-width: 226px;
  height: 45px;
  max-height: 95%;
  overflow-y: auto;
`

export const CardHeader = styled(Header)`
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
`

export const CardTitle = styled(Title)`
 font-size: 14px;
`

export const CardRightContent = styled(RightContent)`
  font-size: 10px;
`

export const Detail = styled.div`
  font-size: 12px;
  color: #4d4d4d;
`

export const Footer = styled.div`
  border-top: 1px solid #eee;
  padding-top: 6px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: wrap;
`

export const TagSpan = styled.span`
  padding: 2px 3px;
  font-size: 80%;
  border-radius: 3px;
  margin: 2px 5px;
  font-size: 70%;
`

export const AddCardLink = styled.a`
	border-radius: 0 0 3px 3px;
	color: #838c91;
	display: block;
	flex: 0 0 auto;
	padding: 5px 2px;
	position: relative;
	text-decoration: none;
	cursor: pointer;
	
	&:hover {
	  //background-color: #cdd2d4;
    color: #4d4d4d;
    text-decoration: underline;
	}
`

export const LaneWrapper = styled.div`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'cyan' : 'white')};
  display: flex;
  flex-direction: column;
  opacity: ${({ isDropDisabled }) => (isDropDisabled ? 0.5 : 'inherit')};
  transition: background-color 0.1s ease, opacity 0.1s ease;
  user-select: none;
`;
