"use client";

import { useState } from "react";
import { MAX_FLOWER_IMAGE_SIZE_BYTES, MAX_FLOWER_IMAGE_SIZE_MB } from "@/lib/adminUpload";

export default function FlowerUploadForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    botanicalName: "",
    stemLength: "",
    category: "Feature Flower",
    color: "",
    availability: "Year-Round" as const,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      setImageFile(null);
      return;
    }

    if (selectedFile.size > MAX_FLOWER_IMAGE_SIZE_BYTES) {
      setImageFile(null);
      e.target.value = "";
      setMessage(`✗ Image is too large. Maximum file size is ${MAX_FLOWER_IMAGE_SIZE_MB}MB.`);
      return;
    }

    setImageFile(selectedFile);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("flower", JSON.stringify({
        ...formData,
        image: imageFile?.name || `${formData.id}.jpg`
      }));
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch("/api/admin/flowers/upload", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Upload failed");
      }

      setMessage("✓ Flower uploaded successfully!");
      setFormData({
        id: "",
        name: "",
        botanicalName: "",
        stemLength: "",
        category: "Feature Flower",
        color: "",
        availability: "Year-Round",
      });
      setImageFile(null);
    } catch (error) {
      setMessage(`✗ Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-3xl rounded-3xl border border-border-soft bg-white p-8 shadow-soft">
      <h2 className="text-3xl font-bold text-charcoal">Add Flower</h2>
      <p className="mt-2 text-sm text-muted">
        Upload a flower image and metadata for your storefront catalogue.
      </p>
      <p className="mt-2 rounded-lg bg-rose px-3 py-2 text-sm font-medium text-charcoal">
        Maximum image upload size: {MAX_FLOWER_IMAGE_SIZE_MB}MB
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="id" className="mb-1 block text-sm font-medium text-charcoal">
            ID
          </label>
          <input
            id="id"
            type="text"
            name="id"
            placeholder="e.g., sweet-avalanche"
            value={formData.id}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-charcoal">
            Flower Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Flower name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="botanicalName" className="mb-1 block text-sm font-medium text-charcoal">
            Botanical Name
          </label>
          <input
            id="botanicalName"
            type="text"
            name="botanicalName"
            placeholder="Botanical name"
            value={formData.botanicalName}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="stemLength" className="mb-1 block text-sm font-medium text-charcoal">
            Stem Length
          </label>
          <input
            id="stemLength"
            type="text"
            name="stemLength"
            placeholder="e.g., 40-70 cm"
            value={formData.stemLength}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="category" className="mb-1 block text-sm font-medium text-charcoal">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          >
            <option value="Feature Flower">Feature Flower</option>
            <option value="Filler">Filler</option>
            <option value="Foliage">Foliage</option>
          </select>
        </div>

        <div>
          <label htmlFor="color" className="mb-1 block text-sm font-medium text-charcoal">
            Color
          </label>
          <input
            id="color"
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleInputChange}
            required
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor="availability" className="mb-1 block text-sm font-medium text-charcoal">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-border-soft px-3 py-2"
          >
            <option value="Year-Round">Year-Round</option>
            <option value="Seasonal">Seasonal</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="image" className="mb-1 block text-sm font-medium text-charcoal">
          Flower Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border border-border-soft px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-brand px-4 py-3 font-medium text-white transition hover:bg-brand-dark disabled:bg-gray-400"
      >
        {loading ? "Uploading..." : "Add Flower"}
      </button>

      {message && (
        <p className={`mt-4 text-center ${message.includes("✓") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
    </form>
  );
}
