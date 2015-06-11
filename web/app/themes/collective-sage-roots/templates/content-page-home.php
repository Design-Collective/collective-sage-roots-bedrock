
<?php 

// Example of Home Page Content

?>

<section id="slider" class="section parallax nomargin notopborder dark"style="transform: translate(0px, 0px); background: url(<?php echo get_stylesheet_directory_uri(); ?>/dist/images/island_areal.jpg) no-repeat; background-size: cover;" data-height-lg="670" data-height-md="500" data-height-sm="490" data-height-xs="450" data-height-xxs="200">
    <div class="overlay in"></div>
    <div class="container clearfix overlayed-container">
        <div class="vertical-middle center" style="opacity: 2.22222222222222; position: absolute; top: 50%; width: 100%; margin-top: -14px;">

            <div class="heading-block nobottomborder center">
                <h1>
                    <div class="text-rotater" data-separator="|" data-rotate="flipInX" data-speed="3500">
                        Catalina Island <span class="t-rotate"><span class="animated flipInX">Tickets</span></span>
                    </div>
                </h1>
            </div>

        </div>
    </div>
</section>

<section>
  <div class="container-fullwidth clearfix text-center">
    <h2>About the Catalina Flyer</h2>
    <p>The Catalina Flyer is the largest passenger‐carrying catamaran on the West Coast, getting you from Newport Beach to Avalon in just over an hour. You’ll enjoy the richly appointed interior, sweeping sun decks, full‐service cocktail lounges, stately viewing windows and the smooth ride all the way. The Catalina Flyer is not only one of the FASTEST boats, but the BEST way to Catalina Island.</p>
    <p class="text-right"><strong>The Catalina Flyer travels round trip between Newport Beach and Avalon once daily</strong></p>
  </div>
  <div class="section nobg nopadding nomargin">
    <div class="col_half boat nobottommargin">
      <img src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/boat.png">
    </div>
    <div class="col_half col_last col-padding noleftpadding notoppadding nobottommargin nobottompadding">
      <div class="row">
        <div class="col-md-6">
          <h4 class="text-primary"><i class="fa fa-map-marker"></i> Location</h4>
          <ul class="list-unstyled">
            <li>The Balboa Pavilion </li>
            <li>400 Main St.</li>
            <li>Newport Beach, CA 92661</li>
          </ul>
        </div>
        <div class="col-md-6">
          <h4 class="text-primary"><i class="fa fa-clock-o"></i> Time</h4>
          <ul class="list-unstyled">
            <li>09:00am - Departs Balboa Pavilion</li>
            <li>10:15am - Arrives at Avalon, Catalina Island</li>
            <li>4:30pm - Departs Avalon, Catalina Island</li>
            <li>5:45pm - Arrives at Balboa Pavilion</li>
          </ul>
        </div>
      </div>
      <p class="clear"></p>
      <p class="text-right">Didn’t find the info you’re looking for? <a href="#"> Visit our FAQs section <i class="fa fa-chevron-right"></i></a></p>
    </div>

  </div>
</section>

<div class="section parallax nomargin notopborder dark overlayed-container notop cover-bg" style="background-image: url(<?php echo get_stylesheet_directory_uri(); ?>/dist/images/island_lg.jpg);" data-stellar-background-ratio="0.1">
  <div class="overlay in"></div>
  <div class="container overlayed-container clearfix">

      <div class="topmargin-sm bottommargin-sm center">
          <h2>About Catalina Island</h2>
      </div>
      <p>Catalina Island is the ultimate place to escape the hustle and bustle of city life. It has long been one of LA's favorite vacation destinations. Kayak through the gorgeous clear waters in the morning, venture out on the Zip Line for a thrill, soar to new heights parasailing around the bay, hike or ride the horse trails and see buffalo roaming wild, play a quiet round of golf and still have an incredible dinner on the beachfront with exceptional cuisine. No matter how you like to relax, Catalina Island can accommodate you and getting there has never been easier.</p>

      <div class="row">
          <div class="col_one_fifth">
            <img class="img-circle" src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/about1.jpg"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/about2.jpg"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/about3.jpg"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/about4.jpg"/>
          </div>
          <div class="col_one_fifth col_last">
            <img class="img-circle" src="<?php echo get_stylesheet_directory_uri(); ?>/dist/images/about5.jpg"/>
          </div>
          
      </div>
      <div class="row">
          <div class="col-md-3 col-md-push-3">
            <a class="btn btn-primary btn-lg">Search Hotels</a>
          </div>
          <div class="col-md-3 col-md-push-3">
            <a class="btn btn-secondary btn-lg">Search Attractions</a>
          </div>
      </div>

      <p class="clear"></p>
      <p class="text-center"><a href="#wrapper" data-scrollto="#wrapper">Back to Top</a></p>
      <div class="ad-728x90 center"><img src="http://lorempixel.com/728/90/nature/"/></div>
  </div>
</div>

<?php #get_template_part('templates/includes/header', 'carousel'); ?>

<div class="container">

  <?php get_template_part('templates/page', 'header'); ?>
  <?php the_content(); ?>
  <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
</div>