# Ring Wireframe Kit — 專案規範

## 專案背景
- 這是產品設計師的作品集：把 Figma Wireframe Kit 做成 Storybook 元件庫
- 最終目標：用簡單的 prompt 搭配這個元件庫，組出畫面
- 使用者沒有程式背景：所有說明都用白話
- Figma 原始檔：https://www.figma.com/design/pDlqLGvdVXkeZCe9CeF03w
- GitHub：https://github.com/ringniuniu0503/ring-wireframe-kit
- 技術：React + TypeScript + Vite + Storybook 10

## 語言
- 跟使用者對話：中文白話
- 寫進 repo 的內容（元件文件、程式註解、commit 訊息）：英文

## 常用指令
- `npm run storybook`：在 http://localhost:6006 打開 Storybook
- `npm run tokens`：從 `design-source/` 重新產生 `src/styles/tokens.css`

## 檔案結構
- 每個元件放在 `src/components/<ComponentName>/`，包含元件、樣式、Storybook 檔案
- `src/foundations/`：Foundations 指南頁（`.mdx`），例如 `Color.mdx`
- `src/docs/`：文件頁共用的小工具（例如從 `tokens.css` 讀取 token 的 `tokens.ts`、共用樣式 `docs.css`）
- `src/styles/`：`tokens.css`（自動產生）、`fonts.css`（Roboto + 中文備用字型 Noto Sans TC，400 / 500 / 700）
- `design-source/`：token 的原始資料
- `scripts/build-tokens.mjs`：token 轉換程式

## Token 規則
- 元件只能使用語意層 token（`--rwk-color-*`、`--rwk-space-*`、`--rwk-radius-*`、`--rwk-size-*`、`--rwk-text-*`）和 `.rwk-text-*` class
- 禁止寫死任何數值，也不要直接使用基礎層 token（`--rwk-color-gray-*`、`--rwk-dimension-*`、`--rwk-font-size-*` 等）
- 缺少需要的 token 時，先問使用者，不要自己發明
- `src/styles/tokens.css` 不能手動修改；要改就改 `design-source/`，再執行 `npm run tokens`
- `design-source/` 的檔案：
  - `Value.tokens.json`、`Light.tokens.json`：Figma 變數匯出檔，只能用 Figma 重新匯出來覆蓋，不可手動修改
  - `text-styles.json`：手動整理自 Figma Text Styles，修改前要先對照 Figma
- 所有 CSS 變數和 class 都用 `rwk-` 前綴

## 元件規則
- props 名稱和選項要與 Figma 的 Component Properties 一致
- 狀態判斷原則：
  - 使用者動作造成的狀態（Hover、Focused、Pressed）：用 CSS 處理，不做成 props
  - 產品邏輯決定的狀態（例如 Disabled）：做成 props
- Storybook 分類要對應 Figma 的分區：
  Foundations / Actions / Inputs / Navigation / Content / Feedback & Overlay / Chat & AI
- Icon：使用 Material Symbols Rounded，以名稱指定；不要引入其他 icon 套件
- 一次只做一個元件，完成並經使用者確認後，才做下一個

## 無障礙基本要求
- 使用正確的 HTML 元素（例如按鈕用 `<button>`）
- 用鍵盤操作時，要有清楚的 focus 樣式
- 點擊範圍不可小於觸控尺寸 token（`--rwk-size-touch-*`）

## 元件文件規則（參考 Material Design 3）
每個元件都要有一份文件頁，包含以下兩部分：

**Overview**（由 AI 起草並標記為「草稿」；使用者審稿後，移除「草稿」標記）
- 使用時機
- 不該使用的情況，以及替代方案
- 各 variant 的使用時機
- 例外與注意事項

**Specs**
- Anatomy：拆解圖，用編號標示各部位
- Measurements：標示圖，標出高度、padding、間距
- 規格表：屬性 / token 名稱 / 實際數值
- Color 表：部位 × 狀態 → token
- Accessibility：說明
- 規格表裡的數值必須直接讀取 token，不可手打，確保文件和元件永遠一致

## Foundations 指南頁
- 頁面清單（Storybook 側欄順序）：Introduction / Color / Typography / Spacing / Shape & Border / Touch Targets
- Introduction 最後才做（專案介紹、token 架構、使用方式）
- Iconography 不另外做頁面；寫在 Icon 元件的文件頁裡
- 沿用 Color 頁的版型和 `src/docs/` 的共用工具；頁面上的數值一律從 token 讀取

## 組畫面規則
- 只能使用元件庫裡已有的元件
- 需要新元件時，先列出來問使用者

## 工作流程
1. 先列計畫，使用者確認後才執行
2. 做元件前，先用 Figma MCP 讀取該元件的規格（`get_design_context` + `get_screenshot`）
3. 完成後在 Storybook 裡實際確認，並與 Figma 比對
4. commit 前先問使用者；commit 訊息用英文
