<?php

use Roots\Sage\Config;
use Roots\Sage\Wrapper;

?>

<!DOCTYPE html>
<html dir="ltr" lang="en-US">
  <?php get_template_part('templates/head'); ?>
  <body <?php body_class('stretched sticky-responsive-menu'); ?>>
    <div id="wrapper" class="clearfix">
      <!--[if lt IE 9]>
        <div class="alert alert-warning">
          <?php _e('You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.', 'sage'); ?>
        </div>
      <![endif]-->
      <?php
        do_action('get_header');
        get_template_part('templates/header');
      ?>

      <div class="wrap notoppadding" role="document">
        <div class="content">
          <main class="main" role="main">
            <?php include Wrapper\template_path(); ?>
          </main><!-- /.main -->
        </div><!-- /.content -->
      </div><!-- /.wrap -->

      <?php
        do_action('get_footer');
        get_template_part('templates/footer');
        wp_footer();
      ?>
    </div>
    <div id="gotoTop" class="icon-angle-up"></div>
  </body>
</html>
