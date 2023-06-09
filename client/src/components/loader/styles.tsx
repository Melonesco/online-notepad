import styled, { keyframes } from "styled-components";

export const Block = styled.div`
  position: absolute;
  background-color: #262626;
  z-index: 100;
  width: 100%;
`;

export const Center = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const animateC = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const animate = keyframes`
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
`;

export const Loader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 120px;
  font-family: sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
  color: #00eaff;
  text-transform: uppercase;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  box-sizing: unset;

  &:before {
    content: "";
    position: absolute;
    top: -3px;
    left: -3px;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-top: 3px solid #00eaff;
    border-right: 3px solid #00eaff;
    border-radius: 50%;
    animation: ${animateC} 2s linear infinite;
    box-sizing: unset;
  }

  span {
    display: block;
    position: absolute;
    top: calc(50% - 2px);
    left: 50%;
    width: 50%;
    height: 4px;
    background: transparent;
    transform-origin: left;
    animation: ${animate} 2s linear infinite;

    &:before {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #00eaff;
      top: -6px;
      right: -8px;
      box-shadow: 0 0 20px #00eaff;
    }
  }
`;
