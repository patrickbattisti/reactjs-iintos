import styled from 'styled-components';

export const Form = styled.form`
  padding-top: 30px;
  > div + div {
    margin-top: 10px;
  }
  button {
    margin-top: 30px;
    width: 100%;
  }
`;

export const Sessions = styled.div`
  > div {
    border: 1px dashed #444;
    border-radius: 4px;
    padding: 10px;
    display: flex;
    align-items: center;

    h3 {
      margin-bottom: 15px;
    }

    & + div {
      margin-top: 10px;
    }

    > div {
      flex: 1;
    }
  }
`;
