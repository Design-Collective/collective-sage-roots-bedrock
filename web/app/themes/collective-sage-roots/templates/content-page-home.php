
<?php 

// Example of Home Page Content

?>

<section id="slider" class="section parallax nomargin notopborder dark"style="transform: translate(0px, 0px); background: url(https://placeholdit.imgix.net/~text?txtsize=113&txt=1500%C3%971000&w=1500&h=1000) no-repeat; background-size: cover; background-position:center 200px;" data-height-lg="670" data-height-md="500" data-height-sm="490" data-height-xs="450" data-height-xxs="200"  data-stellar-background-ratio="-0.3">
    <div class="overlay in"></div>
    <div class="container clearfix overlayed-container">
        <div class="vertical-middle center" style="opacity: 2.22222222222222; position: absolute; top: 50%; width: 100%; margin-top: -14px;">

            <div class="heading-block nobottomborder center">
                <h1>
                    <div class="text-rotater" data-separator="|" data-rotate="flipInX" data-speed="3500">
                        Some Site <span class="t-rotate"><span class="animated flipInX">Title</span></span>
                    </div>
                </h1>
            </div>

        </div>
    </div>
</section>



<div class="section nomargin notopborder overlayed-container notop cover-bg">
    <div class="container clearfix">

      <div class="topmargin-sm bottommargin-sm center">
          <h2>Some Content</h2>
      </div>
      <p class="center">Some Paragraph</p>

      <div class="row">
          <div class="col_one_fifth">
            <img class="img-circle" src="https://placeholdit.imgix.net/~text?txtsize=47&txt=300%C3%97300&w=300&h=300"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="https://placeholdit.imgix.net/~text?txtsize=47&txt=300%C3%97300&w=300&h=300"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="https://placeholdit.imgix.net/~text?txtsize=47&txt=300%C3%97300&w=300&h=300"/>
          </div>
          <div class="col_one_fifth">
            <img class="img-circle" src="https://placeholdit.imgix.net/~text?txtsize=47&txt=300%C3%97300&w=300&h=300"/>
          </div>
          <div class="col_one_fifth col_last">
            <img class="img-circle" src="https://placeholdit.imgix.net/~text?txtsize=47&txt=300%C3%97300&w=300&h=300"/>
          </div>
          
      </div>
      <div class="row">
          <div class="col-md-3 col-md-push-3 text-right">
            <a class="btn btn-primary btn-lg">Primary</a>
          </div>
          <div class="col-md-3 col-md-push-3 text-left">
            <a class="btn btn-secondary btn-lg">Secondary</a>
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