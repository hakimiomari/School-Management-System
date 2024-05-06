<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherRegisterRequest extends FormRequest
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
            'photo' => 'required|image|mimes:jpeg,png,jpg,gif,avif,webp|max:4196',
            'name' => 'required|string|min:3',
            'father_name' => 'required|required|min:3',
            'gender' => 'required|in:Male,Female',
            'date_of_birth' => 'required|date',
            'address' => 'required|string',
            'contact' => 'required|regex:/^[0-9]{9,13}$/',
        ];
    }
}