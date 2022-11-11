import React from "react";

import styles from "./DashBoard.module.css";

function SummaryCard({ image, title, count }: any) {
  return (
    <div className={styles.card}>
      <div style={{ marginLeft: "10px" }}>
        <img src={image} />
      </div>
      <div style={{ marginLeft: "10px" }}>
        <div className={styles.summarycount}>{count ?? 0}</div>
        <div className={styles.summarytitle}>{title}</div>
      </div>
    </div>
  );
}

export default SummaryCard;
