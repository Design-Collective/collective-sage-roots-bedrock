<footer class="content-info" role="contentinfo">
  <div class="container">
    <?php dynamic_sidebar('sidebar-footer'); ?>
  </div>
</footer>

<footer id="footer" class="dark">

  <div class="container">

      <!-- Footer Widgets
      ============================================= -->
      <div class="footer-widgets-wrap clearfix">

          <div class="col_two_third">

              <div class="widget clearfix">

                  <img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo.png" alt="" class="alignleft" style="margin-top: 8px; padding-right: 18px; border-right: 1px solid #4A4A4A; max-width:160px;">

                  <p>The Catalina Flyer is the largest passenger‐carrying catamaran on the West Coast.</p>

                  <div class="line" style="margin: 30px 0;"></div>

                  <div class="col_full">
                      <div class="widget subscribe-widget clearfix">
                          <h5><strong>Subscribe</strong> to Our Newsletter to get Important News, Amazing Offers &amp; Inside Scoops:</h5>
                          <div id="widget-subscribe-form-result" data-notify-type="success" data-notify-msg=""></div>
                          <form id="widget-subscribe-form" action="include/subscribe.php" role="form" method="post" class="nobottommargin" novalidate="novalidate">
                              <div class="input-group divcenter">
                                  <span class="input-group-addon"><i class="icon-email2"></i></span>
                                  <input type="email" id="widget-subscribe-form-email" name="widget-subscribe-form-email" class="form-control required email" placeholder="Enter your Email" aria-required="true">
                                  <span class="input-group-btn">
                                      <button class="btn btn-success" type="submit">Subscribe</button>
                                  </span>
                              </div>
                          </form>

                      </div>
                  </div>

              </div>

          </div>

          <div class="col_one_third col_last">

              <div class="widget clearfix">
                  <h4>Instagram Photos</h4>
                  <div id="instagram_widget" class="instagram-photos masonry-thumbs col-5" data-user="visitcatalinaisland" data-count="10" data-type="user"></div>
              </div>

          </div>

      </div><!-- .footer-widgets-wrap end -->

  </div>

  <!-- Copyrights
  ============================================= -->
  <div id="copyrights">

      <div class="container clearfix">

          <div class="col_half">
              <div class="copyrights-menu copyright-links clearfix">
                  <a href="#">Home</a>/<a href="#">About</a>/<a href="#">Features</a>/<a href="#">Portfolio</a>/<a href="#">FAQs</a>/<a href="#">Contact</a>
              </div>
              Copyrights © 2014 All Rights Reserved by Canvas Inc.
          </div>

          <div class="col_half col_last tright">
              <div class="fright clearfix">
                  <a href="#" class="social-icon si-small si-borderless nobottommargin si-facebook">
                      <i class="icon-facebook"></i>
                      <i class="icon-facebook"></i>
                  </a>

                  <a href="#" class="social-icon si-small si-borderless nobottommargin si-twitter">
                      <i class="icon-twitter"></i>
                      <i class="icon-twitter"></i>
                  </a>

                  <a href="#" class="social-icon si-small si-borderless nobottommargin si-vimeo">
                      <i class="icon-vimeo"></i>
                      <i class="icon-vimeo"></i>
                  </a>

                 
              </div>
          </div>

      </div>

  </div><!-- #copyrights end -->
</footer>
