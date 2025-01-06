import React, { useState } from "react";
import { TButton } from "./style";

function ToggleBtn() {
  const [toggled, setToggled] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TButton.ToggleBtnContainer>
        <TButton.ToggleBtn
          className={toggled ? "toggled" : ""}
          onClick={() => setToggled(!toggled)}
        >
          <TButton.Thumb></TButton.Thumb>
        </TButton.ToggleBtn>
      </TButton.ToggleBtnContainer>
    </div>
  );
}

export default ToggleBtn;
