<?php
  $urlPath = $_SERVER["DOCUMENT_ROOT"]."/";
  $title = "";
  $description = "";
  $keywords = ",";
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
        <main role="main"></main>
        <footer class="footer" role="footer"></footer>
        <div class="page-cursor-container"><i class="page-cursor"></i></div>
      </div>
    </div><?php
      include($urlPath."inc/footer/com-lib-js.php");
      include($urlPath."inc/footer/com-js.php");
    ?>
  </body>
</html>