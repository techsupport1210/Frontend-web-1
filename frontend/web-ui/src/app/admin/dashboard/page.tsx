"use client";

import React from "react";
import {
  UsersIcon,
  FilmIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  const stats = [
    {
      name: "Total Users",
      value: "24,421",
      change: "+20%",
      changeType: "increase",
      icon: UsersIcon,
    },
    {
      name: "Active Content Creators",
      value: "1,892",
      change: "+15%",
      changeType: "increase",
      icon: FilmIcon,
    },
    {
      name: "Videos Pending Review",
      value: "23",
      change: "-5%",
      changeType: "decrease",
      icon: FlagIcon,
    },
    {
      name: "Monthly Revenue",
      value: "£12,454",
      change: "+12%",
      changeType: "increase",
      icon: CurrencyDollarIcon,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "John Doe",
      action: "Content flagged for review",
      time: "5 minutes ago",
      status: "pending",
    },
    {
      id: 2,
      user: "Jane Smith",
      action: "New creator application",
      time: "10 minutes ago",
      status: "review",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Payment processed",
      time: "1 hour ago",
      status: "completed",
    },
  ];

  const quickActions = [
    {
      name: "User Management",
      icon: UsersIcon,
      color: "bg-blue-500",
      description: "Manage users and permissions",
    },
    {
      name: "Content Moderation",
      icon: FlagIcon,
      color: "bg-red-500",
      description: "Review flagged content",
    },
    {
      name: "Analytics",
      icon: ChartBarIcon,
      color: "bg-green-500",
      description: "View platform metrics",
    },
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      color: "bg-purple-500",
      description: "Configure platform settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats Grid */}
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon
                        className="h-6 w-6 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                          {stat.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div
                            className={`text-sm ${
                              stat.changeType === "increase"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}>
                            {stat.change}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions Grid */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {quickActions.map((action) => (
                <button
                  key={action.name}
                  className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow duration-200">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div
                        className={`${action.color} rounded-lg p-3 text-white`}>
                        <action.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div className="ml-4 text-left">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {action.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
              <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivities.map((activity) => (
                  <li key={activity.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#EE2B2E] truncate">
                          {activity.user}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              activity.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : activity.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                            }`}>
                            {activity.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {activity.action}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                          <p>{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 