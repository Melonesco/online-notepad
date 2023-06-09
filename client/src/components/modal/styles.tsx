import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  max-width: 90%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  height: 600px;
  overflow: auto;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  display: inline-block;
  position: relative;
`;

export const ButtonDeleteGroup = styled.button`
  position: absolute;
  right: -160px;
  top: 50%;
  transform: translateY(-50%);
  background-color: darkred;
  border: none;
  color: #ffffff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #000000;
  }
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

export const Blocks = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: left;
`;

export const BLock = styled.div`
  text-align: center;
  width: 45%;
`;

export const List = styled.div`
  margin: 10px 0;
  border: 1px solid black;
  border-radius: 0 5px 5px 0;
  padding: 0 0 0 5px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.p`
  letter-spacing: 1px;
  margin-top: 4px;
  padding-bottom: 2px;
`;

export const Numbers = styled.span`
  font-weight: bold;
`;

export const ButtonDelete = styled.button`
  border: none;
  padding: 0 10px;
  background-color: darkred;
  color: #ffffff;
  height: 30px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: red;
  }
`;

export const Empty = styled.div`
  margin-top: 40px;
  font-size: 32px;
  color: darkred;
  font-weight: bold;
`;
