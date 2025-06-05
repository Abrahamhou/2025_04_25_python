# 職能發展學院 - 課程分類頁籤組件技術需求

## 專案概述
本文件定義職能發展學院網站中課程分類頁籤組件的技術實現需求。該組件為網頁內容的局部元素，提供「一般課程」和「進階課程」兩個分類的切換功能，需支援桌機版和手機版的響應式設計。

## 設計規格分析

### 視覺結構
- **組件類型**：水平頁籤導航列
- **頁籤數量**：2個（一般課程、進階課程）
- **整體尺寸**：1174px × 53px（桌機版）
- **佈局方式**：左對齊排列，自適應寬度

### 設計 Token
- **主要顏色**：
  - 選中狀態背景：#C3C1C1
  - 未選中狀態背景：#E8E6E6
  - 文字顏色：#000000
  - 分隔線顏色：#000000
- **字體規格**：
  - 字體家族：Inter
  - 字重：Medium (500)
  - 字號：24px
  - 行高：1.21em
- **間距規格**：
  - 內邊距：12px（垂直） × 29px（水平）
  - 頁籤間距：自動計算
- **圓角規格**：
  - 頁籤上方圓角：15px
  - 頁籤下方圓角：0px

## 功能需求規格

### 核心功能
1. **頁籤切換機制**
   - 支援點擊切換活動頁籤
   - 同時只能有一個頁籤為活動狀態
   - 預設「一般課程」為初始活動狀態

2. **狀態管理**
   - 維護當前活動頁籤的狀態
   - 提供狀態變更的回調機制
   - 支援程式化設定活動頁籤

3. **視覺回饋**
   - 清晰的選中/未選中狀態區別
   - 滑鼠懸停效果（可選）
   - 平滑的狀態轉換動畫

### 無障礙功能
- **鍵盤導航**：支援 Tab、Enter、方向鍵操作
- **螢幕閱讀器**：提供適當的 ARIA 標籤
- **焦點管理**：清晰的焦點指示器

## 響應式設計需求

### 桌機版設計（1024px 以上）
```css
.course-tabs {
  width: 1174px;
  height: 53px;
}

.tab-button {
  font-size: 24px;
  padding: 12px 29px;
  border-radius: 15px 15px 0 0;
}
```

### 平板版設計（768px - 1023px）
- 整體寬度：100%（最大 1174px）
- 字體大小：22px
- 內邊距：10px 24px
- 保持相同的視覺比例

### 手機版設計（767px 以下）
- 整體寬度：100%
- 字體大小：18px
- 內邊距：8px 16px
- 頁籤可能需要堆疊或滾動（視內容而定）

### 響應式斷點
```css
/* 桌機版 */
@media (min-width: 1024px) { /* 桌機版樣式 */ }

/* 平板版 */
@media (min-width: 768px) and (max-width: 1023px) { /* 平板版樣式 */ }

/* 手機版 */
@media (max-width: 767px) { /* 手機版樣式 */ }
```

## 技術實現架構

### HTML 語意結構
```html
<nav class="course-tabs" role="tablist" aria-label="課程分類">
  <button 
    class="course-tabs__button course-tabs__button--active" 
    role="tab" 
    aria-selected="true" 
    aria-controls="general-content"
    id="general-tab"
    data-tab="general">
    一般課程
  </button>
  <button 
    class="course-tabs__button" 
    role="tab" 
    aria-selected="false" 
    aria-controls="advanced-content"
    id="advanced-tab"
    data-tab="advanced">
    進階課程
  </button>
</nav>
<div class="course-tabs__divider" aria-hidden="true"></div>
```

### CSS 架構設計
```css
/* BEM 命名規範 */
.course-tabs { /* 容器樣式 */ }
.course-tabs__button { /* 頁籤按鈕基本樣式 */ }
.course-tabs__button--active { /* 活動狀態樣式 */ }
.course-tabs__button--hover { /* 懸停狀態樣式 */ }
.course-tabs__divider { /* 底部分隔線樣式 */ }
```

### JavaScript 功能模組
```javascript
class CourseTabs {
  constructor(element, options = {}) {
    // 初始化邏輯
  }
  
  // 設定活動頁籤
  setActiveTab(tabId) { }
  
  // 獲取當前活動頁籤
  getActiveTab() { }
  
  // 事件處理
  handleTabClick(event) { }
  handleKeydown(event) { }
  
  // 銷毀實例
  destroy() { }
}
```

