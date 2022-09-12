<?php namespace Effektiv\Main;

use Backend;
use System\Classes\PluginBase;

/**
 * main Plugin Information File
 */
class Plugin extends PluginBase
{
    /**
     * Returns information about this plugin.
     *
     * @return array
     */
    public function pluginDetails()
    {
        return [
            'name'        => 'Effektiv',
            'description' => 'Main plugin, contain all features',
            'author'      => 'effektiv',
            'icon'        => 'icon-leaf'
        ];
    }

    /**
     * Register method, called when the plugin is first registered.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Boot method, called right before the request route.
     *
     * @return void
     */
    public function boot()
    {

    }

    /**
     * Registers any front-end components implemented in this plugin.
     *
     * @return array
     */
    public function registerComponents()
    {
        return [
            'Effektiv\Main\Components\Subscribers' => 'Subscribers',
        ];
    }

    /**
     * Registers any back-end permissions used by this plugin.
     *
     * @return array
     */
    public function registerPermissions()
    {
        return []; // Remove this line to activate

        return [
            'effektiv.main.some_permission' => [
                'tab' => 'main',
                'label' => 'Some permission'
            ],
        ];
    }

    /**
     * Registers back-end navigation items for this plugin.
     *
     * @return array
     */
    public function registerNavigation()
    {
        return [
            'main' => [
                'label'       => 'Effektiv',
                'url'         => Backend::url('effektiv/main/subscribers'),
                'icon'        => 'icon-list',
                'permissions' => ['effektiv.main.*'],
                'order'       => 5000,
                'sideMenu' => [
                    'items' => [
                        'label'       => 'Подписчики',
                        'url'         => Backend::url('effektiv/main/subscribers'),
                        'icon'        => 'icon-leaf',
                        'permissions' => ['effektiv.subscribers.*'],
                        'order'       => 500,
                    ]
                ],
            ],
        ];
    }
}
