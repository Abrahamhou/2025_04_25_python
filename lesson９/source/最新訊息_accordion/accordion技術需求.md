## Accordion 技術需求規格

### 1. HTML 結構 (HTML Structure)

-   **容器 (Container):**
    -   一個主 `div` 元素作為整個 accordion 的容器。
    -   建議 class: `accordion-container`
-   **項目 (Item):**
    -   每個 accordion 單元由一個 `div` 包裹。
    -   建議 class: `accordion-item`
-   **標頭 (Header):**
    -   每個項目包含一個標頭區域，用於觸發內容的展開/收合。
    -   **強烈建議使用 `<button>` 元素** 以符合無障礙性 (accessibility) 標準。
    -   建議 class: `accordion-header`
    -   包含標題 (`.accordion-title`) 和日期 (`.accordion-date`)。
    -   可包含一個圖示 (`.accordion-icon`) 來表示展開/收合狀態 (例如 +/-)。
-   **內容 (Content):**
    -   每個項目包含一個內容區域，預設為隱藏。
    -   建議 class: `accordion-content`
    -   內容區域應有唯一的 `id`，並由標頭的 `aria-controls` 屬性引用。標頭也應有 `id`，供內容區域的 `aria-labelledby` 引用。
-   **Jinja 模板整合:**
    -   HTML 結構應設計為易於使用 Jinja 迴圈 (`{% for item in data %}`) 動態生成。
    -   標題、日期、內容將從 Jinja 上下文變數中獲取。
    -   第一筆資料預設展開，可透過 Jinja `loop.first` 判斷並設定相應的 `aria-expanded` 狀態及 class。

**範例 HTML 結構 (Jinja 風格):**
```html
<div class="accordion-container">
  {% for item in accordion_items %}
  <div class="accordion-item">
    <button class="accordion-header"
            aria-expanded="{% if loop.first %}true{% else %}false{% endif %}"
            aria-controls="accordion-content-{{ loop.index }}"
            id="accordion-header-{{ loop.index }}">
      <span class="header-main-content"> <!-- Wrapper for title and date -->
        <span class="accordion-title">{{ item.title }}</span>
        <span class="accordion-date">{{ item.date }}</span>
      </span>
      <span class="accordion-icon" aria-hidden="true"></span> <!-- Icon: e.g., +/-, arrow -->
    </button>
    <div id="accordion-content-{{ loop.index }}"
         class="accordion-content"
         role="region"
         aria-labelledby="accordion-header-{{ loop.index }}"
         {% if not loop.first %}hidden{% endif %}>
      <p>{{ item.content }}</p>
    </div>
  </div>
  {% endfor %}
</div>
```

### 2. CSS 樣式 (CSS Styling)

-   **整體佈局:**
    -   `.accordion-container`: 設定整體寬度、邊框等。
    -   `.accordion-item`: 設定項目間距、底部邊框 (最後一項可無邊框)。
-   **標頭樣式 (`.accordion-header`):**
    -   背景色、文字顏色、`padding`。
    -   `cursor: pointer;`。
    -   使用 Flexbox 佈局 `header-main-content` 和 `accordion-icon`，確保標題和日期能正確排列（標題在上，日期在下，或並排），圖示在右側。
    -   作為 `<button>` 時，重置預設樣式: `width: 100%; text-align: left; border: none; background: transparent;`。
-   **標題樣式 (`.accordion-title`):**
    -   字體大小、顏色、粗細。
    -   允許多行顯示，處理長標題的換行 (`word-break: break-word;` 或 `overflow-wrap: break-word;`)。
-   **日期樣式 (`.accordion-date`):**
    -   字體大小、顏色。通常比標題小一些。
-   **圖示樣式 (`.accordion-icon`):**
    -   使用 `::before` 或 `::after` 偽元素，或直接用文字/SVG。
    -   預設顯示 "+" 或向下箭頭。
    -   當項目展開時 (`.accordion-header[aria-expanded="true"] .accordion-icon`)，變為 "-" 或向上箭頭。
    -   可加入 `transition` 使圖示旋轉更平滑。
