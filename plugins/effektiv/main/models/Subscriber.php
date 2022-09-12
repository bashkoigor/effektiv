<?php namespace Effektiv\Main\Models;

use Model;

/**
 * Subscriber Model
 */
class Subscriber extends Model
{
    use \October\Rain\Database\Traits\Validation;

    /**
     * @var string table associated with the model
     */
    public $table = 'effektiv_main_subscribers';

    /**
     * @var array guarded attributes aren't mass assignable
     */
    protected $guarded = ['*'];

    /**
     * @var array fillable attributes are mass assignable
     */
    protected $fillable = [];

    /**
     * @var array rules for validation
     */
    public $rules = [
        'name' => 'required|max:16',
        'surname' => 'required|max:16',
        'email' => 'required|email',
        'country' => 'required|max:16',
        'city' => 'required|max:16',
        'zip_code' => 'required|max:16',
        'street' => 'required|max:16',
        'house' => 'required|numeric',
        'apartment' => 'numeric',
    ];

    /**
     * @var array translate for attribute
     */
    public $attributeNames = [
        'name'      => 'effektiv.main::lang.validation.name',
        'surname'   => 'effektiv.main::lang.validation.surname',
        'email'     => 'effektiv.main::lang.validation.email',
        'country'   => 'effektiv.main::lang.validation.country',
        'city'      => 'effektiv.main::lang.validation.city',
        'zip_code'  => 'effektiv.main::lang.validation.zip_code',
        'street'    => 'effektiv.main::lang.validation.street',
        'house'     => 'effektiv.main::lang.validation.house',
        'apartment' => 'effektiv.main::lang.validation.apartment',
    ];

    /**
     * @var array Attributes to be cast to native types
     */
    protected $casts = [];

    /**
     * @var array jsonable attribute names that are json encoded and decoded from the database
     */
    protected $jsonable = [];

    /**
     * @var array appends attributes to the API representation of the model (ex. toArray())
     */
    protected $appends = [];

    /**
     * @var array hidden attributes removed from the API representation of the model (ex. toArray())
     */
    protected $hidden = [];

    /**
     * @var array dates attributes that should be mutated to dates
     */
    protected $dates = [
        'created_at',
        'updated_at'
    ];

    /**
     * @var array hasOne and other relations
     */
    public $hasOne = [];
    public $hasMany = [];
    public $belongsTo = [];
    public $belongsToMany = [];
    public $morphTo = [];
    public $morphOne = [];
    public $morphMany = [];
    public $attachOne = [];
    public $attachMany = [];
}
