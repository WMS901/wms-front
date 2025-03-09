import React from "react";

const InventoryTable = ({ data }) => {
  return (
    <div className="table-wrapper">
      <table className="inventory-table">
        <thead>
          <tr>
            <th>상품 코드</th>
            <th>상품명</th>
            <th>카테고리</th>
            <th>수량</th>
            <th>가격</th>
            <th>공급업체</th>
            <th>위치</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.sku || "-"}</td>
                <td>{item.name || "-"}</td>
                <td>{item.category || "-"}</td>
                <td>{item.quantity || 0}</td>
                <td>{item.price ? `${item.price.toLocaleString()} 원` : "-"}</td>
                <td>{item.supplier || "-"}</td>
                <td>{item.location || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>📢 데이터 없음</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
