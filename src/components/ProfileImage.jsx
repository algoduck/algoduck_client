// src/components/ProfileImage.jsx
import React from "react";

const ProfileImage = ({ src, alt = "프로필", size = 120 }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        objectFit: "cover",
        marginTop: "10px"
      }}
    />
  );
};

export default ProfileImage;
