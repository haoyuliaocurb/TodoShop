# TodoShop
## 目錄
## 專案簡介
## 開發簡介
### 技術架構
### 目錄架構
以 [Create-react-app](#Create-react-app) 建立專案目錄基礎分立 src、public，其中 src 之中分立 app、components、pages、styles、utils 等子目錄
* app、components、pages：放置 React component 檔案；root component App.js 放置 app 目錄；HomePage、SearchPage 等頁面 component 放置 pages 目錄，其餘者依照所屬 page 分類在 components 目錄
* styles：放置 Styled components 檔案，依照所屬 page 分類；general.scss 具有全域 styles，cssMaterials.js 存放 styles 相關變數及跨頁面邏輯 
* utils：放置 Firebase config script、開發者自身 Library 等
### 開發流程
以 Git Flow 為基礎進行開發，並迭代進行 QA
* 初始化專案時，具有 main、develop branch
* 開發新頁面、新功能時，則新增 branch feature/featureName 進行開發
* 開發完成後以 develop merge  feature/featureName branch
* 階段性發行版本則以 release/versionName 紀錄
* 配合 QA 表格測試、Debug，搭配使用 [USB Debugging](#USB-ebugging) 等技術
### 程式設計摘要
#### SPA Routing
* 使用 [React Router](#React-Router) 為 SPA Routing 技術基礎
* 骨幹 Routing 實現於 [\<Main />](#Main-) 中，以 \<Switch>、\<Route> 來轉址對應的 URL path /pageName，並 render 的 page component
  * 例如：/todolist 即 render \<TodolistPage />，/cart 即 render \<CartPage />
  * 配合帶入 \<Main /> 中的 isSignIn、windowWidth 兩個 state 給 page components
#### 會員系統建立、登入狀態管理
#### 登入狀態驗證、redirect
#### composition 概念、reusable component
#### Imperative operation：useRef、ref 屬性
## 優化方向
## 附錄
### 功能介紹
### 技術介紹
#### 前端
* ##### React Router
  使用 React Router 實踐 SPA 的 router 管理，見 [SPA Routing](#SPA-Routing)
#### 後端
##### Firebase
#### 開發工具
* ##### Create-react-app
  使用 NPM、ES6 module system、Create-re-act-app 導入套件、將前端程式碼模組化
##### USB Debugging

### 程式設計
### 組件開發總覽
#### \<App />
* ##### \<Main />
