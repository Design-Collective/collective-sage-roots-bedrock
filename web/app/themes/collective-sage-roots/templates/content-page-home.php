
<?php 

// Example of Home Page Content

?>

<section id="slider" style="height: 500px; transform: translate(0px, 0px); background: url(<?php echo get_stylesheet_directory_uri(); ?>/dist/images/island_lg.jpg) ;">
    <div class="container clearfix">
        <div class="vertical-middle center" style="opacity: 2.22222222222222; position: absolute; top: 50%; width: 100%; margin-top: -14px;">

            <div class="heading-block nobottomborder center">
                <h1>
                    <div class="text-rotater" data-separator="|" data-rotate="flipInX" data-speed="3500">
                        We make your Business <span class="t-rotate"><span class="animated flipInX">Profitable</span></span>
                    </div>
                </h1>
            </div>

        </div>
    </div>
</section>

<section>
  <div class="container-fullwidth clearfix">
    <h2>About the Catalina Flyer</h2>
    <p>The Catalina Flyer is the largest passenger‐carrying catamaran on the West Coast, getting you from Newport Beach to Avalon in just over an hour. You’ll enjoy the richly appointed interior, sweeping sun decks, full‐service cocktail lounges, stately viewing windows and the smooth ride all the way. The Catalina Flyer is not only one of the FASTEST boats, but the BEST way to Catalina Island.</p>

    <p class="text-align-right bold">The Catalina Flyer travels round trip between Newport Beach and Avalon once daily</p>

    <div class="row">
      <div class="col-md-6">
        <h4><i class="fa fa-map-marker"></i>Location</h4>
        <ul class="iconlist nobottommargin">
          <li>The Balboa Pavilion </li>
          <li>400 Main St.</li>
          <li>Newport Beach, CA 92661</li>
        </ul>
      </div>
      <div class="col-md-6">
      <h4><i class="fa fa-clock-o"></i>Time</h4>
        <ul class="iconlist nobottommargin">
          <li>09:00am - Departs Balboa Pavilion</li>
          <li>10:15am - Arrives at Avalon, Catalina Island</li>
          <li>4:30pm - Departs Avalon, Catalina Island</li>
          <li>5:45pm - Arrives at Balboa Pavilion</li>
        </ul>
      </div>
    </div>
    <p class="text-align-right">Didn’t find the info you’re looking for? Visit our FAQs section </p>
  </div>
</section>
<?php get_template_part('templates/includes/header', 'carousel'); ?>

<div class="container">

  <?php get_template_part('templates/page', 'header'); ?>
  <?php the_content(); ?>
  <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
</div>