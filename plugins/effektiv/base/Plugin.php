<?php namespace Effektiv\Base;

/**
 * The plugin.php file (called the plugin initialization script) defines the plugin information class.
 */

use System\Classes\PluginBase;

class Plugin extends PluginBase
{

    public function pluginDetails()
    {
        return [
            'name'        => 'Breadcrumbs',
            'description' => 'Breadcrumbs component',
            'author'      => 'Igor Bashko',
            'icon'        => 'icon-leaf'
        ];
    }

    public function registerComponents()
    {
        return [
            '\Effektiv\Base\Components\Breadcrumbs' => 'Breadcrumbs'
        ];
    }
}
