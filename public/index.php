<?php
  $urlPath = $_SERVER["DOCUMENT_ROOT"]."/";
  $title = "eスポーツ高等学院（esports high school）は、プロから学べるeスポーツ専門の高校です。";
  $description = "eスポーツ高等学院（esports high school）は、eスポーツ専門の高校です。FORTNITE(フォートナイト)、LEAGUE OF LEGENDS(LoLリーグオブレジェンド)、APEX LEGENDS(エイペックス)など主要なゲームタイトルをプロから学べます。学校は渋谷のど真ん中、全てがハイスペックな設備を誇るシブヤeスタジアムが校舎です。進学率も非常に高く大学進学も可能な新しい高校の選択肢です。";
  $keywords = "eスポーツ高等学院,esports high school,シブヤeスタジアム、プロゲーマー、ストリーマー、動画実況,";
  $url = "";
  $pagePath = "/";
  $ogp = "";
  $siteName = "";
?><!DOCTYPE html>
<html lang="ja">
  <head>
    <?php
      include($urlPath."inc/head/page-meta.php");
      include($urlPath."inc/head/com-css.php");
    ?>
  </head>
  <body>
    <div id="app">
      <?php
        include($_SERVER['DOCUMENT_ROOT']."/inc/page-loading.php");
      ?>
      <div class="page-wrap">
        <header class="header" role="header">
          <?php
            include($_SERVER['DOCUMENT_ROOT']."/inc/header/header-navi.php");
          ?>
        </header>
        <main role="main">
          <div class="page-backgroundmove-container">
            <div class="page-backgroundmove-items">
              <figure class="page-backgroundmove-fig"><img src="assets/images/common/sample-02.jpg"/></figure>
              <figure class="page-backgroundmove-fig2"><img src="assets/images/common/sample-02.jpg"/></figure>
            </div>
          </div>
          <p class="mheight">content これは変数テスト</p>
          <p>content group component : これは変数テスト !!</p><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
          <div class="page-scrolltrigger-container">
            <div class="page-scrolltrigger-items">
              <figure class="page-scrolltrigger-fig page-scrolltrigger-target-a"><img src="assets/images/common/sample-02.jpg"/></figure>
              <figure class="page-scrolltrigger-fig"><img src="assets/images/common/sample-02.jpg"/></figure>
            </div>
            <div class="page-scrolltrigger-items">
              <figure class="page-scrolltrigger-fig"><img src="assets/images/common/sample-02.jpg"/></figure>
              <figure class="page-scrolltrigger-fig page-scrolltrigger-target-b"><img src="assets/images/common/sample-02.jpg"/></figure>
            </div>
          </div>
          <div class="page-scrolltrigger-container">
            <div class="page-scrolltrigger-items">
              <figure class="page-scrolltrigger-fig page-scrolltrigger-target-a"><img src="assets/images/common/sample-02.jpg"/></figure>
              <figure class="page-scrolltrigger-fig"><img src="assets/images/common/sample-02.jpg"/></figure>
            </div>
            <div class="page-scrolltrigger-items">
              <figure class="page-scrolltrigger-fig"><img src="assets/images/common/sample-02.jpg"/></figure>
              <figure class="page-scrolltrigger-fig page-scrolltrigger-target-b"><img src="assets/images/common/sample-02.jpg"/></figure>
            </div>
          </div><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
        </main>
        <footer class="footer" role="footer"></footer>
        <div class="page-cursor-container"><i class="page-cursor"></i></div>
      </div>
    </div><?php
      include($urlPath."inc/footer/com-lib-js.php");
      include($urlPath."inc/footer/com-js.php");
    ?>
  </body>
</html>