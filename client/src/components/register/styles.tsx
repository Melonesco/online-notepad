import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: auto;
`;

export const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  background-color: rgba(37, 37, 37);
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;

  h2 {
    margin: 0 0 30px;
    padding: 0;
    color: #fff;
    text-align: center;
  }
`;

export const LoginTitle = styled.h2`
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
`;

export const UserBox = styled.div`
  position: relative;
`;

interface InputProps {
  color?: string;
}

export const Input = styled.input<InputProps>`
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;

  &::placeholder {
    color: ${(props) => props.color};
  }

  &:focus ~ label {
    top: -20px;
    left: 0;
    color: #5cdb95;
    font-size: 12px;
  }

  &:valid ~ label {
    top: -20px;
    left: 0;
    color: #5cdb95;
    font-size: 12px;
  }
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
`;

export const Button = styled.button`
  background-color: rgba(0, 0, 0, 0);
  border: none;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #5cdb95;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
  cursor: pointer;

  &:hover {
    background: #5cdb95;
    color: #000000;
    border-radius: 5px;
    box-shadow: 0 0 5px #5cdb95, 0 0 25px #5cdb95, 0 0 50px #5cdb95,
      0 0 100px #5cdb95;
  }
`;

const btnAnim1 = keyframes`
  0% {
    left: -100%;
  }
  50%,100% {
    left: 100%;
  }
`;

const btnAnim2 = keyframes`
    0% {
        top: -100%;
    }
    50%,100% {
        top: 100%;
    }
`;

const btnAnim3 = keyframes`
    0% {
        right: -100%;
    }
    50%,100% {
        right: 100%;
    }
`;

const btnAnim4 = keyframes`
    0% {
        bottom: -100%;
    }
    50%,100% {
        bottom: 100%;
    }
`;

export const Span = styled.span`
  position: absolute;
  display: block;

  &:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #5cdb95);
    animation: ${btnAnim1} 3s linear infinite;
  }

  &:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #5cdb95);
    animation: ${btnAnim2} 3s linear infinite;
    animation-delay: 0.75s;
  }

  &:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #5cdb95);
    animation: ${btnAnim3} 3s linear infinite;
    animation-delay: 1.5s;
  }

  &:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #5cdb95);
    animation: ${btnAnim4} 3s linear infinite;
    animation-delay: 2.25s;
  }
`;
