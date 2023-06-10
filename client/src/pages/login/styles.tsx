import styled from "styled-components";

export const Login = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonAdminIcon = styled.img`
  width: 40px;
  position: absolute;
  left: 20px;
  top: 20px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 20px;
  left: 80px;
  width: 200px;
  height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  z-index: 1000;
`;

export const ModalImgClose = styled.img`
  width: 16px;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const ModalInput = styled.input`
  height: 30px;
  outline: none;
  border: none;
  border-radius: 6px;
  padding: 0 10px;
  font-size: 18px;
  background-color: #ffffff;
  width: 100%;
`;
export const ModalButton = styled.button`
  border: none;
  border-radius: 6px;
  padding: 10px 20px;
  background-color: #000000;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: #000000;
    background-color: #ffffff;
  }
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -5;
`;

export const Block = styled.div`
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 60px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Alice", sans-serif;
`;

export const Title = styled.h2`
  font-size: 36px;
  line-height: 30px;
  color: #ffffff;
`;

export const Text = styled.p`
  font-size: 14px;
  color: #ffffff;
  margin: 10px 0 30px 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 30px;
  width: 100%;
`;

export const Label = styled.label`
  position: relative;
`;

export const Input = styled.input`
  font-family: "Eczar", sans-serif;
  width: 300px;
  height: 46px;
  margin: 0 auto;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 0 10px;
  font-size: 16px;
  font-weight: 600;
`;

export const Errors = styled.p`
  position: absolute;
  color: darkred;
  bottom: -22px;
  font-size: 14px;
  font-weight: bold;
`;

export const Button = styled.button`
  font-family: "Eczar", sans-serif;
  width: 300px;
  height: 46px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  margin: 0 auto;
  background-color: #000000;
  color: #ffffff;
  border-radius: 8px;
  cursor: pointer;

  transition: all 0.3s ease;

  &:hover {
    background-color: #ffffff;
    color: #000000;
  }
`;
