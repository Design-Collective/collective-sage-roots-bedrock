<?php

/* DC Config Functions */

/*
Create Custom Post type for Projects
NOTE: If your CPT is named movie:
archive pages will attempt to load templates/content-movie.php
single posts will attempt to load templates/content-single-movie.php
*/

add_action( 'init', 'init_project_post_type' );
function init_project_post_type() {
  register_post_type( 'projects',
    array(
      'labels' => array(
        'name' => __( 'Projects' ),
        'singular_name' => __( 'Project' )
      ),
      'has_archive' => true,
      'public' => true,
      'hierarchical' => true,
      'show_ui' => true,   
      'menu_position' => 5,
      'supports' => array(
            'title',
            'editor',
            'custom-fields',
            'revisions',
            'thumbnail',
            'author',
            'page-attributes'),
      'rewrite'  => array( 'slug' => 'project' ),
      'menu_icon'   => 'dashicons-video-alt',
    )
  );
  flush_rewrite_rules();
}
// Register a Custom Taxonomy for the Project
register_taxonomy("project_category", array("projects"), array("hierarchical" => true, "label" => "Project Categories", "singular_label" => "Project Category", "rewrite" => true));

// Roots Sage WSrapper as per 
// https://roots.io/sage/docs/theme-wrapper

add_filter('sage/wrap_base', __NAMESPACE__ . '\\sage_wrap_base_cpts'); // Add our function to the sage_wrap_base filter

function sage_wrap_base_cpts($templates) {
  $cpt = get_post_type(); // Get the current post type
  if ($cpt) {
     array_unshift($templates, 'base-' . $cpt . '.php'); // Shift the template to the front of the array
  }
  return $templates; // Return our modified array with base-$cpt.php at the front of the queue
}

// Do Front Page Instead of Regular Posts

// - Create a Front Page
if (isset($_GET['activated']) && is_admin()){

  $new_page_title = 'Home';
  $new_page_content = 'Hello - this is your new Homepage!';

  //don't change the code bellow, unless you know what you're doing

  $page_check = get_page_by_title($new_page_title);
  $new_page = array(
    'post_type' => 'page',
    'post_title' => $new_page_title,
    'post_content' => $new_page_content,
    'post_status' => 'publish',
    'post_author' => 1,
  );
  if(!isset($page_check->ID)){
    $new_page_id = wp_insert_post($new_page);
    if(!empty($new_page_template)){
            update_post_meta($new_page_id, '_wp_page_template', $new_page_template);
    }
  }
  // Set the Front Page Programatically
  add_action( 'after_setup_theme', 'change_theme_frontpage' );

  function change_theme_frontpage() {
    // Use a static front page
    $home = get_page_by_title( 'home' );
    update_option( 'page_on_front', $home->ID );
    update_option( 'show_on_front', 'page' );
  }
}


// Hide Admin Bar
// if(is_home()) {
  add_filter('show_admin_bar', '__return_false');
// }

// Disable support for comments and trackbacks in post types
function df_disable_comments_post_types_support() {
  $post_types = get_post_types();
  foreach ($post_types as $post_type) {
    if(post_type_supports($post_type, 'comments')) {
      remove_post_type_support($post_type, 'comments');
      remove_post_type_support($post_type, 'trackbacks');
    }
  }
}
add_action('admin_init', 'df_disable_comments_post_types_support');

// Close comments on the front-end
function df_disable_comments_status() {
  return false;
}
add_filter('comments_open', 'df_disable_comments_status', 20, 2);
add_filter('pings_open', 'df_disable_comments_status', 20, 2);

// Hide existing comments
function df_disable_comments_hide_existing_comments($comments) {
  $comments = array();
  return $comments;
}
add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);

// Remove comments page in menu
function df_disable_comments_admin_menu() {
  remove_menu_page('edit-comments.php');
}
add_action('admin_menu', 'df_disable_comments_admin_menu');

// Redirect any user trying to access comments page
function df_disable_comments_admin_menu_redirect() {
  global $pagenow;
  if ($pagenow === 'edit-comments.php') {
    wp_redirect(admin_url()); exit;
  }
}
add_action('admin_init', 'df_disable_comments_admin_menu_redirect');

// Remove comments metabox from dashboard
function df_disable_comments_dashboard() {
  remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
}
add_action('admin_init', 'df_disable_comments_dashboard');

// Remove comments links from admin bar
function df_disable_comments_admin_bar() {
  if (is_admin_bar_showing()) {
    remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
  }
}
add_action('init', 'df_disable_comments_admin_bar');

// Disable WP Auto Formatting

remove_filter('the_excerpt', 'wpautop');
remove_filter('comment_text', 'wpautop');
remove_filter('the_title', 'wpautop');

// Bootstrap Wrap OEmbed
function bootstrap_wrap_oembed( $html ){
  $html = preg_replace( '/(width|height)="\d*"\s/', "", $html ); // Strip width and height #1
  return'<div class="embed-responsive embed-responsive-16by9">'.$html.'</div>'; // Wrap in div element and return #3 and #4
}
add_filter( 'embed_oembed_html','bootstrap_wrap_oembed',10,1);

// Add Responsive to all images
function add_responsive_class($content){

        $content = mb_convert_encoding($content, 'HTML-ENTITIES', "UTF-8");
        $document = new DOMDocument();
        libxml_use_internal_errors(true);
        $document->loadHTML(utf8_decode($content));

        $imgs = $document->getElementsByTagName('img');
        foreach ($imgs as $img) {           
           $img->setAttribute('class','img-responsive');
        }

        $html = $document->saveHTML();
        return $html;   
}
add_filter('the_content', 'add_responsive_class');

