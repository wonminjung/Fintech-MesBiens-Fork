import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import C from "./style";

interface Stock {
  name: string;
  purchasePrice: number;
  currentPrice: number;
  quantity: number;
}

const stocks: Stock[] = [
  { name: "삼성전자", purchasePrice: 60000, currentPrice: 65000, quantity: 10 },
  { name: "카카오", purchasePrice: 85000, currentPrice: 80000, quantity: 5 },
];

const StockChart: React.FC = () => {
  const [portfolioChart, setPortfolioChart] = useState<Chart | null>(null);
  const stockListElement = useRef<HTMLTableSectionElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    updatePortfolio();
  }, []);

  const updatePortfolio = () => {
    let totalValue = 0;
    let totalGrowth = 0;
    let totalQuantity = 0;

    const stockLabels: string[] = [];
    const stockValues: number[] = [];

    if (stockListElement.current) {
      stockListElement.current.innerHTML = ""; // 기존 리스트 초기화

      stocks.forEach((stock) => {
        const stockValue = stock.currentPrice * stock.quantity;
        totalValue += stockValue;
        totalGrowth +=
          ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) *
          100 *
          stock.quantity;
        totalQuantity += stock.quantity;

        stockLabels.push(stock.name);
        stockValues.push(stockValue);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${stock.name}</td>
          <td>${stock.currentPrice.toLocaleString()}원</td>
          <td>${(
            stock.currentPrice - stock.purchasePrice
          ).toLocaleString()}원</td>
          <td>${(
            ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) *
            100
          ).toFixed(2)}%</td>
          <td>${stockValue.toLocaleString()}원</td>
        `;
        // stockListElement.current.appendChild(row);
      });

      const averageGrowth = totalGrowth / totalQuantity;
      (
        document.getElementById("totalValue") as HTMLElement
      ).textContent = `${totalValue.toLocaleString()}원`;
      (
        document.getElementById("averageGrowth") as HTMLElement
      ).textContent = `${averageGrowth.toFixed(2)}%`;

      createChart(stockLabels, stockValues);
    }
  };

  const createChart = (labels: string[], data: number[]) => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      if (ctx) {
        // 이미 차트가 있으면 삭제
        if (portfolioChart) {
          portfolioChart.destroy();
        }

        const newChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                backgroundColor: ["#4caf50", "#f44336", "#ff9800", "#2196f3"],
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem: any) {
                    return `${labels[tooltipItem.dataIndex]}: ${data[
                      tooltipItem.dataIndex
                    ].toLocaleString()}원`;
                  },
                },
              },
            },
          },
        });

        setPortfolioChart(newChart);
      }
    }
  };

  return (
    <C.PortfolioContent>
      {/* <h1>포트폴리오</h1> */}
      <p>여기에 사용자의 포트폴리오 정보를 표시합니다.</p>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>현재 가격</th>
            <th>변동</th>
            <th>변동률</th>
            <th>총 가치</th>
          </tr>
        </thead>
        <tbody id="stockList" ref={stockListElement}></tbody>
      </table>
      <div>
        총 가치: <span id="totalValue"></span>
      </div>
      <div>
        평균 성장률: <span id="averageGrowth"></span>
      </div>
      <C.Circle id="portfolioChart" ref={chartRef}></C.Circle>
    </C.PortfolioContent>
  );
};

export default StockChart;
