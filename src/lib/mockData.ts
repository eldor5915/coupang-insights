// Mock data for the entire application
export interface Product {
  id: string;
  name: string;
  thumbnail: string;
  currentStock: number;
  stockChange: number;
  price: number;
  deliveryType: string;
  category: string;
}

export const mockProducts: Product[] = [
  { id: "1", name: "삼성 갤럭시 버즈3 프로 무선 이어폰", thumbnail: "🎧", currentStock: 1247, stockChange: -89, price: 259000, deliveryType: "로켓배송", category: "전자기기" },
  { id: "2", name: "나이키 에어맥스 97 남성 런닝화", thumbnail: "👟", currentStock: 342, stockChange: -45, price: 179000, deliveryType: "로켓배송", category: "패션" },
  { id: "3", name: "LG 퓨리케어 공기청정기 AS300DWFA", thumbnail: "🌀", currentStock: 56, stockChange: +120, price: 549000, deliveryType: "로켓배송", category: "가전" },
  { id: "4", name: "오뚜기 진라면 매운맛 40개입", thumbnail: "🍜", currentStock: 8934, stockChange: -312, price: 24900, deliveryType: "로켓배송", category: "식품" },
  { id: "5", name: "애플 아이패드 프로 11인치 M4", thumbnail: "📱", currentStock: 189, stockChange: -23, price: 1499000, deliveryType: "판매자배송", category: "전자기기" },
  { id: "6", name: "다이슨 V15 디텍트 무선청소기", thumbnail: "🧹", currentStock: 73, stockChange: -18, price: 899000, deliveryType: "로켓배송", category: "가전" },
  { id: "7", name: "코카콜라 제로 355ml 24캔", thumbnail: "🥤", currentStock: 4521, stockChange: -567, price: 18900, deliveryType: "로켓배송", category: "식품" },
  { id: "8", name: "무인양품 에센셜 오일 디퓨저", thumbnail: "🕯️", currentStock: 234, stockChange: +45, price: 39900, deliveryType: "판매자배송", category: "생활" },
  { id: "9", name: "로지텍 MX Master 3S 마우스", thumbnail: "🖱️", currentStock: 412, stockChange: -67, price: 129000, deliveryType: "로켓배송", category: "전자기기" },
  { id: "10", name: "스타벅스 홀빈 하우스 블렌드 1.13kg", thumbnail: "☕", currentStock: 1893, stockChange: -234, price: 32900, deliveryType: "로켓배송", category: "식품" },
];

// Generate 30 days of mock stock data
export function generateStockHistory(productId: string) {
  const product = mockProducts.find(p => p.id === productId);
  const baseStock = product ? product.currentStock + 500 : 1000;
  const data = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = Math.floor(Math.random() * 200) - 80;
    const stock = Math.max(10, baseStock + variation - (29 - i) * 15);
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      stock,
    });
  }
  return data;
}

export function generateSalesHistory(productId: string) {
  const data = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const sales = Math.floor(Math.random() * 80) + 5;
    const restock = Math.random() > 0.8 ? Math.floor(Math.random() * 150) + 20 : 0;
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      판매량: sales,
      입고추정: restock,
    });
  }
  return data;
}

export const summaryData = {
  totalProducts: 87,
  collectedProducts: 84,
  todaySales: 1423,
  restockDetected: 3,
};
