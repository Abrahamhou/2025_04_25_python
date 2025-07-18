# 職能發展學院 - 課程分類頁籤組件技術需求
概述
此組件為一個見證/推薦卡片的網格佈局，用於展示用戶推薦內容。設計為響應式網頁元素，可獨立使用或嵌入到現有網頁中。

設計規格
整體佈局
容器寬度: 1200px (桌面版)
內邊距: 64px (上下左右)
卡片間距: 48px
背景色: 白色 (#FFFFFF)
卡片網格
桌面版佈局: 3列2行，共6張卡片
卡片排列: 水平伸展，自動換行
卡片間距: 48px (水平和垂直)
單張卡片規格
背景色: 白色 (#FFFFFF)
邊框: 1px 實線 #D9D9D9
圓角: 8px
內邊距: 24px
元素間距: 24px (引言與作者信息之間)
卡片內容結構
1. 引言文字
字體: Inter
字重: 600 (Semi-bold)
字號: 24px
行高: 1.2em
字間距: -2%
顏色: #1E1E1E
佔位文字: "Quote"
2. 作者信息區塊
佈局: 水平排列
間距: 12px (頭像與文字信息間)
總寬度: 139px
頭像
尺寸: 40px × 40px
形狀: 圓形 (border-radius: 50%)
類型: 圖片或字母縮寫
預設: 字母 "F"
文字信息
佈局: 垂直排列
間距: 2px (標題與描述間)
標題
字體: Inter
字重: 600 (Semi-bold)
字號: 16px
行高: 1.4em
顏色: #757575
佔位文字: "Title"
描述
字體: Inter
字重: 400 (Regular)
字號: 16px
行高: 1.4em
顏色: #B3B3B3
佔位文字: "Description"
響應式設計需求
桌面版 (≥1200px)
3列2行網格佈局
容器寬度: 1200px
內邊距: 64px
平板版 (768px - 1199px)
2列3行網格佈局
容器寬度: 100%
內邊距: 48px
卡片間距: 32px
手機版 (≤767px)
1列6行網格佈局
容器寬度: 100%
內邊距: 24px
卡片間距: 24px
字號調整:
引言文字: 20px
作者標題/描述: 14px
技術實作建議
HTML 結構
<section class="testimonial-grid">
  <div class="card-grid">
    <div class="testimonial-card">
      <div class="quote-text">Quote</div>
      <div class="author-block">
        <div class="avatar">
          <img src="..." alt="..." />
        </div>
        <div class="author-info">
          <div class="author-title">Title</div>
          <div class="author-description">Description</div>
        </div>
      </div>
    </div>
    <!-- 重複5次 -->
  </div>
</section>
CSS 框架建議
使用 CSS Grid 或 Flexbox 實現響應式佈局
使用 CSS Custom Properties 管理顏色和尺寸變數
使用媒體查詢實現斷點響應
內容管理
支援動態內容載入
頭像支援圖片URL或字母縮寫
文字內容支援HTML標籤
預設佔位內容機制
瀏覽器支援
Chrome 90+
Firefox 88+
Safari 14+
Edge 90+
無障礙需求
適當的語義化HTML標籤
圖片alt屬性
鍵盤導航支援
色彩對比度符合WCAG 2.1 AA標準
性能考量
圖片懶載入
CSS最佳化
響應式圖片支援
避免佈局偏移(CLS)
測試需求
跨瀏覽器相容性測試
響應式設計測試(多種設備尺寸)
無障礙功能測試
性能測試(載入速度、渲染性能)