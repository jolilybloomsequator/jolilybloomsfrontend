import FlowerUploadForm from "@/components/FlowerUploadForm";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminFlowersPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Flower Management</h1>
          <AdminLogoutButton />
        </div>

        <FlowerUploadForm />

      </div>
    </div>
  );
}
