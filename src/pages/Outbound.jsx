import React, { useState, useEffect } from "react";
import "../styles/Inventory.css";

const Outbound = () => {
  // const [outboundData, setOutboundData] = useState([]);

  // useEffect(() => {
  //   fetchOutboundData();
  // }, []);

  // const fetchOutboundData = async () => {
  //   try {
  //     const response = await fetch("https://api.sol-wms.store/api/outbound");
  //     if (!response.ok) throw new Error("조회 실패");

  //     const data = await response.json();
  //     setOutboundData(data.content || []);
  //   } catch (error) {
  //     console.error("🚨 오류 발생:", error);
  //   }
  // };


  // return (
  //   <div className="inventory-container">
  //     <main className="inventory-content">

  //       <h1>📦 출고 관리</h1>
  //       <div className="table-wrapper">
  //         <InventoryTable data={inboundData} type="outbound" />
  //       </div>
  //     </main>
  //   </div>
    
  // );
};

export default Outbound;