## 樣式實現細節

### CSS 變數定義
```css
:root {
  --course-tabs-bg-active: #C3C1C1;
  --course-tabs-bg-inactive: #E8E6E6;
  --course-tabs-text-color: #000000;
  --course-tabs-border-color: #000000;
  --course-tabs-font-size-desktop: 24px;
  --course-tabs-font-size-tablet: 22px;
  --course-tabs-font-size-mobile: 18px;
  --course-tabs-border-radius: 15px;
  --course-tabs-transition: all 0.2s ease;
}
```

### 動畫效果
- **狀態切換動畫**：0.2s ease 過渡效果
- **懸停效果**：輕微的背景色變化
- **焦點效果**：明顯的輪廓線指示

## 整合與 API 規範

### 初始化參數
```javascript
const tabs = new CourseTabs('.course-tabs', {
  defaultTab: 'general',        // 預設活動頁籤
  enableKeyboard: true,         // 啟用鍵盤導航
  enableAnimation: true,        // 啟用動畫效果
  onTabChange: (tabId) => {     // 頁籤變更回調
    console.log('Tab changed to:', tabId);
  }
});
```

### 公開方法
- `setActiveTab(tabId)` - 程式化設定活動頁籤
- `getActiveTab()` - 獲取當前活動頁籤 ID
- `destroy()` - 銷毀組件實例

### 自定義事件
- `course-tabs:change` - 頁籤變更時觸發
- `course-tabs:beforeChange` - 頁籤變更前觸發

## 效能與最佳化

### 效能目標
- **初始渲染時間**：< 50ms
- **互動響應時間**：< 100ms
- **記憶體佔用**：< 1MB
- **動畫幀率**：60fps

### 最佳化策略
- 使用 CSS transform 進行動畫
- 避免不必要的 DOM 查詢
- 實現事件委派機制
- 支援懶載入和按需初始化

## 瀏覽器相容性

### 支援清單
- **桌機瀏覽器**：
  - Chrome 90+
  - Firefox 88+
  - Safari 14+ 
  - Edge 90+
- **行動瀏覽器**：
  - iOS Safari 14+
  - Chrome Mobile 90+
  - Samsung Internet 14+

### 降級方案
- 不支援 CSS Grid 的瀏覽器使用 Flexbox
- 不支援 CSS 變數的瀏覽器使用固定值
- 不支援 JavaScript 時提供基本可用性

## 測試策略

### 單元測試
- 頁籤切換邏輯測試
- 鍵盤導航功能測試
- API 方法調用測試

### 整合測試
- 與父容器的整合測試
- 響應式佈局測試
- 跨瀏覽器相容性測試

### 視覺測試
- 像素完美對比測試
- 動畫效果測試
- 無障礙功能測試

## 交付清單

### 程式碼文件
1. **HTML 模板檔案** - `course-tabs.html`
2. **CSS 樣式檔案** - `course-tabs.css`
3. **JavaScript 功能檔案** - `course-tabs.js`
4. **TypeScript 定義檔案** - `course-tabs.d.ts`（可選）

### 文件資料
1. **使用說明文件** - `README.md`
2. **API 參考文件** - `API.md`
3. **設計規範文件** - `DESIGN.md`

### 測試檔案
1. **單元測試** - `course-tabs.test.js`
2. **視覺測試案例** - `visual-tests/`
3. **範例頁面** - `examples/`

## 維護與支援

### 版本控制
- 遵循語意化版本控制（Semantic Versioning）
- 提供變更日誌（CHANGELOG.md）
- 向後相容性保證

### 技術支援
- 提供 GitHub Issues 追蹤
- 詳細的故障排除指南
- 定期安全性更新

## 注意事項

1. **模組化設計**：確保組件可獨立運作，不依賴特定框架
2. **樣式隔離**：使用 CSS 命名空間避免樣式衝突
3. **效能考量**：避免不必要的重排和重繪
4. **無障礙優先**：確保所有功能都可透過鍵盤操作
5. **漸進增強**：基本功能在禁用 JavaScript 時仍可運作