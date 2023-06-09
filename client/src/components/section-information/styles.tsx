import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  height: 100%;
  max-height: 600px;
  overflow: auto;
  background-color: rgba(37, 37, 37);
  padding: 30px;
  border-radius: 5px;
`;

export const Title = styled.h2`
  text-align: center;
  color: #ffffff;
`;

export const Blocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

export const Block = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border: 1px solid #5cdb95;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #5cdb95;
  }
`;

export const Empty = styled.div`
  width: 100%;
  text-align: center;
  color: darkred;
  font-size: 32px;
  font-weight: bold;
`;

export const NameGroup = styled.h2`
  color: #ffffff;
  font-size: 20px;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const CountBySubjects = styled.p`
  font-size: 14px;
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

export const CountByUsers = styled.p`
  font-size: 14px;
  width: 150px;
  display: flex;
  justify-content: space-between;
`;

export const Span = styled.span`
  color: #ffffff;
  font-weight: bold;
`;
