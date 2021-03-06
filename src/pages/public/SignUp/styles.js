import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 60px;

  @media only screen and (max-width: 600px) {
    padding: 0 20px;
  }
`;

export const Content = styled.div`
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 30px 40px;
  flex-direction: column;
  display: flex;

  h1 {
    margin-bottom: 30px;
  }

  form {
    div + div {
      margin-top: 10px;
    }

    button {
      margin-top: 30px;
      width: 100%;
    }
  }

  > p {
    text-align: center;

    a {
      color: #3f51b5;
      font-weight: 500;
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 600px) {
    margin: 90px 0 20px;
  }
`;
