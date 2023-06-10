import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 100px;
`;

export const ButtonLogOut = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: white;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    background-color: darkred;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px 30px;
  overflow: auto;
  position: relative;
`;

export const Title = styled.h2`
  color: #ffffff;
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
`;

export const Block = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 40px;
`;

export const ButtonSubmit = styled.button`
  outline: none;
  border: 2px solid #5cdb95;
  height: 36px;
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #5cdb95;

  transition: all 0.2s ease;

  &:hover {
    background-color: #ffffff;
  }
`;

export const InputForGroup = styled.input`
  outline: none;
  height: 36px;
  font-size: 16px;
  border: 2px solid #5cdb95;
  border-radius: 8px;
  padding: 0 10px;
`;

export const Subjects = styled.div`
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
  color: #ffffff;
`;

export const Count = styled.div`
  width: 20px;
  display: inline-block;
  text-align: center;
`;

interface IButtonClick {
  cursor: string;
  backgroundColor: string;
  color: string;
}

export const ButtonClick = styled.button<IButtonClick>`
  border: none;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  cursor: ${(props) => props.cursor};
`;

export const Icons = styled.img`
  width: 16px;
  height: 16px;
`;

export const Links = styled(Link)`
  position: absolute;
  top: 20px;
  right: 20px;
  color: #ffffff;
  background-color: darkred;
  padding: 10px;
  border-radius: 5px;
  font-weight: bold;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;
