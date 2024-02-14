"use client";

import { createCommunity } from "@/lib/actions/community.actions";

const CreateCommunityForm = async ({ user }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const name = formData.get("name");
    const username = formData.get("username");
    const image = formData.get("image");
    const bio = formData.get("bio");

    try {
      await createCommunity(name, username, image, bio, user.id);

      window.location.reload();
    } catch (error) {
      alert("Create community failed " + error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-dark-2 shadow-md rounded-md">
      <h2 className="text-lg font-semibold text-white mb-4">
        Create Community
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="mt-1 p-2 w-full text-white bg-dark-1 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm  font-medium  text-gray-700"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="mt-1 p-2 w-full border text-white bg-dark-1 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL:
          </label>
          <input
            type="url"
            id="image"
            name="image"
            className="mt-1 p-2 w-full text-white border bg-dark-1 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio:
          </label>
          <textarea
            id="bio"
            name="bio"
            className="mt-1 p-2 w-full text-white border bg-dark-1 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="h-auto min-w-[74px] rounded-lg bg-primary-500 text-[12px] text-light-1 !important px-4 py-2"
        >
          Create Community
        </button>
      </form>
    </div>
  );
};

export default CreateCommunityForm;
