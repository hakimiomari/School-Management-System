<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoomRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', Rule::unique('rooms')->where(function ($query) {
                    return $query->where('number', $this->input('number'))
                        ->where('id', '!=', $this->input('id'));
                })
            ],
            'number' => 'required|numeric',
            'capicity' => 'required|numeric'
        ];
    }
}
