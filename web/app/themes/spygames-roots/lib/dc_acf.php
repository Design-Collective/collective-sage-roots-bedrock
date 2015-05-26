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


if( function_exists('register_field_group') ):

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


// SLIDER AND PHOTO GALLERY FOR POSTS AND PAGES

register_field_group(array (
	'key' => 'group_5521584c99183',
	'title' => 'Page Images',
	'fields' => array (
		array (
			'key' => 'field_552158657fe93',
			'label' => 'Slider images',
			'name' => 'slider_images',
			'prefix' => '',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'min' => '',
			'max' => '',
			'layout' => 'table',
			'button_label' => 'Add Row',
			'sub_fields' => array (
				array (
					'key' => 'field_552158727fe94',
					'label' => 'Caption',
					'name' => 'caption',
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
				array (
					'key' => 'field_552158847fe95',
					'label' => 'Text',
					'name' => 'text',
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
					'rows' => 3,
					'new_lines' => '',
					'readonly' => 0,
					'disabled' => 0,
				),
				array (
					'key' => 'field_552159ff7fe98',
					'label' => 'Image',
					'name' => 'image',
					'prefix' => '',
					'type' => 'image',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => 'img-responsive',
						'id' => '',
					),
					'preview_size' => 'medium',
					'min_width' => 800,
					'min_height' => 400,
					'min_size' => '',
					'max_width' => '',
					'max_height' => '',
					'max_size' => 2,
					'mime_types' => 'jpg,png',
					'return_format' => 'array',
					'library' => 'all',
				),
			),
		),
		array (
			'key' => 'field_55215a827fe9a',
			'label' => 'Photo Gallery',
			'name' => 'photo_gallery',
			'prefix' => '',
			'type' => 'repeater',
			'instructions' => '',
			'required' => 0,
			'conditional_logic' => 0,
			'wrapper' => array (
				'width' => '',
				'class' => '',
				'id' => '',
			),
			'min' => '',
			'max' => '',
			'layout' => 'table',
			'button_label' => 'Add Row',
			'sub_fields' => array (
				array (
					'key' => 'field_55215a827fe9b',
					'label' => 'Caption',
					'name' => 'caption',
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
				array (
					'key' => 'field_55215a827fe9c',
					'label' => 'Text',
					'name' => 'text',
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
					'rows' => 3,
					'new_lines' => '',
					'readonly' => 0,
					'disabled' => 0,
				),
				array (
					'key' => 'field_55215a827fe9d',
					'label' => 'Image',
					'name' => 'image',
					'prefix' => '',
					'type' => 'image',
					'instructions' => '',
					'required' => 0,
					'conditional_logic' => 0,
					'wrapper' => array (
						'width' => '',
						'class' => 'img-responsive',
						'id' => '',
					),
					'return_format' => 'array',
					'preview_size' => 'medium',
					'library' => 'uploadedTo',
					'min_width' => 800,
					'min_height' => 600,
					'min_size' => '',
					'max_width' => '',
					'max_height' => '',
					'max_size' => 6,
					'mime_types' => 'jpg,png',
				),
			),
		),
	),
	'location' => array (
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'post',
			),
		),
		array (
			array (
				'param' => 'post_type',
				'operator' => '==',
				'value' => 'page',
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

