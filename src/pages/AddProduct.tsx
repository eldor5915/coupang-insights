import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function AddProduct() {
  const [urls, setUrls] = useState("");

  const handleAdd = () => {
    if (!urls.trim()) return;
    toast.success("상품이 추가되었습니다", { description: "수집이 시작됩니다." });
    setUrls("");
  };

  return (
    <div className="max-w-2xl space-y-8 opacity-0 animate-fade-up">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">상품 추가</h1>
        <p className="text-muted-foreground text-sm mt-1">모니터링할 쿠팡 상품 URL을 입력하세요</p>
      </div>

      <div className="p-6 rounded-xl border border-border bg-card space-y-4">
        <div className="space-y-2">
          <Label>상품 URL</Label>
          <Textarea
            placeholder={"https://www.coupang.com/vp/products/...\nhttps://www.coupang.com/vp/products/..."}
            rows={6}
            value={urls}
            onChange={e => setUrls(e.target.value)}
            className="font-mono text-sm"
          />
          <p className="text-xs text-muted-foreground">한 줄에 하나의 URL을 입력하세요</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground tabular-nums">
            <span className="font-medium text-foreground">32</span> / 100개 사용 중
          </span>
          <Button onClick={handleAdd} className="active:scale-[0.97] transition-transform">
            추가
          </Button>
        </div>
      </div>
    </div>
  );
}
