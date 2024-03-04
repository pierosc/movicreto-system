import { IconButton } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import Lottie from "lottie-react";
import "./IconStyle.css";
function AnimatedIconButton({
  disabled,
  onClick,
  JSONIcon,
  inSegments = [0, 12],
  outSegments = [12, 28],
  heightIcon = 40,
}) {
  const lottieRef = useRef();
  // console.log(lottieRef);

  useEffect(() => {
    lottieRef?.current?.stop();
  }, []);

  return (
    <div
      className={
        disabled ? "animated-icon-button-disabled" : "animated-icon-button"
      }
      onMouseEnter={() => {
        // console.log(lottieRef?.current?.getDuration(true));
        if (!disabled) {
          lottieRef?.current?.playSegments(inSegments, true);
        }
      }}
      onMouseLeave={() => {
        // setInOut(false);
        if (!disabled) {
          lottieRef?.current?.playSegments(outSegments, true);
        }
      }}
      style={{ borderRadius: "50%" }}
    >
      <IconButton
        disabled={disabled}
        onClick={onClick}
        // sx={{
        //   color: isItemSelected
        //     ? tableStyle.labelColor("selected", settings)
        //     : tableStyle.labelColor("normal", settings),
        // }}
      >
        <Lottie
          animationData={JSONIcon}
          lottieRef={lottieRef}
          loop={false}
          style={{ height: `${heightIcon}px` }}
        />
      </IconButton>
    </div>
  );
}

export default AnimatedIconButton;
