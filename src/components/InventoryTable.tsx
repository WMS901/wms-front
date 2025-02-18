import React from "react";

const InventoryTable = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>상품 ID</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>입고 날짜</th>
            <th>이름</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}원</td>
                <td>{item.receivedDate}</td>
                <td>{item.receivedBy}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>📢 데이터 없음</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;