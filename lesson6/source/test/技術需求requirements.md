好的，這是一個專為 AI 準備的 `技術需求.md` 文件，用於產生您圖片中 "Homes For You" 這個局部區塊的 HTML 和 CSS。

```markdown
# 技術需求：響應式房產展示卡片輪播區塊

## 1. 專案名稱

Homes For You - 房產展示輪播元件

## 2. 目標

根據提供的設計圖片，生成一個響應式的 "Homes For You" 區塊。此區塊包含一個標題、副標題以及一個可水平滾動/輪播的房產卡片列表。此元件未來將手動整合到主要網頁中。

## 3. 範圍

僅限圖片中 "Homes For You" 文字開始到其下方三個房產卡片及輪播指示點結束的區塊。不包含頁首 (Header) 或頁尾 (Footer)。

## 4. 主要功能元件

1.  **區塊容器 (Section Container)**：
    *   包含整個 "Homes For You" 區塊。
    *   背景色為淺灰色 (類似圖片中的 `#f8f9fa` 或稍淺)。
    *   上下有足夠的內邊距 (padding)。

2.  **標題區域 (Heading Area)**：
    *   主標題："Homes For You" (文字置中)
    *   副標題："Based on your view history" (文字置中，字體略小於主標題)

3.  **卡片輪播容器 (Carousel Container)**：
    *   包含導航箭頭 (左右) 和卡片軌道。
    *   在桌面視圖下，左右兩側應顯示導航箭頭。

4.  **卡片軌道 (Carousel Track)**：
    *   水平排列房產卡片。
    *   應能處理超出可視範圍的卡片 (例如，使用 `overflow-x: auto;` 配合 `display: flex;` 或由 JS 控制捲動)。
    *   卡片之間有固定的間距。

