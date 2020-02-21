import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  /* align-items: center; */
  justify-content: center;
`;

export const ContainerWrap = styled.div`
  width: 78%;

  > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h1 {
      margin: 15px 0;
    }
  }
`;