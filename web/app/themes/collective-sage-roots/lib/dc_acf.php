<?php

/*

	SETUP ACF CUSTOM FIELDS

*/

// Customize ACF path
add_filter('acf/settings/path', 'my_acf_settings_path');
 
function my_acf_settings_path( $path ) {
 
    // update path
    $path = get_stylesheet_directory() . '/acf/';
    
    // return
    return $path;
    
}
 

// Set ACF dir
add_filter('acf/settings/dir', 'my_acf_settings_dir');
 
function my_acf_settings_dir( $dir ) {
 
    // update path
    $dir = get_stylesheet_directory_uri() . '/acf/';
    
    // return
    return $dir;
    
}
 

// Hide ACF field group menu item
add_filter('acf/settings/show_admin', 'my_acf_show_admin');

function my_acf_show_admin( $show ) {    
    return current_user_can('manage_options');
}


// Include ACF
include_once( get_stylesheet_directory() . '/acf/acf.php' );



//
//	SETUP AN OPTIONS PAGE
//


/*

if(function_exists('acf_add_options_page')) { 

	acf_add_options_page(array(
		'page_title' 	=> 'Theme General Settings',
		'menu_title'	=> 'Theme Settings',
		'menu_slug' 	=> 'theme-general-settings',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Header Settings',
		'menu_title'	=> 'Header',
		'parent_slug'	=> 'theme-general-settings',
	));
	
	acf_add_options_sub_page(array(
		'page_title' 	=> 'Theme Footer Settings',
		'menu_title'	=> 'Footer',
		'parent_slug'	=> 'theme-general-settings',
	));

}

For more information:
http://www.advancedcustomfields.com/resources/register-multiple-options-pages/

*/



//
//	REGISTER ACH FIELD GROUPS
//


if( function_exists('register_field_group') ) {

  /* 

  	How to setup field groups:

  	* How to guides: 	http://www.advancedcustomfields.com/resources/#how-to
  	* Tutorials: 		http://www.advancedcustomfields.com/resources/#tutorials

  */

  //
  // BASE ADMIN FIELDS
  //

  register_field_group(array (
  	'key' => 'group_55218fee218e3',
  	'title' => 'Admin Fields',
  	'fields' => array (
  		array (
  			'key' => 'field_552190052b9f5',
  			'label' => 'Custom Html',
  			'name' => 'custom_html',
  			'prefix' => '',
  			'type' => 'textarea',
  			'instructions' => '',
  			'required' => 0,
  			'conditional_logic' => 0,
  			'wrapper' => array (
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  			'maxlength' => '',
  			'rows' => '',
  			'new_lines' => 'wpautop',
  			'readonly' => 0,
  			'disabled' => 0,
  		),
  		array (
  			'key' => 'field_552190fd2b9f8',
  			'label' => 'Extra Body Classes',
  			'name' => 'extra_body_classes',
  			'prefix' => '',
  			'type' => 'text',
  			'instructions' => '',
  			'required' => 0,
  			'conditional_logic' => 0,
  			'wrapper' => array (
  				'width' => '',
  				'class' => '',
  				'id' => '',
  			),
  			'default_value' => '',
  			'placeholder' => '',
  			'prepend' => '',
  			'append' => '',
  			'maxlength' => '',
  			'readonly' => 0,
  			'disabled' => 0,
  		),
  	),
  	'location' => array (
  		array (
  			array (
  				'param' => 'post_type',
  				'operator' => '==',
  				'value' => 'post',
  			),
  			array (
  				'param' => 'current_user_role',
  				'operator' => '==',
  				'value' => 'administrator',
  			),
  		),
  		array (
  			array (
  				'param' => 'post_type',
  				'operator' => '==',
  				'value' => 'page',
  			),
  			array (
  				'param' => 'current_user_role',
  				'operator' => '==',
  				'value' => 'administrator',
  			),
  		),
  	),
  	'menu_order' => 0,
  	'position' => 'normal',
  	'style' => 'default',
  	'label_placement' => 'top',
  	'instruction_placement' => 'label',
  	'hide_on_screen' => '',
  ));


}
