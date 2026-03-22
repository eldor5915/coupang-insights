import { Link } from "react-router-dom";
import { Package, CheckCircle2, ShoppingCart, Truck } from "lucide-react";
import { mockProducts, summaryData } from "@/lib/mockData";

const stats = [
  { label: "총 상품수", value: summaryData.totalProducts, icon: Package, suffix: "개" },
  { label: "수집완료", value: summaryData.collectedProducts, icon: CheckCircle2, suffix: "개" },
  { label: "오늘 총 판매량", value: summaryData.todaySales.toLocaleString(), icon: ShoppingCart, suffix: "개" },
  { label: "입고 감지", value: summaryData.restockDetected, icon: Truck, suffix: "건" },
];

export default function Dashboard() {
  return (
    <div className="space-y-8 opacity-0 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground text-sm mt-1">경쟁사 상품 현황을 한눈에 확인하세요</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className="p-5 rounded-xl border border-border bg-card opacity-0 animate-fade-up"
            style={{ animationDelay: `${100 + i * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold tabular-nums">
              {s.value}<span className="text-sm font-normal text-muted-foreground ml-1">{s.suffix}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Product Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-semibold">모니터링 상품</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium"></th>
                <th className="px-5 py-3 font-medium">상품명</th>
                <th className="px-5 py-3 font-medium text-right">현재 재고</th>
                <th className="px-5 py-3 font-medium text-right">전일대비</th>
                <th className="px-5 py-3 font-medium text-right">가격</th>
                <th className="px-5 py-3 font-medium">배송</th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer opacity-0 animate-fade-up"
                  style={{ animationDelay: `${300 + i * 50}ms` }}
                >
                  <td className="px-5 py-3.5">
                    <Link to={`/dashboard/product/${p.id}`} className="text-2xl">
                      {p.thumbnail}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <Link to={`/dashboard/product/${p.id}`} className="hover:text-primary transition-colors font-medium">
                      {p.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-medium">{p.currentStock.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-right tabular-nums font-medium">
                    <span className={p.stockChange < 0 ? "text-destructive" : "text-success"}>
                      {p.stockChange > 0 ? "+" : ""}{p.stockChange}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right tabular-nums">₩{p.price.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      p.deliveryType === "로켓배송"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {p.deliveryType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
