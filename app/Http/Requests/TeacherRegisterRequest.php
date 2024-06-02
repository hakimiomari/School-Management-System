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
            'name' => 'required|string|min:3',
            'father_name' => 'required|string|min:3',
            'email' => 'required|email|unique:users,email',
            'degree' => 'required|in:Bikloria,Bachlor,Master',
            'gender' => 'required|in:Male,Female',
            'date_of_birth' => 'required|date',
            'address' => 'required|string',
            'contact' => 'required|regex:/^[0-9]{9,13}$/',
            'bio' => 'required|string|min:20',
            'photo' => 'image|mimes:jpeg,png,jpg,gif,webp,avif|max:4196',
        ];
    }
}