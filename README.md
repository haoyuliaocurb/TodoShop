# TodoShop
## 目錄
## 專案簡介
![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/AuthPage-orders-lg.png.jpeg)
![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/AuthPage-orders-sm.png.jpeg)
## 專案展示
- 專案網址：https://todoshop-5fd25.web.app
- 測試帳號：trial@gmail.com
- 測試帳號：trialtrial
## 開發簡介
### 技術架構及摘要
![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/TodoShop%20%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%9E%B6%E6%A7%8B.jpeg)
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
1. #### SPA Routing
* 使用 [React Router](#React-Router) 為 SPA Routing 技術基礎
* 骨幹 Routing 實現於 \<Main /> 中，以 \<Switch>、\<Route> 來轉址對應的 URL path /pageName，並 render 的 page component
  * 例如：/todolist 即 render \<TodolistPage />，/cart 即 render \<CartPage />
  * 配合帶入 \<Main /> 中的 isSignIn、windowWidth 兩個 state 給 page components
2. #### 會員系統建立、登入狀態管理
- 使用 Firebase Auth 建立後端會員系統
- 前端以 \<Main /> 中的 isSignIn state 觸發，render 不同登入狀態的頁面功能及畫面
- 使用 Firebase Auth 提供的 onAuthStateChanged 監聽器，當登入狀態改變，onAuthStateChanged 會呼叫 callback 函式以改變 isSignIn，進而 re-render 畫面
- isSignIn 預設為未登入，值為 null；登入時，值為後端會員系統的識別碼 uid，可配合 fetch 資料庫資料使用
3. #### 登入狀態驗證、redirect
- 包含敏感資料頁面，如 \<Paymentpage />、\<Authpage />，render 時會自 URL path 取得相關資料識別碼，與登入狀態比對，如不符合即 redirect 至前一頁面
  - 例如：在 /auth/uid/:UserId 頁面中會使用 UserId 變數取得會員相關資料並 render \<AuthPage />，然而在這之前，會先將 UserId 值與 isSignIn 作比對，若不符合，則視為非法瀏覽頁面，跳轉至 /auth/signIn 登入頁面
4. #### composition 概念、reusable component
- 運用 Composition 概念，將跨頁面功能相似者，例如：各種 button、modal、scrollable bar、Carousel 等，保留其事件 callback、圖文內容、state 等位置為空白，就像一個容器，並於使用時傳入對應的 props 彈性地呈現特定內容，藉此達到 reuse 程式碼的目的
5. #### Imperative operation：useRef、ref 屬性
- 操作組件 modal 等視覺效果時，若以 ref 屬性直接操作該 DOM element，而非透過 React state 來觸發 re-render，可以帶來開發方便、節省效能的益處。
- 開發中多直接控制 React element tree 末端者的 classList，以操作 css 並控制組件的視覺效果
## 優化方向
## 附錄
### 功能介紹
### 技術介紹
#### 前端
- ##### Sass/SCSS
  使用 Sass/SCSS 預處理、開發全域 styling 樣式
- ##### Styled Components
  使用 Styled Components 配合 React 開發
- ##### Normalize.css
  使用 Normalize.css 作跨瀏覽器 CSS 問題處理
* ##### React Router
  使用 React Router 實踐 SPA 的 router 管理，見 [SPA Routing](#SPA-Routing)
- ##### ES6 JavaScript
  使用 ES6 JavaScript 語法做開發
- ##### ESLint/Prettier
  導入 ESLint/Prettier 統一開發風格
- ##### 專案細節
  - 實踐 RWD、Infinite scroll、Event throttle and debounce、Loader 、Modal、Carousel 等
  - 使用 React Router、Firebase Auth UI 對於會員、付款頁面做輸入驗證、登入狀態驗證、Redirect
  - 實踐 CRUD、Composition 概念，建立 reusable React component
#### 後端
- ##### Firestore
  使用 Firestore 作為非關聯式資料庫
- ##### Auth
  使用 Auth 建立會員系統，實踐輸入驗證、即時監聽會員登入狀態改變前端畫面
- ##### Hosting
  使用 Hosting 建立 Web server
- ##### 第三方服務
  串接兩個第三方服務：TapPay 金流、Algolia Full-text search 套件
- ##### Firebase Cloud Functions
  使用 Firebase Cloud Functions 自訂兩個跨網域 API
- ##### Node.js、Express.js、Axios
  使用 Node.js、Express.js、Axios 技術撰寫 API 使前端與 API、API 與第三方服務 req/res
- ##### 環境變數
  使用 functions config 設置環境變數：App ID、App key 等敏感資料

#### 開發工具
- ##### Git/GitHub
  使用 Git/GitHub 做版本控管，嘗試實踐 Git Flow
* ##### Create-react-app
  使用 NPM、ES6 module system、Create-re-act-app 導入套件、將前端程式碼模組化
- ##### USB Debugging
  透過 USB Debugging 技術在開發者工具中呈現手機版網頁運作狀況，包含 Console、styles 等
### 程式設計
### 組件開發總覽
#### \<App />
* ##### \<Main />
