import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
display: flex;
justify-content: center;


html, body, #root {

    background: #fff !important;
  }
	div{
		width:80%;
		text-align:justify;
	}

	h1{
		display:flex;
		margin-top:14px;	
	}
ul{
	display: block;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
li{
	display: list-item;
    text-align: -webkit-match-parent;
}
	h{
		display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}
	}
	h4{
		display: block;
    margin-block-start: 1.33em;
    margin-block-end: 1.33em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
	}

  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
`;