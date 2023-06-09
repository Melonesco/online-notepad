import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  width: 100%;
`;

export const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 10px;
`;

export const Title = styled.h2`
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
`;

export const Block = styled.div`
  border: 2px solid #000000;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
    border: 2px solid #ffffff;
  }
`;

export const Empty = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: darkred;
`;

export const NameGroup = styled.h2`
  font-size: 16px;
  font-weight: 600;
`;

export const Info = styled.p`
  font-size: 14px;
  color: #5cdb95;
`;

export const Count = styled.span`
  font-weight: bold;
`;
