import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 100px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px 30px;
  overflow: auto;
`;

export const Title = styled.h2`
  font-size: 36px;
  text-align: center;
  color: #ffffff;
  margin-bottom: 30px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-top: 40px;
`;

export const Tr = styled.tr`
  background-color: #f2f2f2;
`;

export const Th = styled.th`
  background-color: #000000;
  color: white;
  text-align: center;
  padding: 4px;
  font-size: 12px;
  border: 1px solid black;
`;

interface ITd {
  backgroundColor?: string;
  cursor?: string;
}

export const Td = styled.td<ITd>`
  position: relative;
  padding: 8px 4px;
  font-size: 12px;
  border: 1px solid black;
  background-color: ${(props) => props.backgroundColor};
  cursor: ${(props) => props.cursor};
  text-align: right;

  &:first-child {
    text-align: left;
  }
`;

interface ButtonOpenProps {
  cursor?: string;
}

export const ButtonOpen = styled.button<ButtonOpenProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  padding: 4px;
  text-align: right;
  background-color: transparent;
  cursor: ${(props) => props.cursor};
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 30%;
  background-color: darkslateblue;
  border-radius: 6px;
  padding: 10px 15px;
`;

export const ModalTitle = styled.h2`
  color: #ffffff;
  text-align: center;
`;

export const ButtonClose = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  outline: none;
  border: none;
  background-color: darkred;
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  padding: 4px;
  transition: all 0.2s linear;

  &:hover {
    background-color: #5cdb95;
  }
`;

export const BlockField = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputInModal = styled.input`
  height: 36px;
  font-size: 16px;
  border: 1px solid #5cdb95;
  border-radius: 4px 0 0 4px;
  padding: 0 10px;
  border-right: none;
  outline: none;
`;

export const ButtonApply = styled.button`
  font-size: 16px;
  font-weight: bold;
  height: 36px;
  padding: 0 10px;
  border: 1px solid #5cdb95;
  border-left: none;
  border-radius: 0 4px 4px 0;
  background-color: #5cdb95;
  cursor: pointer;

  transition: all 0.2s linear;

  &:hover {
    border: 1px solid darkred;
    border-left: none;
    color: #ffffff;
    background-color: darkred;
  }
`;

export const GeneralPoint = styled.div`
  background-color: yellowgreen;
  margin: 60px auto;
  padding: 40px 20px;
  width: 200px;
  text-align: center;
  border-radius: 4px;
  font-weight: bold;
`;
