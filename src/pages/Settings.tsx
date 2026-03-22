import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <div className="max-w-2xl space-y-8 opacity-0 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">설정</h1>
        <p className="text-muted-foreground text-sm mt-1">계정 및 서비스 설정을 관리하세요</p>
      </div>

      {/* Profile */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-semibold">프로필</h2>
        <div className="grid gap-3 text-sm">
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">이메일</span>
            <span>seller@example.com</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border">
            <span className="text-muted-foreground">이름</span>
            <span>김민수</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">가입일</span>
            <span>2025년 11월 3일</span>
          </div>
        </div>
      </div>

      {/* Plan */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-semibold">플랜 현황</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-primary">Pro 플랜</p>
            <p className="text-sm text-muted-foreground">100개 상품 · 시간별 수집</p>
          </div>
          <span className="text-sm text-muted-foreground tabular-nums">₩99,000/월</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: "32%" }} />
        </div>
        <p className="text-xs text-muted-foreground">32 / 100개 상품 사용 중</p>
      </div>

      {/* Collection Schedule */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <h2 className="font-semibold">수집 설정</h2>
        <div className="flex items-center justify-between">
          <Label>수집 주기</Label>
          <Select defaultValue="1h">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30m">30분</SelectItem>
              <SelectItem value="1h">1시간</SelectItem>
              <SelectItem value="3h">3시간</SelectItem>
              <SelectItem value="6h">6시간</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-xl border border-border bg-card space-y-5">
        <h2 className="font-semibold">알림</h2>
        {[
          { label: "재고 소진 알림", desc: "상품 재고가 0이 되면 알림", defaultChecked: true },
          { label: "입고 감지 알림", desc: "대량 입고 감지 시 알림", defaultChecked: true },
          { label: "가격 변동 알림", desc: "가격이 5% 이상 변동 시 알림", defaultChecked: false },
          { label: "이메일 리포트", desc: "일간 요약 리포트 이메일 발송", defaultChecked: false },
        ].map(n => (
          <div key={n.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">{n.label}</p>
              <p className="text-xs text-muted-foreground">{n.desc}</p>
            </div>
            <Switch defaultChecked={n.defaultChecked} />
          </div>
        ))}
      </div>
    </div>
  );
}
