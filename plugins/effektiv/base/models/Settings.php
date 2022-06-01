<?php namespace Effektiv\Base\Models;

use System\Models\File;
use October\Rain\Database\Model;
use October\Rain\Database\Traits\Validation;

/**
 * Class Settings
 * @package Effektiv\Base\Models
 * @author  Igor Bashko
 */
class Settings extends Model
{
    use Validation;

    public $implement = ['System.Behaviors.SettingsModel'];
    public $settingsCode = 'effektiv_site_settings';
    public $settingsFields = 'fields.yaml';

    public $attachMany = [];

    public $rules = [];
}