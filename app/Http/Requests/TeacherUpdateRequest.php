<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeacherUpdateRequest extends FormRequest
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
            'photo' => 'image|mimes:jpeg,png,jpg,gif,avif,webp|max:4196',
            'name' => 'required|string|min:3',
            'father_name' => 'required|string|min:3',
            'email' => 'required|email|unique:teachers,email,' . $this->input('id'),
            'degree' => 'required|string',
            'gender' => 'required|in:Male,Female',
            'date_of_birth' => 'required|date',
            'address' => 'required|string',
            'contact' => 'required|regex:/^[0-9]{9,13}$/',
        ];
    }
}