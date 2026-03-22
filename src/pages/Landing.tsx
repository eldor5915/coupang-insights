import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, TrendingUp, Check, Sun, Moon, ArrowRight } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useState, useMemo } from "react";
import { generateStockHistory, generateSalesHistory } from "@/lib/mockData";
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const features = [
  { id: "stock", icon: Package, title: "실시간 재고 추적", desc: "경쟁사 상품의 재고 변동을 매시간 자동 수집하여 정확한 데이터를 제공합니다." },
  { id: "sales", icon: BarChart3, title: "판매량 분석", desc: "재고 감소분을 기반으로 일별 판매량을 추정하고 패턴을 분석합니다." },
  { id: "trend", icon: TrendingUp, title: "트렌드 차트", desc: "30일간의 재고·판매 추이를 시각화하여 시장 동향을 한눈에 파악합니다." },
];

const plans = [
  { name: "Starter", price: "49,000", count: "30개", features: ["재고 추적", "일별 판매량", "이메일 알림"] },
  { name: "Pro", price: "99,000", count: "100개", popular: true, features: ["Starter 포함", "시간별 추적", "트렌드 리포트", "Slack 알림"] },
  { name: "Business", price: "199,000", count: "300개", features: ["Pro 포함", "API 연동", "전담 매니저", "커스텀 리포트"] },
];

function FeaturePreview({ activeId }: { activeId: string }) {
  const stockData = useMemo(() => generateStockHistory("1"), []);
  const salesData = useMemo(() => generateSalesHistory("1"), []);

  const trendData = useMemo(() => {
    return stockData.map((item, i) => ({
      date: item.date,
      재고: item.stock,
      판매량: salesData[i]?.판매량 || 0,
      이동평균: i >= 6
        ? Math.round(salesData.slice(i - 6, i + 1).reduce((s, d) => s + d.판매량, 0) / 7)
        : null,
    }));
  }, [stockData, salesData]);

  const chartTooltipStyle = {
    backgroundColor: "hsl(var(--card))",
    border: "1px solid hsl(var(--border))",
    borderRadius: "8px",
    fontSize: "13px",
  };

  if (activeId === "stock") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm">삼성 갤럭시 버즈3 프로</h4>
            <p className="text-xs text-muted-foreground mt-0.5">최근 30일 재고 변동 추이</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />현재 재고 <span className="font-bold tabular-nums">1,247</span>
            </span>
            <span className="flex items-center gap-1.5 text-destructive font-medium">▼ 89</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={stockData}>
            <defs>
              <linearGradient id="stockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Area type="monotone" dataKey="stock" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#stockGrad)" name="재고" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (activeId === "sales") {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-sm">일별 판매량 / 입고 추정</h4>
            <p className="text-xs text-muted-foreground mt-0.5">재고 감소 = 판매, 재고 증가 = 입고 추정</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" />판매량</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-success" />입고추정</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip contentStyle={chartTooltipStyle} />
            <Bar dataKey="판매량" fill="hsl(var(--destructive))" radius={[3, 3, 0, 0]} />
            <Bar dataKey="입고추정" fill="hsl(var(--success))" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // trend
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-sm">재고 & 판매 트렌드</h4>
          <p className="text-xs text-muted-foreground mt-0.5">7일 이동평균으로 패턴을 한눈에 파악</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary" />재고</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-destructive" />판매량</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded bg-amber-400" />이동평균</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={trendData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Line yAxisId="left" type="monotone" dataKey="재고" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="판매량" stroke="hsl(var(--destructive))" strokeWidth={1.5} dot={false} />
          <Line yAxisId="right" type="monotone" dataKey="이동평균" stroke="#FBBF24" strokeWidth={2} strokeDasharray="6 3" dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Landing() {
  const { isDark, toggle } = useTheme();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <span className="text-xl font-bold tracking-tight">
            <span className="text-primary">Coupang</span>Spy
          </span>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="p-2 rounded-md hover:bg-accent transition-colors">
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <Link to="/login">
              <Button variant="ghost" size="sm">로그인</Button>
            </Link>
            <Link to="/login">
              <Button size="sm">무료 체험</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-24 pb-20 text-center">
        <div className="max-w-3xl mx-auto opacity-0 animate-fade-up">
          <div className="inline-block mb-6 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            쿠팡 셀러를 위한 #1 경쟁 분석 도구
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6">
            경쟁사 쿠팡 판매량,{" "}
            <br className="hidden sm:block" />
            정확하게 파악하세요
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            실시간 재고 모니터링으로 경쟁사의 판매량과 입고 패턴을 추적하세요. 데이터 기반의 정확한 의사결정이 가능합니다.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/login">
              <Button size="lg" className="px-8 h-12 text-base font-semibold active:scale-[0.97] transition-transform">
                무료 체험 시작
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="px-8 h-12 text-base active:scale-[0.97] transition-transform">
                데모 보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features — interactive */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4">
            {features.map((f, i) => {
              const isActive = activeFeature === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFeature(isActive ? null : f.id)}
                  className={`group text-left p-5 rounded-xl border transition-all duration-300 opacity-0 animate-fade-up active:scale-[0.97] ${
                    isActive
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                      : "border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
                  }`}
                  style={{ animationDelay: `${200 + i * 100}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      isActive ? "bg-primary/20" : "bg-primary/10 group-hover:bg-primary/20"
                    }`}>
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <ArrowRight className={`h-4 w-4 mt-1 text-muted-foreground transition-transform duration-300 ${
                      isActive ? "rotate-90 text-primary" : "group-hover:translate-x-0.5"
                    }`} />
                  </div>
                  <h3 className="font-semibold text-base mt-3 mb-1.5">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </button>
              );
            })}
          </div>

          {/* Preview panel */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${
              activeFeature ? "max-h-[400px] opacity-100 mt-6" : "max-h-0 opacity-0 mt-0"
            }`}
          >
            <div className="p-6 rounded-xl border border-primary/20 bg-card shadow-xl shadow-primary/5">
              {activeFeature && <FeaturePreview activeId={activeFeature} />}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">합리적인 가격</h2>
        <p className="text-muted-foreground text-center mb-12">비즈니스 규모에 맞는 플랜을 선택하세요</p>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative p-6 rounded-xl border bg-card opacity-0 animate-fade-up ${
                plan.popular ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]" : "border-border"
              }`}
              style={{ animationDelay: `${400 + i * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                  인기
                </div>
              )}
              <h3 className="font-semibold text-lg mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">상품 {plan.count}</p>
              <div className="mb-6">
                <span className="text-3xl font-bold">₩{plan.price}</span>
                <span className="text-muted-foreground text-sm"> /월</span>
              </div>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link to="/login">
                <Button variant={plan.popular ? "default" : "outline"} className="w-full active:scale-[0.97] transition-transform">
                  시작하기
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          © 2026 CoupangSpy. 모든 권리 보유.
        </div>
      </footer>
    </div>
  );
}
