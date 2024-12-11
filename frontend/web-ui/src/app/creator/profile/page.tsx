"use client";

import React, { useState, useEffect, Fragment } from "react";
import {
  PhotoIcon,
  ChevronUpDownIcon,
  CheckIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { ROUTES } from "@/config/routes";
import {
  validateEmail,
  validateChannelName,
  validateDescription,
} from "@/utils/validation";
import { Listbox, Transition } from "@headlessui/react";
import Link from "next/link";

interface ProfileFormData {
  email: string;
  channelName: string;
  description: string;
  contentCategory: Option;
  country: Option;
  handle: string;
  websiteUrls: string[];
  channelImage: File | null;
}

interface ProfileErrors {
  email: string;
  channelName: string;
  description: string;
  contentCategory: string;
  country: string;
  handle: string;
  websiteUrls: string[];
  channelImage: string;
}

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

const contentCategoryOptions: Option[] = contentCategories.map((category) => ({
  id: category.toLowerCase().replace(/\s+/g, "-"),
  name: category,
}));

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

const countryOptions: Option[] = countries.map((country) => ({
  id: country.toLowerCase().replace(/\s+/g, "-"),
  name: country,
}));

const validateWebsiteUrls = (urls: string[]) => {
  const errors: string[] = new Array(urls.length).fill("");

  // Check if at least one valid URL exists
  const hasValidUrl = urls.some((url) => {
    try {
      if (!url.trim()) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  });

  if (!hasValidUrl) {
    errors[0] = "At least one valid website URL is required";
  }

  // Validate each URL format
  urls.forEach((url, index) => {
    if (url.trim()) {
      try {
        new URL(url);
      } catch {
        errors[index] = "Please enter a valid URL";
      }
    }
  });

  return errors;
};

export default function CreatorProfile() {
  const [formData, setFormData] = useState<ProfileFormData>({
    email: "",
    channelName: "",
    description: "",
    contentCategory: contentCategoryOptions[0],
    country: countryOptions[0],
    handle: "",
    websiteUrls: [""],
    channelImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [errors, setErrors] = useState<ProfileErrors>({
    email: "",
    channelName: "",
    description: "",
    contentCategory: "",
    country: "",
    handle: "",
    websiteUrls: [""],
    channelImage: "",
  });

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    };
  }, []);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "profile" | "banner"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "profile") {
        if (imagePreview) URL.revokeObjectURL(imagePreview);
        setImagePreview(previewUrl);
        setFormData((prev) => ({ ...prev, channelImage: file }));
      } else {
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        setBannerPreview(previewUrl);
        setFormData((prev) => ({ ...prev, channelBanner: file }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const websiteUrlErrors = validateWebsiteUrls(formData.websiteUrls);
    const newErrors = {
      email: validateEmail(formData.email),
      channelName: validateChannelName(formData.channelName),
      description: validateDescription(formData.description),
      contentCategory: formData.contentCategory
        ? ""
        : "Content category is required",
      country: formData.country ? "" : "Country is required",
      handle: formData.handle ? "" : "Channel handle is required",
      websiteUrls: websiteUrlErrors,
      channelImage: formData.channelImage ? "" : "Channel image is required",
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

    try {
      // Implement your API call here
      console.log("Saving profile:", formData);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleWebsiteUrlChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      websiteUrls: prev.websiteUrls.map((url, i) =>
        i === index ? value : url
      ),
    }));
  };

  const addWebsiteUrl = () => {
    setFormData((prev) => ({
      ...prev,
      websiteUrls: [...prev.websiteUrls, ""],
    }));
  };

  const removeWebsiteUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      websiteUrls: prev.websiteUrls.filter((_, i) => i !== index),
    }));
  };

  const handleBlur = (field: keyof typeof formData) => {
    let error = "";
    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "channelName":
        error = validateChannelName(formData.channelName);
        break;
      case "description":
        error = validateDescription(formData.description);
        break;
      case "contentCategory":
        error = formData.contentCategory ? "" : "Content category is required";
        break;
      case "country":
        error = formData.country ? "" : "Country is required";
        break;
      case "handle":
        error = formData.handle ? "" : "Channel handle is required";
        break;
      case "websiteUrls":
        const urlErrors = validateWebsiteUrls(formData.websiteUrls);
        error = urlErrors.some((err) => err !== "")
          ? "One or more URLs are invalid"
          : "";
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const hasErrors = Object.values(errors).some((error) =>
    Array.isArray(error) ? error.some((e) => e !== "") : error !== ""
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        {/* Header section */}
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
            Profile Settings
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Manage your creator profile and channel settings
          </p>
        </div>

        {/* Form container */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 sm:space-y-8 bg-white dark:bg-gray-800 shadow rounded-lg p-4 sm:p-6 lg:p-8">
          {/* Account Information section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Account Information
            </h3>

            <div className="space-y-4">
              {/* Email field */}
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  onBlur={() => handleBlur("email")}
                  className={`appearance-none block w-full px-3 py-2 border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <div className="mt-3 pt-2 border-t border-gray-100">
                  <Link
                    href={ROUTES.AUTH.CHANGE_PASSWORD}
                    className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 hover:underline">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      className="w-4 h-4">
                      <path 
                        fillRule="evenodd" 
                        d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    Change your password
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Channel Information section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Channel Information
            </h3>

            <div className="space-y-4">
              {/* Handle field */}
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
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        handle: e.target.value,
                      }))
                    }
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

              {/* Channel Name field */}
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      channelName: e.target.value,
                    }))
                  }
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

              {/* Description field */}
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
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

          {/* Channel Details section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Channel Details
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Content Category dropdown */}
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

              {/* Country dropdown */}
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

          {/* Channel Image section */}
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
                    onChange={(e) => handleImageChange(e, "profile")}
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

          {/* Website URLs section */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 border-b pb-2">
              Links
            </h3>

            <div className="space-y-4">
              {formData.websiteUrls.map((url, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) =>
                      handleWebsiteUrlChange(index, e.target.value)
                    }
                    className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="https://your-website.com"
                  />
                  {formData.websiteUrls.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeWebsiteUrl(index)}
                      className="w-full sm:w-auto px-4 py-2 text-sm text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 sm:text-center">
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addWebsiteUrl}
                className="w-full sm:w-auto mt-2 px-4 py-2 text-sm text-green-600 hover:text-green-700 border border-green-200 rounded-lg hover:bg-green-50">
                + Add another link
              </button>
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 sm:pt-6">
            <button
              type="submit"
              disabled={hasErrors}
              className="w-full flex justify-center py-2 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-[#008751] hover:bg-[#006B3F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
