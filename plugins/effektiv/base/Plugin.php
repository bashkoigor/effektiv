<?php namespace Effektiv\Base;

/**
 * The plugin.php file (called the plugin initialization script) defines the plugin information class.
 */
use Event;
use System\Classes\PluginBase;
use Effektiv\Base\Classes\Event\Product\ExtendProductFieldsHandler;
use Effektiv\Base\Classes\Event\Product\ExtendProductModel;

class Plugin extends PluginBase
{

    public function pluginDetails()
    {
        return [
            'name'        => 'Base plugin',
            'description' => 'Base plugin',
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

    /**
     * Plugin boot method
     */
    public function boot()
    {
        $this->addEventListener();

    }

    /**
     * Add listener
     */
    protected function addEventListener()
    {
        // Custom fields in product backend panel
        Event::subscribe(ExtendProductFieldsHandler::class);
        Event::subscribe(ExtendProductModel::class);
    }
}
