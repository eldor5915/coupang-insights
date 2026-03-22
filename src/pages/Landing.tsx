import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package, BarChart3, TrendingUp, Check, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

const features = [
  { icon: Package, title: "실시간 재고 추적", desc: "경쟁사 상품의 재고 변동을 매시간 자동 수집하여 정확한 데이터를 제공합니다." },
  { icon: BarChart3, title: "판매량 분석", desc: "재고 감소분을 기반으로 일별 판매량을 추정하고 패턴을 분석합니다." },
  { icon: TrendingUp, title: "트렌드 차트", desc: "30일간의 재고·판매 추이를 시각화하여 시장 동향을 한눈에 파악합니다." },
];

const plans = [
  { name: "Starter", price: "49,000", count: "30개", features: ["재고 추적", "일별 판매량", "이메일 알림"] },
  { name: "Pro", price: "99,000", count: "100개", popular: true, features: ["Starter 포함", "시간별 추적", "트렌드 리포트", "Slack 알림"] },
  { name: "Business", price: "199,000", count: "300개", features: ["Pro 포함", "API 연동", "전담 매니저", "커스텀 리포트"] },
];

export default function Landing() {
  const { isDark, toggle } = useTheme();

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

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 opacity-0 animate-fade-up"
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
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
