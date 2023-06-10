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
  margin-bottom: 30px;
`;

export const Blocks = styled.div`
  display: flex;
  gap: 60px;
  justify-content: space-between;
`;

export const Block = styled.div`
  width: 100%;
  display: flex;
  gap: 60px;
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