-   **內容樣式 (`.accordion-content`):**
    -   預設隱藏: `max-height: 0; overflow: hidden;` (使用 `max-height` 以利動畫)。
    -   `padding`: 水平方向的 `padding` (例如 `0 15px;`)。垂直方向的 `padding` 則在展開時透過 `.accordion-header[aria-expanded="true"] + .accordion-content` 添加。
    -   **固定高度/行數限制:**
        -   當展開時，JavaScript 會設定一個固定的 `max-height` 值 (例如 `'150px'`)。此高度應包含內容文字區及垂直 `padding`。
        -   `overflow-y: auto;` 使內容超出此 `max-height` 時可滾動。
-   **展開狀態樣式:**
    -   當 `.accordion-header` 的 `aria-expanded="true"` 時:
        -   `+.accordion-content`: JavaScript 設定 `max-height` 為固定值 (例如 `150px`)，並透過 CSS 添加垂直 `padding` (例如 `padding-top: 15px; padding-bottom: 15px;`)。
        -   `.accordion-icon`: 改變圖示。
-   **過渡動畫:**
    -   `transition: max-height 0.3s ease-in-out, padding-top 0.3s ease-in-out, padding-bottom 0.3s ease-in-out;` 應用於 `.accordion-content`。
    -   `transition: transform 0.3s ease-in-out;` 可應用於 `.accordion-icon`。
-   **響應式網頁設計 (RWD):**
    -   使用 Media Queries (`@media`) 調整在不同螢幕尺寸下的樣式。
    -   行動裝置優先或桌面版優先皆可，但需確保在常見裝置（手機、平板、桌面）上均有良好顯示效果。
    -   可能調整的項目包含：容器寬度、間距 (`padding`, `margin`)、字體大小。
    -   針對行動裝置，標題和內容的字體大小可能需要略微縮小，間距也可能需要調整以優化小螢幕上的閱讀體驗。
    -   **注意 `fixedMaxHeightWhenOpen`**: JavaScript 中設定的內容固定高度 (`fixedMaxHeightWhenOpen`) 是像素值。若 RWD 中字體大小或內部 `padding` 有顯著變化，此固定像素值可能導致在小螢幕上顯示的行數與預期不符，或空間過多/過少。理想情況下，此值也應響應式調整，或基於動態計算。目前規格中，此值為固定。



### 3. JavaScript 行為 (JavaScript Behavior)

-   **初始化:**
    -   獲取所有 `.accordion-header` 元素。
    -   遍歷所有 accordion 項目，根據其 `aria-expanded` 屬性設定初始狀態：
        -   若 `aria-expanded="true"` (預期為第一筆)，則設定其對應 content 的 `max-height` 為展開後的固定高度，並移除 `hidden` 屬性。
        -   若 `aria-expanded="false"`，則設定其對應 content 的 `max-height` 為 `0px`。HTML 中這些 content 應有 `hidden` 屬性。
-   **事件監聽:**
    -   為每個 `.accordion-header` 添加 `click` 事件監聽器。
-   **點擊行為 (Accordion 模式 - 一次僅展開一項):**
    -   當一個 header被點擊時：
        -   獲取當前被點擊 header 的 `aria-expanded` 狀態。
        -   **如果當前項目即將展開 (原為收合狀態):**
            -   遍歷所有其他的 `.accordion-header`，將它們設為收合狀態 (`aria-expanded="false"`)，並將其對應 content 的 `max-height` 設為 `0px`。
        -   **切換當前項目狀態:**
            -   反轉被點擊 header 的 `aria-expanded` 屬性值 (`true` <-> `false`)。
            -   如果變為 `true` (展開):
                -   設定對應 content 的 `max-height` 為展開後的固定高度。
                -   移除 content 的 `hidden` 屬性。
            -   如果變為 `false` (收合):
                -   設定對應 content 的 `max-height` 為 `0px`。
                -   (可選) 在動畫結束後重新添加 `hidden` 屬性，但通常 `max-height:0` 和 `overflow:hidden` 已足夠。
        -   相應地更新 `.accordion-icon` 的樣式/內容。

