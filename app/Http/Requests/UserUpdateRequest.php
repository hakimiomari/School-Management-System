<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
        $id = $this->input('id');
        return [
            'name' => 'required|string|max:255|min:3',
            'email' => 'required|email|unique:users,email,' . $this->input('id'),
            'profession' => 'required|string|max:255|min:3',
            'bio' => 'required|string|max:2000',
            'file' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp,avif|max:4196',
        ];
    }
}