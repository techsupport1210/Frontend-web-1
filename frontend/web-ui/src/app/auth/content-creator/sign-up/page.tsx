"use client";

import React, { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import { VideoCameraIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/config/routes";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validateConfirmPassword,
} from "@/utils/validation";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Option {
  id: string;
  name: string;
}

const contentCategories = [
  "Education",
  "Entertainment",
  "Gaming",
  "Music",
  "Tech",
  "Lifestyle",
  "Sports",
  "News & Politics",
  "How-to & Style",
  "Nonprofits & Activism",
  "Comedy",
  "Film & Animation",
  "Autos & Vehicles",
  "Pets & Animals",
  "Travel & Events",
  "Other",
];

const countries = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "Senegal",
  "Gambia",
  "South Africa",
  "Tanzania",
  "Uganda",
  "Ethiopia",
  "Rwanda",
  "Cameroon",
  "Côte d'Ivoire",
  "Zimbabwe",
  "Zambia",
  "Jamaica",
  "Haiti",
  "Trinidad and Tobago",
  "Barbados",
  "Bahamas",
  "United States",
  "Canada",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Australia",
  "Japan",
  "India",
  "China",
  "South Korea",
  "Singapore",
  "Brazil",
  "Argentina",
  "Colombia",
  "Other",
].sort();

const contentCategoryOptions: Option[] = contentCategories.map((category) => ({
  id: category.toLowerCase().replace(/\s+/g, "-"),
  name: category,
}));

const countryOptions: Option[] = countries.map((country) => ({
  id: country.toLowerCase().replace(/\s+/g, "-"),
  name: country,
}));

