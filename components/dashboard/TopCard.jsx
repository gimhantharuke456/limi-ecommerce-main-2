import React from "react";

const TopCard = async ({ title, subtitle, icon }) => {
  return (
    <div
      style={{
        flex: 1,
        height: "100%",
        backgroundColor: "#1E293B",
        borderRadius: 12,
        display: "flex",
        gap: 32,
        padding: 32,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <h1 style={{ fontSize: 32, fontWeight: "bold" }}>{title}</h1>
        <h3 style={{ fontSize: 24 }}>{subtitle}</h3>
      </div>
      <div style={{ width: 100, height: 100 }}>
        <img src={icon} />
      </div>
    </div>
  );
};

export default TopCard;
