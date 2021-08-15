# TodoShop
## 目錄
1. [專案展示](#專案展示)
2. [專案摘要](#專案摘要)
3. [開發介紹](#開發介紹)
    - [技術架構及摘要](#技術架構及摘要)
        - 前端開發
        - 後端開發
        - 開發工具
    - [目錄架構](#目錄架構)
    - [開發流程](#開發流程)
    - [程式設計摘要](#程式設計摘要)
        1. [SPA Routing](#SPA-Routing)
        2. [會員系統建立、登入狀態管理](#會員系統建立登入狀態管理)
        3. [登入狀態驗證、redirect](#登入狀態驗證redirect)
        4. [composition 概念、reusable component](composition-概念reusable-component)
        5. [Imperative operation：useRef、ref 屬性](#imperative-operationuserefref-屬性)
4. [附錄](#附錄)
    - [技術介紹](#技術介紹)
    - [專案介紹](#專案介紹)
        - [購物清單頁](#購物清單頁)
        - [搜尋頁：輕鬆模式、普通模式](#搜尋頁輕鬆模式普通模式)
        - [購物車、付款頁、會員中心](#購物車付款頁會員中心)

## 專案展示
- 專案網址：https://todoshop-5fd25.web.app
- 測試帳號：trial@gmail.com
- 測試帳號：trialtrial

## 專案摘要
「TodoShop 從購物清單開始：創新電商網站」，其創新之處在於可以讓使用者從建立購物清單開始，並將購物清單無縫地轉換，進一步搜尋清單中的所有商品，簡單的在一個頁面中呈現

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/HomePage-lg.png)

## 開發介紹
### 技術架構及摘要
![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/TodoShop%20%E5%89%8D%E5%BE%8C%E7%AB%AF%E6%9E%B6%E6%A7%8B.jpeg)

- 更多細節可見附錄 [技術介紹](#技術介紹)
- 前端開發：使用 [React 生態系]((#react))、[Sass/SCSS](#sassscss)、[Normalize.css]((#Normalizecss)) 等獨立開發，並實踐 [RWD、AJAX、reusable React component](#專案細節) 等，沒有使用任何前端 UI 套件
- 後端開發：使用 [Firebase](#Firebase-Firestore) 服務開發資料庫、web server、會員系統等，其中為了串接兩個第三方服務：[TapPay](#第三方服務) (金流)、[Algolia](#第三方服務) (Full-text search 套件)，需要使用 [Firebase Cloud Functions](#Firebase-Cloud-Functions) 自訂兩個跨網域 API，以 [Node.js、Express.js、Axios](#nodejsexpressjsaxios) 技術撰寫程式碼，使前端與 API、API 與第三方服務 req/res
- 開發工具：使用 [Git/GitHub](#gitgithub) 做版本控管，並迭代進行 QA，更多細節可見 [開發流程](#開發流程)

### 目錄架構
以 [Create-react-app](#Create-react-app) 建立專案目錄基礎分立 src、public，其中 src 之中分立 app、components、pages、styles、utils 等子目錄
* app、components、pages：放置 React component 檔案；root component App.js 放置 app 目錄；HomePage、SearchPage 等頁面 component 放置 pages 目錄，其餘者依照所屬 page 分類在 components 目錄
* styles：放置 Styled components 檔案，依照所屬 page 分類；general.scss 具有全域 styles，cssMaterials.js 存放 styles 相關變數及跨頁面邏輯 
* utils：放置 Firebase config script、開發者自身 Library 等
### 開發流程
以 [Git Flow](#gitgithub) 為基礎進行開發，並迭代進行 QA
* 初始化專案時，具有 main、develop branch
* 開發新頁面、新功能時，則新增 branch feature/featureName 進行開發
* 開發完成後以 develop merge  feature/featureName branch
* 階段性發行版本則以 release/versionName 紀錄
* 配合 QA 表格測試、Debug，搭配使用 [USB Debugging](#USB-debugging) 等技術
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
<!-- ## 優化方向 -->
## 附錄
<!-- ### 功能介紹 -->
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
- ##### Firebase Firestore
  使用 Firestore 作為非關聯式資料庫
- ##### Firebase Auth
  使用 Auth 建立會員系統，實踐輸入驗證、即時監聽會員登入狀態改變前端畫面
- ##### Firebase Hosting
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
### 專案介紹
「TodoShop 從購物清單開始：創新電商網站」，其創新之處在於可以讓使用者從建立購物清單開始，並將購物清單無縫地轉換，進一步搜尋清單中的所有商品，簡單的在一個頁面中呈現

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/HomePage-lg.png)

- #### 購物清單頁
在購物清單頁中，使用者可以瀏覽、新增、刪除購物清單，並進一步編輯購物清單內容，新增、刪除清單項目。於手機螢幕中，瀏覽購物清單、編輯購物清單會分為兩個頁面呈現。

圖：購物清單頁左半部所被選取的購物清單，其內容會顯示於右半部

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/TodolistPage-lg.png)

- #### 搜尋頁：輕鬆模式、普通模式
在搜尋頁中可以任意切換輕鬆模式、普通模式，輸入關鍵字搜尋商品，依價格排序搜尋結果。頁面中允許搜尋多個關鍵字，形成分頁，並可自由地新增、刪除分頁。在輕鬆模式中，多種商品被集合在一個頁面中，讓使用者可以透過橫欄的方式選購商品；TodoShop 創新之處便在於可以從建立購物清單開始，並將購物清單無縫地轉換，至輕鬆模式中搜尋清單中的所有商品

圖左：普通模式，搜尋結果以價格高至低排序<br>
圖右：輕鬆模式，可用來搜尋購物清單中羅列的多種商品

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/SearchPage-sm.png)

- #### 購物車、付款頁、會員中心
在購物車中，使用者可以選取特定的商品，並點選「結帳」轉換成訂單，其後於付款頁中填入相關資訊，串接第三方金流，完成付款。訂單狀態可於會員中心「購買訂單」中瀏覽。

圖左：購物車，工具列即時顯示所點選的商品總價，點選「結帳」跳轉付款頁<br>
圖右：付款頁，串接第三方金流 TapPay

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/CartPageNPaymentPage-sm.png)

圖：會員中心頁，「購買訂單」區塊顯示所有訂單狀態及相關資訊

![](https://github.com/haoyuliaocurb/TodoShop/blob/main/images/AuthPage-orders-lg.png)
<!-- ### 程式設計
### 組件開發總覽
#### \<App />
* ##### \<Main /> -->
