<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StudentUpdateRequest extends FormRequest
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
            'parent_name' => 'required|required|min:3',
            'email' => 'required|email|unique:students,email,' . $this->input('id'),
            'gender' => 'required|in:Male,Female',
            'date_of_birth' => 'required|date',
            'address' => 'required|string',
            'contact_number' => 'required|regex:/^[0-9]{9,13}$/',
        ];
    }
}
