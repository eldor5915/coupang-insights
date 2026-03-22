import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { mockProducts, generateStockHistory, generateSalesHistory } from "@/lib/mockData";
import { useMemo } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const stockHistory = useMemo(() => generateStockHistory(id || "1"), [id]);
  const salesHistory = useMemo(() => generateSalesHistory(id || "1"), [id]);

  if (!product) {
    return <div className="text-center py-20 text-muted-foreground">상품을 찾을 수 없습니다</div>;
  }

  return (
    <div className="space-y-8 opacity-0 animate-fade-up">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> 대시보드로 돌아가기
      </Link>

      {/* Product Info */}
      <div className="p-6 rounded-xl border border-border bg-card flex items-start gap-5">
        <div className="text-5xl">{product.thumbnail}</div>
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight">{product.name}</h1>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
            <span>₩{product.price.toLocaleString()}</span>
            <span>재고 {product.currentStock.toLocaleString()}개</span>
            <span className={`font-medium ${product.stockChange < 0 ? "text-destructive" : "text-success"}`}>
              전일대비 {product.stockChange > 0 ? "+" : ""}{product.stockChange}
            </span>
            <span className="inline-flex px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary">
              {product.deliveryType}
            </span>
          </div>
        </div>
      </div>

      {/* Stock Chart */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="font-semibold mb-6">최근 30일 재고 변동</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stockHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Line type="monotone" dataKey="stock" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="재고" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Sales Chart */}
      <div className="p-6 rounded-xl border border-border bg-card">
        <h2 className="font-semibold mb-6">일별 판매량 / 입고 추정</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Legend />
            <Bar dataKey="판매량" fill="hsl(var(--destructive))" radius={[3, 3, 0, 0]} />
            <Bar dataKey="입고추정" fill="hsl(var(--success))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
