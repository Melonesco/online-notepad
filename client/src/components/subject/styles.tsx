import styled from "styled-components";

export const Numbers = styled.p`
  font-size: 24px;
  width: 18px;
  text-align: center;
  border-bottom: 2px solid #ffffff;
  color: #ffffff;
`;

export const Input = styled.input`
  height: 40px;
  width: 260px;
  font-size: 18px;
  font-weight: bold;
  color: #262626;
  outline: none;
  border: none;
  border-radius: 6px;
  padding: 0 10px;
  background-color: burlywood;

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
  }
`;

export const InputPoint = styled(Input)`
  width: 50px;
  height: 36px;
  text-align: center;
  padding: 0;
`;

export const Blocks = styled.div`
  margin: 0 40px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 6px;
  background-color: darkslategrey;
  padding: 20px 10px;
  width: 100%;
`;

export const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
  gap: 15.4px;
`;

export const BonusTasks = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ButtonPlusAndMinus = styled.button`
  background-color: #4caf50;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
  }
`;

export const IconsMinusAndPlus = styled.img`
  width: 16px;
  height: 16px;
`;

export const Labs = styled.div`
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

export const CountByLabs = styled.div`
  display: inline-block;
  width: 16px;
  font-weight: 600;
  position: relative;
  color: burlywood;
`;

export const Info = styled.p`
  text-align: center;
  padding-right: 10px;
  font-weight: bold;
`;

interface IButtonClick {
  backgroundColor: string;
}

export const ButtonClick = styled.button<IButtonClick>`
  outline: none;
  border: none;
  width: 50px;
  height: 36px;
  border-radius: 4px;
  background-color: ${(props) => props.backgroundColor};
  cursor: pointer;
  font-weight: bold;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
  }
`;
