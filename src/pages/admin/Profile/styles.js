import styled from 'styled-components';
import FileInputDefault from '~/components/FileInput';

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Form = styled.form`
  border-radius: 8px 8px 0 0;
  background: #fff;
  padding: 30px 0;
  height: calc(100% - 120px);
  margin-top: 120px;
  border-top: 1px solid #aaa;

  > div {
    margin: 0 auto;
    width: 700px;
    display: flex;
    flex-direction: column;
    div + div {
      margin-top: 10px;
    }

    button {
      margin-top: 10px;
      width: 150px;
      margin-left: auto;
      min-height: 40px;
    }
  }
`;

export const FileInput = styled(FileInputDefault)`
  margin: 0 auto;
  margin-top: -100px;
`;
