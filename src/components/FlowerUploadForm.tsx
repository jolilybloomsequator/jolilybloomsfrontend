"use client";

import { useState } from "react";

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
    if (e.target.files?.[0]) {
      setImageFile(e.target.files[0]);
    }
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
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded">
      <h2 className="text-2xl font-bold mb-4">Add Flower</h2>

      <input
        type="text"
        name="id"
        placeholder="ID (e.g., sweet-avalanche)"
        value={formData.id}
        onChange={handleInputChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        name="name"
        placeholder="Flower Name"
        value={formData.name}
        onChange={handleInputChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        name="botanicalName"
        placeholder="Botanical Name"
        value={formData.botanicalName}
        onChange={handleInputChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        name="stemLength"
        placeholder="Stem Length (e.g., 40-70 cm)"
        value={formData.stemLength}
        onChange={handleInputChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="Feature Flower">Feature Flower</option>
        <option value="Filler">Filler</option>
        <option value="Foliage">Foliage</option>
      </select>

      <input
        type="text"
        name="color"
        placeholder="Color"
        value={formData.color}
        onChange={handleInputChange}
        required
        className="w-full mb-2 p-2 border rounded"
      />

      <select
        name="availability"
        value={formData.availability}
        onChange={handleInputChange}
        className="w-full mb-2 p-2 border rounded"
      >
        <option value="Year-Round">Year-Round</option>
        <option value="Seasonal">Seasonal</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-2 p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-400"
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
