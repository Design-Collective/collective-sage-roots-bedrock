
<header id="header" class="transparent-header full-header dark" data-sticky-class="not-dark">

  <div id="header-wrap" class="">

      <div class="container clearfix">

          <div id="primary-menu-trigger"><i class="icon-reorder"></i></div>

          <!-- Logo
          ============================================= -->

          <div id="logo">

              <a class="text-hide standard-logo" data-dark-logo="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo.png" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo_inverse.png" alt="Canvas Logo"></a>

              <a class="text-hide retina-logo" data-dark-logo="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo.png" href="<?= esc_url(home_url('/')); ?>"><?php bloginfo('name'); ?><img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/logo_inverse.png" alt="Canvas Logo"></a>
          </div><!-- #logo end -->

          <!-- Primary Navigation
          ============================================= -->
          <nav id="primary-menu" class="dark">
              <?php
              if (has_nav_menu('primary_navigation')) :
                $defaults = array(
                  'theme_location'  => 'primary_navigation',
                  'menu'            => '',
                  'container'       => '',
                  'container_class' => '',
                  'container_id'    => '',
                  'menu_class'      => 'dark',
                  'menu_id'         => '',
                  'echo'            => true,
                  'fallback_cb'     => 'wp_page_menu',
                  'before'          => '',
                  'after'           => '',
                  'link_before'     => '',
                  'link_after'      => '',
                  'items_wrap'      => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                  'depth'           => 0,
                  'walker'          => ''
                );
                wp_nav_menu($defaults);
              endif;
              ?>

              <!-- Top Cart
              ============================================= -->
              <div id="top-cart">
                  <a href="#" id="top-cart-trigger"><i class="icon-shopping-cart"></i><span>5</span></a>
                  <div class="top-cart-content">
                      <div class="top-cart-title">
                          <h4>Shopping Cart</h4>
                      </div>
                      <div class="top-cart-items">
                          <div class="top-cart-item clearfix">

                              <div class="top-cart-item-desc">
                                  <a href="#">Blue Round-Neck Tshirt</a>
                                  <span class="top-cart-item-price">$19.99</span>
                                  <span class="top-cart-item-quantity">x 2</span>
                              </div>
                          </div>
                          <div class="top-cart-item clearfix">

                              <div class="top-cart-item-desc">
                                  <a href="#">Light Blue Denim Dress</a>
                                  <span class="top-cart-item-price">$24.99</span>
                                  <span class="top-cart-item-quantity">x 3</span>
                              </div>
                          </div>
                      </div>
                      <div class="top-cart-action clearfix">
                          <span class="fleft top-checkout-price">$114.95</span>
                          <button class="button button-3d button-small nomargin fright">View Cart</button>
                      </div>
                  </div>
              </div><!-- #top-cart end -->

              <!-- Top Search
              ============================================= -->
              <div id="top-search">
                  <a href="#" id="top-search-trigger"><i class="icon-search3"></i><i class="icon-line-cross"></i></a>
                  <form action="search.html" method="get">
                      <input type="text" name="q" class="form-control" value="" placeholder="Type &amp; Hit Enter..">
                  </form>
              </div><!-- #top-search end -->

          </nav><!-- #primary-menu end -->


          
      </div>

  </div>

</header>
