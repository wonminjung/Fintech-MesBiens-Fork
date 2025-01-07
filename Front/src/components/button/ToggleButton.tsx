import React, { useState } from "react";
import { TButton } from "./style";

interface ToggleBtnProps {
  onClick: () => void;
  children: React.ReactNode;
}

const ToggleBtn: React.FC<ToggleBtnProps> = ({ onClick, children }) => {
  const [toggled, setToggled] = useState(false);

  const handleClick = () => {
    setToggled(!toggled);
    onClick(); // 부모 컴포넌트의 onClick 호출
  };

  return (
    <TButton.ToggleBtnContainer>
      <TButton.ToggleBtn
        className={toggled ? "toggled" : ""}
        onClick={handleClick}
      >
        <TButton.Thumb></TButton.Thumb>
      </TButton.ToggleBtn>
    </TButton.ToggleBtnContainer>
  );
};

export default ToggleBtn;
