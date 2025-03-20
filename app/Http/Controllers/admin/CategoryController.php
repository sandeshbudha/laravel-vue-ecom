<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryTreeResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function getAsTree()
    {
        return Category::getActiveAsTree(CategoryTreeResource::class);
    }

}