### 4. 資料結構 (Data Structure - 假設由後端提供給 Jinja)

-   資料應為一個列表 (Python list of dictionaries)，每個字典代表一個 accordion 項目。
-   每個字典應至少包含以下鍵：
    -   `title` (string): 消息標題，可能包含多行。
    -   `date` (string): 消息日期 (例如 "YYYY-MM-DD" 格式)。
    -   `content` (string): 消息內容。

**範例資料 (Python 字典列表，供 Jinja 渲染):**
```python
accordion_items = [
    {
        "title": "系統升級通知：提升您的使用體驗",
        "date": "2024-08-15",
        "content": "為提供更優質的服務，本平台將於下週三凌晨進行系統升級。屆時部分服務可能短暫中斷，敬請見諒。"
    },
    {
        "title": "夏季新品上市：探索無限可能，多款優惠活動同步展開中，敬請把握機會！",
        "date": "2024-08-10",
        "content": "炎炎夏日，我們為您帶來一系列清涼新品。從時尚服飾到智能家居，滿足您的所有期待。活動詳情請參閱官網。"
    }
    # ...更多項目
]
```

### 5. 無障礙性 (Accessibility - ARIA)

-   **`<button>` 作為標頭:** `accordion-header` 應為 `<button>` 元素。
-   **`aria-expanded`:** 應用於 `<button class="accordion-header">`。值為 `true` 表示內容已展開，`false` 表示已收合。
-   **`aria-controls`:** 應用於 `<button class="accordion-header">`。值為對應的 `accordion-content` 區域的 `id`。
-   **`id`:** `accordion-header` 和 `accordion-content` 都應有唯一的 `id`。
-   **`role="region"`:** 應用於 `accordion-content` 區域。
-   **`aria-labelledby`:** 應用於 `accordion-content` 區域。值為對應的 `accordion-header` 的 `id`。
-   **`hidden` 屬性:** 應用於初始狀態為收合的 `accordion-content` 區域。JavaScript 在展開時移除此屬性。
-   **鍵盤導航:** 使用 `<button>` 可確保 Tab 鍵能聚焦到標頭，Enter/Space 鍵能觸發展開/收合。

### 6. 測試頁面範例 (Basic Test Page)

創建一個 `accordion_test.html` 檔案，包含以下內容，用於在沒有 Jinja 環境的情況下測試 accordion 的基本功能和樣式。

