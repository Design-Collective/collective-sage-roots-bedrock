
<?php 

// Example of Home Page Content

?>

<?php get_template_part('templates/includes/header', 'carousel'); ?>

<div class="container">

  <?php get_template_part('templates/page', 'header'); ?>
  <?php the_content(); ?>
  <?php wp_link_pages(['before' => '<nav class="page-nav"><p>' . __('Pages:', 'sage'), 'after' => '</p></nav>']); ?>
</div>