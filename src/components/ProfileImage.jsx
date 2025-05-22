import React from "react";
import classNames from "classnames";

const ProfileImage = ({ src, alt = "프로필", size = 120 }) => {
  const dynamicStyle = {
    width: `${size}px`,
    height: `${size}px`
  };

  return (
    <img
      src={src}
      alt={alt}
      style={dynamicStyle}
      className={classNames("rounded-full object-cover mt-2 shadow-md border border-gray-200")}
    />
  );
};

export default ProfileImage;