```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accordion Test</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
        .accordion-container {
            border: 1px solid #ddd;
            border-radius: 4px;
            max-width: 700px;
            margin: 20px auto;
            background-color: #fff;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .accordion-item {
            border-bottom: 1px solid #eee;
        }
        .accordion-item:last-child {
            border-bottom: none;
        }
        .accordion-header {
            background-color: transparent; /* Button background */
            color: #333;
            cursor: pointer;
            padding: 15px 20px;
            width: 100%;
            text-align: left;
            border: none;
            outline: none;
            font-size: 1em; /* 16px */
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.2s ease-out;
        }
        .accordion-header:hover,
        .accordion-header:focus {
            background-color: #f9f9f9;
        }
        .header-main-content {
            display: flex;
            flex-direction: column;
            margin-right: 10px; /* Space between text and icon */
        }
        .accordion-title {
            font-weight: 600;
            font-size: 1.1em; /* ~17.6px */
            color: #2c3e50;
            margin-bottom: 4px;
        }
        .accordion-date {
            font-size: 0.85em; /* ~13.6px */
            color: #7f8c8d;
        }
        .accordion-icon {
            font-size: 1.2em;
            font-weight: bold;
            transition: transform 0.3s ease-out;
            flex-shrink: 0; /* Prevent icon from shrinking */
        }
        .accordion-icon::before {
            content: '+';
        }
        .accordion-header[aria-expanded="true"] .accordion-icon::before {
            content: '−';
        }
        /* Optional: Rotate icon */
        /* .accordion-header[aria-expanded="true"] .accordion-icon { transform: rotate(45deg); } */

        .accordion-content {
            padding-left: 20px;
            padding-right: 20px;
            background-color: #fff;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
        }
        .accordion-content p {
            margin: 0; /* Reset paragraph margin, use padding on .accordion-content */
            line-height: 1.6;
            font-size: 0.95em; /* ~15px */
            color: #34495e;
        }
        .accordion-header[aria-expanded="true"] + .accordion-content {
            padding-top: 15px;
            padding-bottom: 20px; /* A bit more padding at the bottom of content */
            overflow-y: auto; /* Scroll for content exceeding max-height */
            /* max-height is set by JavaScript */
        }

        /* RWD Adjustments for smaller screens */
        @media (max-width: 768px) {
            body {
                margin: 10px; /* Reduced body margin for smaller screens */
            }
            .accordion-container {
                max-width: 100%; /* Allow container to use full available width within body margins */
                margin: 15px auto; 
            }
            .accordion-header {
                padding: 12px 15px; /* Reduced padding */
            }
            .accordion-title {
                font-size: 1em; /* Slightly smaller than desktop's 1.1em, relative to header's 1em */
            }
            .accordion-date {
                font-size: 0.8em; /* Slightly smaller than desktop's 0.85em, relative to header's 1em */
            }
            .accordion-content { /* Adjust horizontal padding for content area itself */
                padding-left: 15px; 
                padding-right: 15px;
            }
            .accordion-header[aria-expanded="true"] + .accordion-content { /* Adjust vertical padding when content is open */
                padding-top: 10px;
                padding-bottom: 15px;
            }
            .accordion-content p {
                font-size: 0.9em; /* Slightly smaller than desktop's 0.95em of body font */
            }
        }
    </style>
</head>
<body>

<div class="accordion-container" id="myNewsAccordion">
    <!-- Item 1 (Default Open) -->
    <div class="accordion-item">
        <button class="accordion-header" aria-expanded="true" aria-controls="news-content-1" id="news-header-1">
            <span class="header-main-content">
                <span class="accordion-title">重要公告：伺服器維護與升級計畫，提升服務穩定性</span>
                <span class="accordion-date">2024-08-01</span>
            </span>
            <span class="accordion-icon" aria-hidden="true"></span>
        </button>
        <div id="news-content-1" class="accordion-content" role="region" aria-labelledby="news-header-1">
            <p>親愛的用戶您好，為提供更穩定與高效的服務，我們將於下週一 (2024年8月5日) 凌晨 02:00 至 05:00 進行伺服器維護與硬體升級作業。期間相關服務可能會有短暫中斷或連線不穩定的情況，建議您避開此時段進行重要操作。若維護時間有所變動，將另行通知。造成您的不便，敬請見諒。感謝您的理解與支持！這是一段比較長的內容，用來測試固定高度與滾動條的效果。我們需要確保即使內容很多，版面依然整潔，並且使用者可以順利閱讀所有資訊。再補充一些文字，讓它肯定會超出預設的幾行高度限制。</p>
        </div>
    </div>

    <!-- Item 2 -->
    <div class="accordion-item">
        <button class="accordion-header" aria-expanded="false" aria-controls="news-content-2" id="news-header-2">
            <span class="header-main-content">
                <span class="accordion-title">新功能發布：個人化儀表板與進階數據分析工具上線</span>
                <span class="accordion-date">2024-07-28</span>
            </span>
            <span class="accordion-icon" aria-hidden="true"></span>
        </button>
        <div id="news-content-2" class="accordion-content" role="region" aria-labelledby="news-header-2" hidden>
            <p>我們很高興宣布，全新的個人化儀表板及進階數據分析工具已正式上線！您可以根據自身需求自訂儀表板佈局，並利用強大的分析工具深入洞察數據。立即登入體驗新功能，發掘更多可能性。</p>
        </div>
    </div>

    <!-- Item 3 -->
    <div class="accordion-item">
        <button class="accordion-header" aria-expanded="false" aria-controls="news-content-3" id="news-header-3">
            <span class="header-main-content">
                <span class="accordion-title">使用者條款更新通知</span>
                <span class="accordion-date">2024-07-20</span>
            </span>
            <span class="accordion-icon" aria-hidden="true"></span>
        </button>
        <div id="news-content-3" class="accordion-content" role="region" aria-labelledby="news-header-3" hidden>
            <p>為符合最新的法規要求並提升用戶權益保障，我們已更新使用者條款。請抽空詳閱相關內容。若您繼續使用本服務，即表示您同意新的使用者條款。</p>
        </div>
    </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const accordionContainer = document.getElementById('myNewsAccordion');
    if (!accordionContainer) return;

    const headers = accordionContainer.querySelectorAll('.accordion-header');
    
    // 固定內容區域展開時的總高度 (包含內容文字及垂直 padding)
    // 例如：預期顯示約 5-6 行文字 (每行約 1.6 * 15px = 24px) => 6 * 24px = 144px
    // 加上垂直 padding (15px top + 20px bottom = 35px) => 144px + 35px = 179px
    // 實際值應根據設計調整
    const fixedMaxHeightWhenOpen = '180px'; 

    function openPanel(header, content) {
        header.setAttribute('aria-expanded', 'true');
        content.removeAttribute('hidden');
        content.style.maxHeight = fixedMaxHeightWhenOpen;
    }

    function closePanel(header, content) {
        header.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0px';
        // Optional: Re-add 'hidden' after transition for semantics, though not strictly necessary for visual hiding
        // content.addEventListener('transitionend', () => {
        //     if (header.getAttribute('aria-expanded') === 'false') {
        //         content.setAttribute('hidden', '');
        //     }
        // }, { once: true });
    }

    // Initialize accordion states based on aria-expanded
    headers.forEach(header => {
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);
        if (!content) return;

        if (header.getAttribute('aria-expanded') === 'true') {
            openPanel(header, content);
        } else {
            // Ensure initially closed panels have max-height 0.
            // The 'hidden' attribute should already be on these from HTML.
            content.style.maxHeight = '0px'; 
        }
    });

    headers.forEach(header => {
        header.addEventListener('click', function () {
            const currentContentId = this.getAttribute('aria-controls');
            const currentContent = document.getElementById(currentContentId);
            if (!currentContent) return;

            const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';

            if (!isCurrentlyExpanded) { // If this panel is about to open
                // Close all other panels
                headers.forEach(otherHeader => {
                    if (otherHeader !== this) {
                        const otherContentId = otherHeader.getAttribute('aria-controls');
                        const otherContent = document.getElementById(otherContentId);
                        if (otherContent && otherHeader.getAttribute('aria-expanded') === 'true') {
                            closePanel(otherHeader, otherContent);
                        }
                    }
                });
                // Open the current panel
                openPanel(this, currentContent);
            } else { // If this panel is about to close
                closePanel(this, currentContent);
            }
        });
    });
});
</script>

</body>
</html>
```

---

**使用說明:**
1.  將上述 `Accordion 技術需求規格` 區塊的完整內容（包含範例 HTML、CSS、JS）附加到您的 `accordion技術需求.md` 檔案末尾。
2.  `accordion_test.html` 內的程式碼可以直接複製儲存為一個 HTML 檔案來進行本地測試。
3.  在實際整合 Jinja 時，請參考 HTML 結構中的 Jinja 標籤，並由後端傳遞 `accordion_items` 資料列表。
4.  CSS 中的 `fixedMaxHeightWhenOpen` (JavaScript 變數) 和相關 `padding` 值，請根據您的實際設計稿和內容行數需求進行調整，以達到最佳的固定高度顯示效果。



Gemini Code Assist supports plain-text files. Other file types, like PDFs and images, are not directly supported at this time. If a version of the file is available in a plain text format, please use that instead, or copy the relevant contents from the file into your prompt.
Rate this answer: 