5.  **房產卡片 (Property Card) - 至少3個範例卡片**：
    *   **整體樣式**：
        *   圓角邊框。
        *   輕微的陰影效果。
        *   白色背景。
    *   **圖片區域 (Image Area)**：
        *   佔據卡片頂部。
        *   圖片應填滿此區域 (可使用 `object-fit: cover;`)。
        *   圖片上方可疊加標籤。
    *   **標籤 (Tags - Positioned over image)**：
        *   例如 "FOR SALE", "FOR RENT", "FEATURED"。
        *   "FOR SALE" / "FOR RENT": 通常位於左上角，深綠色背景 (#1D594E 或相近)，白色文字，圓角。
        *   "FEATURED": 可與 "FOR SALE" 並列或單獨顯示，黃色背景 (#FFCC80 或相近)，深色文字，圓角。
        *   具體標籤內容與樣式應可配置，提供範例即可。
    *   **內容區域 (Content Area - Below image)**：
        *   卡片下半部，有內邊距。
        *   **房產名稱 (Property Title)**：例如 "Skyper Pool Apartment"，黑色或深灰色文字，字體較粗。
        *   **價格 (Price)**：例如 "$280,000" 或 "$250<span class='text-muted'>/month</span>"。銷售價格為紅色 (#E74C3C 或相近)，租賃價格可為黑色，"/month" 字樣顏色稍淺。靠右對齊或與標題同行但靠右。
        *   **地址 (Address)**：例如 "1020 Bloomingdale Ave"，前面可帶一個地點圖示 (SVG 或 Font Icon)，灰色文字。
        *   **房產特色 (Features)**：
            *   水平排列，例如 "4 Beds", "2 Baths", "450 sqft"。
            *   每個特色前帶一個對應圖示 (床、浴缸、面積 - SVG 或 Font Icon)。
            *   灰色文字。

6.  **輪播導航箭頭 (Carousel Navigation Arrows)**：
    *   左右各一，用於切換卡片。
    *   垂直置中於卡片軌道。
    *   在手機視圖下可考慮隱藏或調整樣式。
    *   白色背景，圓形，帶陰影。

7.  **輪播分頁指示點 (Carousel Pagination Dots)**：
    *   位於卡片下方，水平置中。
    *   圓點表示不同的卡片組/頁。
    *   當前活動的點有不同樣式 (例如，更深色或更大)。

## 5. 響應式設計 (RWD) - 中斷點

*   **桌面 (Desktop ≥ 992px)**：
    *   一排顯示 3 張卡片。
    *   導航箭頭可見且位於卡片容器兩側。
*   **平板 (Tablet: 576px - 991px)**：
    *   一排顯示 2 張卡片。
    *   導航箭頭可能需要調整大小或位置。
*   **手機 (Mobile < 576px)**：
    *   一排顯示 1 張卡片。
    *   卡片寬度接近 100% (帶有少量頁邊距)。
    *   導航箭頭可考慮隱藏，依靠手勢滑動 (若實作JS) 或僅顯示分頁點。

## 6. 技術棧/約束

*   **HTML5**: 使用語義化標籤。
*   **CSS3**:
    *   建議使用 Flexbox 或 Grid 進行佈局。
    *   避免使用外部 CSS 框架 (如 Bootstrap)，除非特別指示。
*   **JavaScript**: 本次需求主要為 HTML 和 CSS 結構。輪播的實際動態功能 (點擊箭頭切換、自動播放、手勢滑動) **不在此次 HTML/CSS 生成範圍內**，但 HTML 結構應預留相應的類名或 ID 以便後續添加 JS。
*   **圖片**:
    *   所有房產圖片請使用假圖服務，例如 `https://via.placeholder.com/寬x高/背景色/文字色?text=描述`。
    *   卡片圖片建議尺寸：寬度約 350-400px，高度約 200-250px (具體比例參考原圖，例如 `https://via.placeholder.com/380x240/CCCCCC/969696?text=Property+Image`)。
    *   圖示 (地址、床、浴缸、面積) 可使用 SVG 或 Unicode 字符暫代，或預留 `<span>` 標籤供後續加入。
*   **註解**: 所有 CSS 規則集和重要的 HTML 區塊需添加繁體中文註解。

## 7. HTML 結構建議 (高層次)

```html
<!-- Homes For You 區塊開始 -->
<section class="homes-for-you-section">
    <!-- 區塊內容容器，用於控制最大寬度和居中 -->
    <div class="container">
        <!-- 標題區域 -->
        <div class="section-header">
            <h2>Homes For You</h2>
            <p>Based on your view history</p>
        </div>

        <!-- 輪播容器 -->
        <div class="property-carousel">
            <!-- 左導航箭頭 -->
            <button class="carousel-arrow prev-arrow" aria-label="上一張">‹</button>

            <!-- 卡片軌道/列表 -->
            <div class="carousel-track">
                <!-- 範例卡片 1 -->
                <article class="property-card">
                    <div class="card-image-wrapper">
                        <img src="https://via.placeholder.com/380x240/E0E0E0/BDBDBD?text=Skyper+Pool+Apt" alt="Skyper Pool Apartment">
                        <div class="card-tags">
                            <span class="tag sale">FOR SALE</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="title-price-row">
                             <h3 class="property-title">Skyper Pool Apartment</h3>
                             <p class="property-price sale-price">$280,000</p>
                        </div>
                        <p class="property-address">
                            <!-- 地址圖示 -->
                            <span>📍</span> 1020 Bloomingdale Ave
                        </p>
                        <div class="property-features">
                            <span><!-- 床圖示 -->🛏️ 4 Beds</span>
                            <span><!-- 浴缸圖示 -->🛁 2 Baths</span>
                            <span><!-- 面積圖示 -->📐 450 sqft</span>
                        </div>
                    </div>
                </article>

                <!-- 範例卡片 2 (FOR RENT) -->
                <article class="property-card">
                    <div class="card-image-wrapper">
                        <img src="https://via.placeholder.com/380x240/E0E0E0/BDBDBD?text=North+Dillard+St" alt="North Dillard Street">
                        <div class="card-tags">
                            <span class="tag rent">FOR RENT</span>
                        </div>
                    </div>
                    <div class="card-content">
                         <div class="title-price-row">
                            <h3 class="property-title">North Dillard Street</h3>
                            <p class="property-price rent-price">$250<span class="text-muted">/month</span></p>
                        </div>
                        <p class="property-address">
                            <span>📍</span> 4330 Bell Shoals Rd
                        </p>
                        <div class="property-features">
                            <span>🛏️ 4 Beds</span>
                            <span>🛁 2 Baths</span>
                            <span>📐 400 sqft</span>
                        </div>
                    </div>
                </article>

                <!-- 範例卡片 3 (FEATURED + FOR SALE) -->
                <article class="property-card">
                    <div class="card-image-wrapper">
                        <img src="https://via.placeholder.com/380x240/E0E0E0/BDBDBD?text=Eaton+Garth+Penthouse" alt="Eaton Garth Penthouse">
                        <div class="card-tags">
                            <span class="tag sale">FOR SALE</span>
                            <span class="tag featured">FEATURED</span>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="title-price-row">
                            <h3 class="property-title">Eaton Garth Penthouse</h3>
                            <p class="property-price sale-price">$180,000</p>
                        </div>
                        <p class="property-address">
                            <span>📍</span> 7722 18th Ave, Brooklyn
                        </p>
                        <div class="property-features">
                            <span>🛏️ 4 Beds</span>
                            <span>🛁 2 Baths</span>
                            <span>📐 450 sqft</span>
                        </div>
                    </div>
                </article>
                <!-- 可根據需要增加更多卡片 -->
            </div>

            <!-- 右導航箭頭 -->
            <button class="carousel-arrow next-arrow" aria-label="下一張">›</button>
        </div>

        <!-- 分頁指示點 -->
        <div class="carousel-pagination">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>
</section>
<!-- Homes For You 區塊結束 -->
```

## 8. CSS 樣式建議 (高層次)

*   **通用**:
    *   `box-sizing: border-box;`
    *   基本字體設定。
*   **.homes-for-you-section**:
    *   `padding-top`, `padding-bottom`
    *   `background-color`
*   **.container**:
    *   `max-width` (例如 1140px 或 1200px)
    *   `margin: 0 auto`
    *   `padding-left`, `padding-right` (用於響應式邊距)
*   **.section-header**:
    *   `text-align: center`
    *   `margin-bottom`
    *   `h2` 和 `p` 的字體大小、顏色。
*   **.property-carousel**:
    *   `position: relative` (用於箭頭定位)
*   **.carousel-track**:
    *   `display: flex`
    *   `overflow-x: auto` (或 `hidden` 如果由JS控制)
    *   `gap` 或 `margin-right` 在卡片間製造間距。
    *   移除滾動條樣式 (若使用 `overflow-x: auto`)
*   **.property-card**:
    *   `background-color: #fff`
    *   `border-radius`
    *   `box-shadow`
    *   `overflow: hidden` (確保圓角裁剪圖片)
    *   `flex: 0 0 auto` (在 flex 容器中保持原始尺寸)
    *   `width` (在不同中斷點調整)
*   **.card-image-wrapper**:
    *   `position: relative` (用於標籤定位)
    *   `img`: `width: 100%`, `display: block`, `aspect-ratio` (例如 16/10 或 380/240) 或 `height` + `object-fit: cover`。
*   **.card-tags**:
    *   `position: absolute`, `top`, `left`
    *   `display: flex`, `gap`
*   **.tag**:
    *   `padding`, `border-radius`, `font-size`, `color`, `background-color`
    *   `.sale`, `.rent`, `.featured` 分別定義背景色。
*   **.card-content**:
    *   `padding`
*   **.title-price-row**:
    *   `display: flex`, `justify-content: space-between`, `align-items: flex-start` (或 baseline)
*   **.property-title**:
    *   `font-weight`, `font-size`, `margin-bottom` (若價格不在同一行)
*   **.property-price**:
    *   `font-weight`, `font-size`
    *   `.sale-price`: `color: red;`
    *   `.rent-price .text-muted`: `color: grey; font-size: smaller;`
*   **.property-address**:
    *   `font-size`, `color`, `margin-bottom`
    *   圖示與文字間距。
*   **.property-features**:
    *   `display: flex`, `gap` (或 `justify-content: space-between` 如果希望填滿)
    *   `font-size`, `color`
    *   圖示與文字間距。
*   **.carousel-arrow**:
    *   `position: absolute`, `top: 50%`, `transform: translateY(-50%)`
    *   `background-color`, `border`, `border-radius`, `width`, `height`, `font-size`, `cursor: pointer`
    *   `.prev-arrow`: `left`
    *   `.next-arrow`: `right`
*   **.carousel-pagination**:
    *   `text-align: center`, `margin-top`
*   **.dot**:
    *   `display: inline-block`, `width`, `height`, `background-color`, `border-radius`, `margin`
    *   `.active`: 不同的 `background-color`。

## 9. 其他注意事項

*   確保 class 命名具有一致性與描述性。
*   考慮不同瀏覽器的兼容性 (主要針對現代瀏覽器)。
*   顏色、字體大小、間距等應盡可能接近原圖，但允許合理的估計。

```

這份文件應該能為 AI 提供足夠的資訊來生成所需的 HTML 和 CSS 結構。AI 可以根據這些描述和建議的 HTML 結構來產生程式碼。