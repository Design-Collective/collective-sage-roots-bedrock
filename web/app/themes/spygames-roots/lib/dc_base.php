<?php

// changing the login page URL
function put_my_url(){
    // return bloginfo('url'); // changes the url link from wordpress.org to your blog or website's url
    return false;
}
add_filter('login_headerurl', 'put_my_url');

// changing the login page URL hover text
function put_my_title(){
    return false;
    // return bloginfo('name'); // changing the title from "Powered by WordPress" to whatever you wish
}
add_filter('login_headertitle', 'put_my_title');

// changing the alt text on the logo to show your site name 
// function my_login_title() { echo get_option('blogname'); }
// add_filter('login_headertitle', 'my_login_title');

/* Post thumbnail helper */

function thumb_url($size = 'large') {
    global $post;
    $thumb_id = get_post_thumbnail_id();
    $thumb_url_array = wp_get_attachment_image_src($thumb_id, $size, true);
    $thumb_url = $thumb_url_array[0];
    return $thumb_url;
}

/* Hide admin menu bar on frontend for non-admins */
if (!is_admin() && !current_user_can( 'manage_options' )) {
  show_admin_bar( false );
}

/* Post-login redirect admins to admin, users to homepage */

function admin_login_redirect( $redirect_to, $request, $user )
{
    global $user;
    if( isset( $user->roles ) && is_array( $user->roles ) ) {
        if( in_array( "administrator", $user->roles ) ) {
            return $redirect_to;
        } else {
            return home_url();
        }
    }
    else 
    {
        return $redirect_to;
    }
}
add_filter("login_redirect", "admin_login_redirect", 10, 3);


/* Remove styling from login page */

add_action( 'login_init', function() {
    wp_deregister_style( 'login' );
    wp_register_style( 'login', '' );
    // wp_enqueue_style( 'custom-login', get_stylesheet_directory_uri() . '/assets/css/main.min.css' );
} );

