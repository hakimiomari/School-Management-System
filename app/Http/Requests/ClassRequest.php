<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ClassRequest extends FormRequest
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
            'grade' => ['required',Rule::unique('classes')->where(function($query){
                return $query->where('class',$this->input('class'));
            })
        ],
            'class' => 'required|string|min:3',
            'teacher' => 'required|unique:classes,teacher',
        ];
    }
}