export default function ContentCreatorSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    channelName: "",
    description: "",
    contentCategory: contentCategoryOptions[0],
    country: countryOptions[0],
    handle: "",
    websiteUrl: "",
    socialLinks: [""],
    channelImage: null as File | null,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    channelName: "",
    description: "",
    contentCategory: "",
    country: "",
    handle: "",
    websiteUrl: "",
    socialLinks: [""],
    channelImage: "",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
    setIsLoading(false);

    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, []);

  if (isLoading) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateChannelName = (name: string) => {
    if (!name.trim()) {
      return "Channel name is required";
    }
    if (name.length < 3) {
      return "Channel name must be at least 3 characters long";
    }
    return "";
  };

  const validateContentCategory = (category: Option) => {
    if (!category || !category.name) {
      return "Please select a content category";
    }
    return "";
  };

  const validateDescription = (description: string) => {
    if (!description.trim()) {
      return "Channel description is required";
    }
    if (description.length < 50) {
      return "Description must be at least 50 characters long";
    }
    if (description.length > 5000) {
      return "Description must not exceed 5000 characters";
    }
    return "";
  };

  const validateCountry = (country: Option) => {
    if (!country || !country.name) {
      return "Please select a country";
    }
    return "";
  };

  const validateHandle = (handle: string) => {
    if (!handle.trim()) {
      return "Channel handle is required";
    }
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(handle)) {
      return "Handle must be 3-30 characters long and can only contain letters, numbers, underscores, and hyphens";
    }
    return "";
  };

  const validateWebsiteUrl = (url: string) => {
    if (!url) return ""; // Website URL is optional
    try {
      new URL(url);
      return "";
    } catch {
      return "Please enter a valid URL";
    }
  };

  const validateSocialLinks = (links: string[]) => {
    const errors: string[] = [];

    for (const url of links) {
      if (url) {
        try {
          new URL(url);
          errors.push("");
        } catch {
          errors.push("Please enter a valid URL");
        }
      } else {
        errors.push("");
      }
    }

    return errors;
  };

  const handleBlur = (field: keyof typeof formData) => {
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "password":
        error = validatePassword(formData.password);
        if (formData.confirmPassword) {
          setErrors((prev) => ({
            ...prev,
            confirmPassword: validateConfirmPassword(
              formData.password,
              formData.confirmPassword
            ),
          }));
        }
        break;
      case "confirmPassword":
        error = validateConfirmPassword(
          formData.password,
          formData.confirmPassword
        );
        break;
      case "username":
        error = validateUsername(formData.username);
        break;
      case "channelName":
        error = validateChannelName(formData.channelName);
        break;
      case "description":
        error = validateDescription(formData.description);
        break;
      case "contentCategory":
        error = validateContentCategory(formData.contentCategory);
        break;
      case "country":
        error = validateCountry(formData.country);
        break;
      case "handle":
        error = validateHandle(formData.handle);
        break;
      case "websiteUrl":
        error = validateWebsiteUrl(formData.websiteUrl);
        break;
      case "socialLinks":
        const socialErrors = validateSocialLinks(formData.socialLinks);
        error = socialErrors.some((err) => err !== "")
          ? "One or more links are invalid"
          : "";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateChannelImage = (file: File | null) => {
    if (!file) {
      return "Channel image is required";
    }
    if (file.size > 2 * 1024 * 1024) {
      return "Image must be less than 2MB";
    }
    if (!file.type.startsWith("image/")) {
      return "File must be an image";
    }
    return "";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateChannelImage(file);
      if (error) {
        setErrors((prev) => ({ ...prev, channelImage: error }));
        return;
      }

      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, channelImage: file }));
      setErrors((prev) => ({ ...prev, channelImage: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const socialLinksErrors = validateSocialLinks(formData.socialLinks);
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(
        formData.password,
        formData.confirmPassword
      ),
      username: validateUsername(formData.username),
      channelName: validateChannelName(formData.channelName),
      description: validateDescription(formData.description),
      contentCategory: validateContentCategory(formData.contentCategory),
      country: validateCountry(formData.country),
      handle: validateHandle(formData.handle),
      websiteUrl: validateWebsiteUrl(formData.websiteUrl),
      socialLinks: socialLinksErrors,
      channelImage: validateChannelImage(formData.channelImage),
    };

    setErrors(newErrors);

    if (
      Object.values(newErrors).some((error) =>
        Array.isArray(error) ? error.some((e) => e !== "") : error !== ""
      )
    ) {
      const firstErrorField = Object.entries(newErrors).find(([_, error]) =>
        Array.isArray(error) ? error.some((e) => e !== "") : error !== ""
      )?.[0];

      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    console.log("Content Creator signing up with:", formData);
  };

  const hasErrors = Object.values(errors).some((error) =>
    typeof error === "string"
      ? error !== ""
      : Object.values(error).some((e) => e !== "")
  );

  const handleSocialLinkChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link, i) =>
        i === index ? value : link
      ),
    }));
  };

  const addSocialLink = () => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, ""],
    }));
  };

  const removeSocialLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6 sm:mb-8">
          <Link
            href={ROUTES.HOME}
            className="flex items-center justify-center gap-2 mb-4 sm:mb-6">
            <VideoCameraIcon className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              VidFlow
            </span>
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#EE2B2E]">
            Create Content Creator Account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Join our community of amazing content creators
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8 bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 lg:p-8">
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Account Credentials
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur("email")}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Confirm password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Channel Information
            </h3>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  onBlur={() => handleBlur("username")}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.username ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="handle"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom Channel URL (@handle)
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    @
                  </span>
                  <input
                    id="handle"
                    name="handle"
                    type="text"
                    value={formData.handle}
                    onChange={handleChange}
                    onBlur={() => handleBlur("handle")}
                    className={`flex-1 block w-full px-3 py-2 border ${
                      errors.handle ? "border-red-300" : "border-gray-300"
                    } rounded-r-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    placeholder="yourchannel"
                  />
                </div>
                {errors.handle && (
                  <p className="mt-1 text-sm text-red-600">{errors.handle}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="channelName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Channel Name
                </label>
                <input
                  id="channelName"
                  name="channelName"
                  type="text"
                  value={formData.channelName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("channelName")}
                  className={`block w-full px-3 py-2 border ${
                    errors.channelName ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Your channel name"
                />
                {errors.channelName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.channelName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Channel Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  onBlur={() => handleBlur("description")}
                  className={`block w-full px-3 py-2 border ${
                    errors.description ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Tell viewers about your channel..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Channel Details
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <Listbox
                  value={formData.contentCategory}
                  onChange={(option) => {
                    setFormData((prev) => ({
                      ...prev,
                      contentCategory: option,
                    }));
                    setErrors((prev) => ({ ...prev, contentCategory: "" }));
                  }}>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border ${
                        errors.contentCategory
                          ? "border-red-300"
                          : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm`}>
                      <span className="block truncate">
                        {formData.contentCategory?.name || "Select a category"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {contentCategoryOptions.map((category) => (
                          <Listbox.Option
                            key={category.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={category}>
                            {({ selected }: { selected: boolean }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}>
                                  {category.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {errors.contentCategory && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.contentCategory}
                  </p>
                )}
              </div>

              <div className="relative">
                <Listbox
                  value={formData.country}
                  onChange={(option) => {
                    setFormData((prev) => ({ ...prev, country: option }));
                    setErrors((prev) => ({ ...prev, country: "" }));
                  }}>
                  <div className="relative mt-1">
                    <Listbox.Button
                      className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border ${
                        errors.country ? "border-red-300" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm`}>
                      <span className="block truncate">
                        {formData.country?.name || "Select a country"}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0">
                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {countryOptions.map((country) => (
                          <Listbox.Option
                            key={country.id}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-blue-100 text-blue-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={country}>
                            {({ selected }: { selected: boolean }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}>
                                  {country.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Channel Image
            </h3>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-full sm:w-auto">
                {isMounted && (
                  <>
                    {imagePreview ? (
                      <div className="relative h-32 w-32 mx-auto sm:mx-0">
                        <img
                          src={imagePreview}
                          alt="Channel preview"
                          className="h-32 w-32 object-cover ring-2 ring-gray-200 rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (imagePreview) {
                              URL.revokeObjectURL(imagePreview);
                            }
                            setImagePreview(null);
                            setFormData((prev) => ({
                              ...prev,
                              channelImage: null,
                            }));
                          }}
                          className="absolute -top-2 -right-2 rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="h-32 w-32 mx-auto sm:mx-0 border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 rounded-lg">
                        <PhotoIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="flex-1 w-full">
                <label className="block w-full">
                  <span className="sr-only">Choose channel image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-green-50 file:text-green-700
                      hover:file:bg-green-100"
                  />
                </label>
                {errors.channelImage && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.channelImage}
                  </p>
                )}
                <p className="mt-2 text-xs sm:text-sm text-gray-500">
                  Recommended: Square image, at least 98 x 98 pixels
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Links
            </h3>

            <div className="space-y-4">
              {formData.socialLinks.map((link, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={link}
                    onChange={(e) =>
                      handleSocialLinkChange(index, e.target.value)
                    }
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="https://your-website.com"
                  />
                  {formData.socialLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 sm:text-center">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addSocialLink}
                className="w-full sm:w-auto mt-2 px-4 py-2 text-sm text-green-600 hover:text-green-700 border border-green-200 rounded-lg hover:bg-green-50">
                + Add another link
              </button>
            </div>
          </div>

          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={hasErrors}
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              Create Account
            </button>
          </div>

          <div className="text-center pt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                href={ROUTES.AUTH.SIGN_IN}
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

