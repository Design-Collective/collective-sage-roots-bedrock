<?php 
/* Rename this file  i.e. single-projects.php 
Then create templates/content-single-projects.php
*/
?>

<?php get_template_part('templates/content-single', get_post_type() != 'post' ? get_post_type() : get_post_format()); ?>

