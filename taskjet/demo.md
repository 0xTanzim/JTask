<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Task Dashboard &amp; Category Management</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#136dec",
                        "background-light": "#f6f7f8",
                        "background-dark": "#101822",
                    },
                    fontFamily: {
                        "display": ["Inter"]
                    },
                    borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .sidebar-item-active {
            background-color: rgba(19, 109, 236, 0.1);
            border-left: 4px solid #136dec;
        }
    </style>
</head>
<body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen">
<div class="flex h-screen overflow-hidden">
<!-- Sidebar -->
<aside class="w-72 bg-white dark:bg-[#111822] border-r border-slate-200 dark:border-slate-800 flex flex-col">
<div class="p-6">
<div class="flex items-center gap-3 text-primary mb-8">
<span class="material-symbols-outlined text-3xl font-bold">check_circle</span>
<h1 class="text-xl font-bold tracking-tight">TaskFlow</h1>
</div>
<div class="flex flex-col gap-6">
<div>
<p class="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-2">Workspace</p>
<nav class="flex flex-col gap-1">
<a class="flex items-center justify-between px-3 py-2 rounded-lg sidebar-item-active text-primary" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined">dashboard</span>
<span class="text-sm font-medium">Overview</span>
</div>
</a>
<a class="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400" href="#">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined">calendar_today</span>
<span class="text-sm font-medium">Calendar</span>
</div>
</a>
</nav>
</div>
<div>
<div class="flex items-center justify-between mb-4 px-2">
<p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Categories</p>
<button class="text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined text-sm">add_circle</span>
</button>
</div>
<nav class="flex flex-col gap-1">
<div class="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-blue-400">work</span>
<span class="text-sm font-medium">Work Projects</span>
</div>
<span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500">delete</span>
</div>
<div class="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-purple-400">person</span>
<span class="text-sm font-medium">Personal Life</span>
</div>
<span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500">delete</span>
</div>
<div class="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-green-400">shopping_cart</span>
<span class="text-sm font-medium">Shopping</span>
</div>
<span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500">delete</span>
</div>
<div class="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
<div class="flex items-center gap-3">
<span class="material-symbols-outlined text-orange-400">fitness_center</span>
<span class="text-sm font-medium">Health &amp; Fitness</span>
</div>
<span class="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500">delete</span>
</div>
</nav>
</div>
</div>
</div>
<div class="mt-auto p-6 border-t border-slate-200 dark:border-slate-800">
<button class="flex w-full items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors">
<span class="material-symbols-outlined">settings</span>
<span class="text-sm font-medium">Settings</span>
</button>
<div class="flex items-center gap-3 mt-4 px-3">
<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">JD</div>
<div class="flex flex-col">
<p class="text-xs font-bold">John Doe</p>
<p class="text-[10px] text-slate-500">Pro Plan</p>
</div>
</div>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 flex flex-col overflow-hidden bg-background-light dark:bg-background-dark">
<!-- Top Navigation -->
<header class="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111822] px-8 flex items-center justify-between">
<div class="flex items-center flex-1 max-w-xl">
<div class="relative w-full">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
<input class="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg focus:ring-2 focus:ring-primary text-sm placeholder:text-slate-500" placeholder="Search tasks, categories, or tags..." type="text"/>
</div>
</div>
<div class="flex items-center gap-4">
<button class="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
<span class="material-symbols-outlined">notifications</span>
</button>
<button class="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-primary/20">
<span class="material-symbols-outlined text-sm">add</span>
<span>Add Task</span>
</button>
</div>
</header>
<!-- Scrollable Content -->
<div class="flex-1 overflow-y-auto p-8">
<div class="max-w-5xl mx-auto">
<!-- Page Heading -->
<div class="flex flex-col gap-2 mb-8">
<h2 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Task Dashboard</h2>
<div class="flex items-center justify-between">
<p class="text-slate-500 dark:text-slate-400">Manage your upcoming priorities and track progress.</p>
<div class="flex items-center gap-2 text-xs font-medium text-slate-400">
<span class="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">12 Tasks Total</span>
<span class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">4 Completed</span>
</div>
</div>
</div>
<!-- Tabs -->
<div class="flex border-b border-slate-200 dark:border-slate-800 mb-8 gap-8">
<button class="border-b-2 border-primary text-primary pb-4 px-2 text-sm font-bold">All Tasks</button>
<button class="border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-4 px-2 text-sm font-bold transition-colors">To Do</button>
<button class="border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-4 px-2 text-sm font-bold transition-colors">In Progress</button>
<button class="border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 pb-4 px-2 text-sm font-bold transition-colors">Done</button>
</div>
<!-- Task List (Cards) -->
<div class="grid gap-4">
<!-- Task Item 1 -->
<div class="group bg-white dark:bg-[#111822] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-6 hover:shadow-md transition-shadow">
<div class="flex-shrink-0">
<button class="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-primary transition-colors flex items-center justify-center">
<span class="material-symbols-outlined text-xs text-primary opacity-0 hover:opacity-100">check</span>
</button>
</div>
<div class="flex-1">
<div class="flex items-center gap-3 mb-1">
<h3 class="font-bold text-slate-900 dark:text-white">Update website hero section</h3>
<span class="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">Work</span>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">calendar_month</span>
<span class="text-xs">Oct 24, 2023</span>
</div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-red-500"></div>
<span class="text-xs text-slate-400">High Priority</span>
</div>
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">chat_bubble</span>
<span class="text-xs">3 Comments</span>
</div>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">info</span>
</button>
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
</div>
</div>
<!-- Task Item 2 -->
<div class="group bg-white dark:bg-[#111822] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-6 hover:shadow-md transition-shadow">
<div class="flex-shrink-0">
<button class="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10">
<span class="material-symbols-outlined text-xs text-primary">play_arrow</span>
</button>
</div>
<div class="flex-1">
<div class="flex items-center gap-3 mb-1">
<h3 class="font-bold text-slate-900 dark:text-white">Design mobile navigation flows</h3>
<span class="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-[10px] font-bold rounded uppercase">Personal</span>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">calendar_month</span>
<span class="text-xs">Oct 26, 2023</span>
</div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-orange-500"></div>
<span class="text-xs text-slate-400">Medium Priority</span>
</div>
<div class="flex items-center gap-1.5 text-primary">
<span class="material-symbols-outlined text-base">sync</span>
<span class="text-xs font-semibold">In Progress</span>
</div>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">info</span>
</button>
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
</div>
</div>
<!-- Task Item 3 -->
<div class="group bg-white dark:bg-[#111822] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-6 hover:shadow-md transition-shadow">
<div class="flex-shrink-0">
<button class="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white border-none">
<span class="material-symbols-outlined text-xs">check</span>
</button>
</div>
<div class="flex-1">
<div class="flex items-center gap-3 mb-1">
<h3 class="font-bold text-slate-400 dark:text-slate-500 line-through">Buy gym supplement restock</h3>
<span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-bold rounded uppercase">Shopping</span>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">calendar_month</span>
<span class="text-xs">Yesterday</span>
</div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-slate-300"></div>
<span class="text-xs text-slate-400">Low Priority</span>
</div>
<div class="flex items-center gap-1.5 text-green-500">
<span class="material-symbols-outlined text-base">check_circle</span>
<span class="text-xs font-semibold">Done</span>
</div>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">info</span>
</button>
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
</div>
</div>
<!-- Task Item 4 -->
<div class="group bg-white dark:bg-[#111822] border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center gap-6 hover:shadow-md transition-shadow">
<div class="flex-shrink-0">
<button class="w-6 h-6 rounded-full border-2 border-slate-300 dark:border-slate-600 hover:border-primary transition-colors flex items-center justify-center">
<span class="material-symbols-outlined text-xs text-primary opacity-0 hover:opacity-100">check</span>
</button>
</div>
<div class="flex-1">
<div class="flex items-center gap-3 mb-1">
<h3 class="font-bold text-slate-900 dark:text-white">Morning 5km run at the park</h3>
<span class="px-2 py-0.5 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded uppercase">Health</span>
</div>
<div class="flex items-center gap-4">
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">calendar_month</span>
<span class="text-xs">Tomorrow</span>
</div>
<div class="flex items-center gap-1.5">
<div class="w-2 h-2 rounded-full bg-orange-500"></div>
<span class="text-xs text-slate-400">Medium Priority</span>
</div>
<div class="flex items-center gap-1.5 text-slate-400">
<span class="material-symbols-outlined text-base">history</span>
<span class="text-xs">Upcoming</span>
</div>
</div>
</div>
<div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">info</span>
</button>
<button class="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">edit</span>
</button>
<button class="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
<span class="material-symbols-outlined text-xl">delete</span>
</button>
</div>
</div>
</div>
</div>
</div>
</main>
</div>
</body></html>